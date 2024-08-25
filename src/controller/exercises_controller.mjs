import express, { response } from 'express';
import * as model from './exercises_model.mjs';
import 'dotenv/config';

const app = express();
// const PORT = 3000;
const PORT = process.env.PORT

app.use(express.json())

// Don't change or add anything above this line

// HELPER FUNCTIONS
// /**
//  * Validates if the given date is in the format YYYY-MM-DD.
//  * USE THIS FUNCTION IF YOU ARE USING A "DATE" TYPE FOR <INPUT>
//  * @param {string} dateStr - The date string to validate
//  * @returns {boolean} - True if valid, false otherwise
//  */
// function isValidDate(dateStr) {
//     // Regex to check if the date is in the format YYYY-MM-DD
//     const regex = /^\d{4}-\d{2}-\d{2}$/;
//     if (!regex.test(dateStr)) return false;

//     const [year, month, day] = dateStr.split('-').map(Number);
//     const date = new Date(year, month - 1, day);
    
//     // Check if the parsed date matches the input date
//     return date.getFullYear() === year && date.getMonth() + 1 === month && date.getDate() === day;
// }

/**
 * Validates if the given date is in the format MM-DD-YY
 * @param {string} dateStr - The date string to validate
 * @returns {boolean} - True if valid, false otherwise
 */
function isValidDate(dateStr) {
    // Regex to check if the date is in the format MM-DD-YY
    const regex = /^\d{2}-\d{2}-\d{2}$/;
    if (!regex.test(dateStr)) return false;

    const [month, day, year] = dateStr.split('-').map(Number);

    // Adjust year from YY to YYYY
    const fullYear = year >= 0 && year <= 99 ? (year >= 50 ? 1900 + year : 2000 + year) : year;
    
    // Create a Date object
    const date = new Date(fullYear, month - 1, day);

    // Check if the parsed date matches the input date
    return date.getFullYear() === fullYear && date.getMonth() + 1 === month && date.getDate() === day;
}


// 1. POST/exercises
app.post('/exercises', async (req, res) => {
    const { name, reps, weight, unit, date } = req.body;
    
    try {
        // Ensure the connection is established before creating a user
        await model.connect(false); 

        // Validate JSON request body
        if (
            typeof name === 'string' && name.trim() !== '' &&
            Number.isInteger(reps) && reps > 0 &&
            Number.isInteger(weight) && weight > 0 &&
            (unit === 'kgs' || unit === 'lbs') &&
            typeof date === 'string' || isValidDate(date)
        ) {
            const newExercise = await model.createExercise(name, reps, weight, unit, date);
            res.status(201).json(newExercise);
        } else {
            res.status(400).json({ Error: 'Invalid request' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ Error: 'Internal server error' });
    }
  });

// 2. GET /exercises
app.get('/exercises', async (req, res) => {
    try {
        // Ensure the connection is established before finding users
        await model.connect(false);

        const query = {};
        const { name, reps, weight, unit, date } = req.query;

        if (name) query.name = name;
        if (reps) query.reps = Number(reps);
        if (weight) query.weight = Number(weight);
        if (unit) query.unit = unit;
        if (date) query.date = date; 

        const exercises = await model.findExercises(query);
        res.status(200).json(exercises);
    } catch (err) {
        console.error(err);
        res.status(500).json({ Error: 'Internal server error' });
    }
});

// 3. GET /exercises/:id
app.get('/exercises/:id', async (req, res) => {
    try {
        // Ensure the connection is established before finding a user
        await model.connect(false);

        const exerciseId = req.params.id;
        const exercise = await model.findExerciseById(exerciseId);

        if (exercise) {
            res.status(200).json(exercise);
        } else {
            res.status(404).json({ Error: 'Not found' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ Error: 'Internal server error' });
    }
});

// 4. PUT /exercises/:id
app.put('/exercises/:id', async (req, res) => {
    try {
        // Ensure the connection is established before updating an exercise
        await model.connect(false);

        const exerciseId = req.params.id;
        const { name, reps, weight, unit, date } = req.body;

        // Validate update data
        if (
            typeof name !== 'string' || name.trim() === '' ||
            !Number.isInteger(reps) || reps <= 0 ||
            !Number.isInteger(weight) || weight <= 0 ||
            !['kgs', 'lbs'].includes(unit) ||
            typeof date !== 'string' || !isValidDate(date)
        ) {
            return res.status(400).json({ Error: 'Invalid update data' });
        }

        const update = { name, reps, weight, unit, date };

        const updatedExercise = await model.updateExerciseById(exerciseId, update);

        if (updatedExercise) {
            res.status(200).json(updatedExercise);
        } else {
            res.status(404).json({ Error: 'Not found' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ Error: 'Internal server error' });
    }
});


// 5. DELETE /exercises
app.delete('/exercises', async (req, res) => {
    try {
        // Ensure the connection is established before deleting exercises
        await model.connect(false);

        const query = {};
        const { name, reps, weight, unit, date } = req.query;

        // Add query parameters to filter the exercises to delete
        if (name) query.name = name;
        if (reps) query.reps = Number(reps);
        if (weight) query.weight = Number(weight);
        if (unit) query.unit = unit;
        if (date) {
            // Validate and format date if needed
            if (isValidDate(date)) {
                query.date = date;
            } else {
                return res.status(400).json({ Error: 'Invalid date format' });
            }
        }

        // Perform the delete operation and get the result
        const result = await model.deleteExercises(query);

        res.status(200).json({ deletedCount: result.deletedCount });
    } catch (err) {
        console.error(err);
        res.status(500).json({ Error: 'Internal server error' });
    }
});


// 6. DELETE /exercises/:id
app.delete('/exercises/:id', async (req, res) => {
    try {
        // Ensure the connection is established before deleting a document
        await model.connect(false);

        const exerciseId = req.params.id;

        // Perform the delete operation
        const result = await model.deleteExerciseById(exerciseId);

        // Check if a document was deleted
        if (result.deletedCount === 1) {
            res.status(204).send(); // No content
        } else {
            res.status(404).json({ Error: 'Not found' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ Error: 'Internal server error' });
    }
});

// Don't change or add anything below this line
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});