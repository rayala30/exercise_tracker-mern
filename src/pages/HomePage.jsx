import React, { useEffect, useState } from 'react';
import ExerciseTable from '../components/ExerciseTable';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const response = await fetch('/exercises');
        const data = await response.json();
        setExercises(data);
      } catch (error) {
        console.error('Error fetching exercises:', error);
      }
    };

    fetchExercises();
  }, []);

  return (
    <div>
      <h3>Track your exercises easily with the exercise chart.</h3>
      <ExerciseTable exercises={exercises} setExercises={setExercises} />
      <div id="create-exercise">
        <Link to="/create-exercise" class="create">Create New Exercise</Link>
      </div>
    </div>
  );
};

export default HomePage;