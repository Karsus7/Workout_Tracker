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

// Most of the code for this route was derived from 17-NoSQL\01-Activities\14-Ins-Populate\server.js
app.get("/api/workouts", (req, res) => {
    db.Workout.find({})
        .then((response) => {
            res.json(response);
        })
        .catch((err) => {
            res.json(err.message);
        })
});

// Most of the code for this section was derived from lines 28-37 of 17-NoSQL\01-Activities\14-Ins-Populate\server.js
// This section actually updates the workouts as required
app.put("/api/workouts/:id", async (req, res) => {
    db.Workout.update(
        { _id: mongoose.Types.ObjectId(req.params.id) },
        { $push: { exercises: req.body } },
        { new: true })
        .then((data) => res.json(data))
        .catch((err) => res.json(err));

});

// This provides a 7 day range derived from api.js and stats.js
app.get("/api/workouts/range", async (req, res) => {
    try {
        // limits the process to 7 days
        let data = await db.Workout.find({}).sort({ day: -1 }).limit(7)
        res.json(data); 
    } catch (error) {
        res.json(error); 
    }
});

// Post a new workout 
app.post("/api/workouts", async ({ body }, res) => {
    try {
        let data = await db.Workout.create(body)
        console.log({ data });
        res.json(data);
    } catch ({ message }) {
        res.json(message);
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

// This section listens for the apps deployment, and lets coders know in the console.log
app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
});