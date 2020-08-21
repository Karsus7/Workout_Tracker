const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ExerciseSchema = new Schema({
	// creates type field
	type: String, 
	// creates name field
	name: String,
	// creates duration field
	duration: Number,
	// creates distance field
	distance: Number,
	// creates weight field
	weight: Number,
	// creates reps field
	reps: Number,
	// creates sets field
	sets: Number,
});

const WorkoutSchema = new Schema({
    day: {
		type: Date,
		default: Date.now,
    },
    // this will show the exercises for the day 
    exercises: [ExerciseSchema]

});



// compiling a model with the specified information
const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;
