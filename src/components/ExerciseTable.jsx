import React from 'react';
import ExerciseRow from './ExerciseRow';

const ExerciseTable = ({ exercises, setExercises }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Reps</th>
          <th>Weight</th>
          <th>Unit</th>
          <th>Date</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {exercises.map((exercise) => (
          <ExerciseRow
            key={exercise._id}
            exercise={exercise}
            setExercises={setExercises}
          />
        ))}
      </tbody>
    </table>
  );
};

export default ExerciseTable;
