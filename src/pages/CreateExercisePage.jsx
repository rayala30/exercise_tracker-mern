import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSave, FaArrowLeft } from 'react-icons/fa';

function CreateExercisePage() {
    const navigate = useNavigate(); // Hook to programmatically navigate
    const [exercise, setExercise] = useState({
        name: '',
        reps: '',
        weight: '',
        unit: 'kgs',
        date: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setExercise((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        try {
            
            const response = await fetch('/exercises', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(exercise),
            });

            if (response.status === 201) {
                alert('Exercise created successfully');
                navigate('/'); // Navigate to the Home Page
            } else {
                alert('Failed to create exercise');
            }
        } catch (error) {
            console.error('Error creating exercise:', error);
            alert('Error creating exercise');
        }
    };

    return (
        <div>
            <div>
                <h2>Create Exercise</h2>
                <p>Add a new exercise to the database.</p>
            </div>
            <main>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Name:</label>
                        <input
                            type="text"
                            name="name"
                            value={exercise.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Reps:</label>
                        <input
                            type="number"
                            name="reps"
                            value={exercise.reps}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Weight:</label>
                        <input
                            type="number"
                            name="weight"
                            value={exercise.weight}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Unit:</label>
                        <select
                            name="unit"
                            value={exercise.unit}
                            onChange={handleChange}
                            required
                        >
                            <option value="kgs">kgs</option>
                            <option value="lbs">lbs</option>
                        </select>
                    </div>
                    <div>
                        <label>Date:</label>
                        <input
                            type="text"
                            name="date"
                            value={exercise.date}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="submit-btn">
                        <button type="submit">
                            <FaSave /> Save
                        </button>
                    </div>
                    <div className="home-btn">
                        <button type="button" onClick={() => navigate('/')}>
                            <FaArrowLeft /> Back to Home
                        </button>
                    </div>
                </form>
            </main>
            
        </div>
    );
}

export default CreateExercisePage;
