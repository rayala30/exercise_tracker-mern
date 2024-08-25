import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ExerciseRow = ({ exercise, setExercises }) => {
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/exercises/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setExercises((prevExercises) =>
          prevExercises.filter((exercise) => exercise._id !== id)
        );
      } else {
        console.error('Failed to delete exercise');
      }
    } catch (error) {
      console.error('Error deleting exercise:', error);
    }
  };

  return (
    <tr>
      <td>{exercise.name}</td>
      <td>{exercise.reps}</td>
      <td>{exercise.weight}</td>
      <td>{exercise.unit}</td>
      <td>{exercise.date}</td>
      <td>
        <Link to={`/edit-exercise/${exercise._id}`}>
          <FaEdit />
        </Link>
        <FaTrash onClick={() => handleDelete(exercise._id)} />
      </td>
    </tr>
  );
};

export default ExerciseRow;