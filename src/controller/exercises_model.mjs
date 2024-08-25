import mongoose from 'mongoose';
import 'dotenv/config';

const EXERCISES_DB_NAME = 'exercises_db';
const EXERCISES_COLLECTION = 'Exercises';
const EXERCISE_CLASS = 'Exercise';

let connection = undefined;
let Exercise = undefined

/**
 * This function does the following:
 *  1. Connects to the MongoDB server.
 *  2. Drop EXERCISE_COLLECTION if asked to do so.
 *  3. Creates a model class for the movie schema.
 * @param {Boolean} dropCollection If true, drop EXERCISE_COLLECTION
 */
async function connect(dropCollection){
    try{
        connection = await createConnection();
        console.log("Successfully connected to MongoDB using Mongoose!");
        if(dropCollection){
            await connection.db.dropCollection(EXERCISES_COLLECTION);
        }
        Exercise = createModel()
    } catch(err){
        console.log(err);
        throw Error(`Could not connect to MongoDB ${err.message}`)
    }
}

/**
 * Connect to the MongoDB server for the connect string in .env file
 * @returns A connection to the server
 */
async function createConnection(){
    await mongoose.connect(process.env.MONGODB_CONNECT_STRING, 
                {dbName: EXERCISES_DB_NAME});
    return mongoose.connection;
}




/**
 * Define a schema for the users collection, compile a model and return.
 * @returns A model object for the userScheme
 */
function createModel() {
    // Check if the model already exists
    if (mongoose.models[EXERCISE_CLASS]) {
        return mongoose.models[EXERCISE_CLASS];
    }

    // Define the schema
    const exerciseSchema = new mongoose.Schema({
        name: {type: String, required: true},
        reps: {type: Number, required: true},
        weight: {type: Number, required: true},
        unit: {type: String, required: true},
        date: {type: String, required: true},
    });

    // Compile the model class from the schema
    // This should be done after defining the schema
    return mongoose.model(EXERCISE_CLASS, exerciseSchema);
}

/**
 * Creates a User object to save into MongoDB database
 * @param {*} nameVal 
 * @param {*} repsVal 
 * @param {*} weightVal 
 * @param {*} unitVal 
 * @param {*} dateVal 
 *
 * @returns A saved user on the users database
 */
async function createExercise(nameVal, repsVal, weightVal, unitVal, dateVal) {
    if (!Exercise) {
        throw new Error("Exercise model is not initialized. Check connect()?");
    }

    const exercise = new Exercise({
        name: nameVal,
        reps: repsVal,
        weight: weightVal,
        unit: unitVal,
        date: dateVal,
    });
    return exercise.save();
}

/**
 * Returns exercises from database based on query parameters
 * @param {*} query 
 * @returns Exercises based on query parameters
 */
async function findExercises(query) {
    if (!Exercise) {
        throw new Error("Exercise model is not initialized. Check connect()?");
    }

    // if (query.date) {
    //     query.date = new Date(query.date); // Convert to Date object
    // }

    return Exercise.find(query).exec();
}

/**
 * Returns exercise by ID
 * @param {*} id 
 * @returns exercise by ID
 */
async function findExerciseById(id) {
    if (!Exercise) {
        throw new Error("Exercise model is not initialized. Check connect()?");
    }

    return Exercise.findById(id).exec();
}


/**
 * Updates a exercise in the database based on the exercise ID
 * @param {String} id - The ID of the exercise to update
 * @param {Object} update - An object containing the properties to update
 * @returns The updated exercise document
 */
async function updateExerciseById(id, update) {
    if (!Exercise) {
        throw new Error("Exercise model is not initialized. Check connect()?");
    }

    const result = await Exercise.updateOne({ _id: id }, { $set: update });

    if (result.matchedCount === 0) {
        return null;
    }

    return Exercise.findById(id).exec();
}


/**
 * Deletes users from the database based on a query parameter
 * @param {Object} query - The query object to match documents
 * @returns The result of the delete operation
 */
async function deleteExercises(query) {
    if (!Exercise) {
        throw new Error("Exercise model is not initialized. Check connect()?");
    }

    return Exercise.deleteMany(query).exec();
}


/**
 * Deletes a user from the database by ID
 * @param {string} id - The ID of the user to delete
 * @returns The result of the delete operation
 */
async function deleteExerciseById(id) {
    if (!Exercise) {
        throw new Error("Exercise model is not initialized. Check connect()?");
    }

    return Exercise.deleteOne({ _id: id }).exec();
}


export { connect, createExercise as createExercise, findExercises as findExercises, findExerciseById as findExerciseById, updateExerciseById as updateExerciseById, deleteExercises as deleteExercises, deleteExerciseById as deleteExerciseById };