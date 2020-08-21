// Global Variables
const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const path = require("path");
const db = require("./models");

// This section was derived from \17-NoSQL\01-Activities\15-Stu-Populate\Solved\server.js
const PORT = process.env.PORT || 8080;

const app = express();

app.use(logger("dev"));
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { useNewUrlParser: true})

// API Routes 

app.get("/api/workouts", (req, res) => {
    db.Workout.find({})
        .then((response) => {
            res.json(response);
        })
        .catch((err) => {
            res.json(err.message);
        })
});

// update a specific workout
app.put("/api/workouts/:id", async (req, res) => {
    db.Workout.update(
        // update workout
        { _id: mongoose.Types.ObjectId(req.params.id) }, // where id is given id
        { $push: { exercises: req.body } }, // add new exercise 
        { new: true } // return the updated object
    )
        .then((data) => res.json(data))
        .catch((err) => res.json(err));

});

// create a new workout 
app.post("/api/workouts", async ({ body }, res) => {
    // create a new workout 
    // includes date and id 
    try {
        let data = await db.Workout.create(body)
        console.log({ data });
        res.json(data);
    } catch ({ message }) {
        res.json(message);
    }
});

// get a range of the workouts 7 days
app.get("/api/workouts/range", async (req, res) => {
    try {
        // get the last 7 days tracked on the app 
        let data = await db.Workout.find({}).sort({ day: -1 }).limit(7)
        res.json(data); 
    } catch (error) {
        res.json(error); 
    }
});

// HTML Routes
// The Code used in this section is derived from 14-Full-Stack\01-Activities\14-SequelizeLibrary\Solved\app\routes\html-routes.js
// These three routes handle the three corresponding html pages

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"))
});

app.get('/exercise', (req, res) => {
    res.sendFile(path.join(__dirname, "./public/exercise.html"))
});

app.get('/stats', (req, res) => {
    res.sendFile(path.join(__dirname, "./public/stats.html"))
});

// 
app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
});