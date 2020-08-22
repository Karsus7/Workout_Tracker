// Most of the code for this file was derived from: 17-NoSQL\01-Activities\26-Stu-Mini-Project\Solved\models\transaction.js
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Exercises = new Schema({
	// These 7 lines generate the fields used when typing in information
	// The fields were derived from seed.js
	type: String, 
	name: String,
	duration: Number,
	distance: Number,
	weight: Number,
	reps: Number,
	sets: Number,
});

const WorkoutSchema = new Schema({
    // This shows the what day a workout was done
    day: {
		type: Date,
		default: Date.now,
    },
    // This causes the Exercises to display 
    exercises: [Exercises]

});


// This constant is a combination of the previous sections formatted and ready to be exported below
const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;
