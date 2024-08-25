import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaSave, FaArrowLeft } from 'react-icons/fa';

function EditExercisePage() {
    const { id } = useParams(); // Get the exercise ID from the URL
    const navigate = useNavigate(); // Hook to programmatically navigate
    const [exercise, setExercise] = useState({
        name: '',
        reps: '',
        weight: '',
        unit: 'kgs',
        date: ''
    });

    useEffect(() => {
        async function fetchExercise() {
            try {
                const response = await fetch(`/exercises/${id}`);
                if (response.ok) {
                    const data = await response.json();
                    setExercise(data);
                } else {
                    alert('Failed to fetch exercise details');
                }
            } catch (error) {
                console.error('Error fetching exercise:', error);
                alert('Error fetching exercise');
            }
        }

        fetchExercise();
    }, [id]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setExercise((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(`/exercises/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(exercise),
            });

            if (response.ok) {
                alert('Exercise updated successfully');
                navigate('/'); // Navigate to the Home Page
            } else {
                const errorData = await response.json();
                alert(`Failed to update exercise: ${errorData.message || 'Unknown error'}`);
            }
        } catch (error) {
            console.error('Error updating exercise:', error);
            alert('Error updating exercise');
        }
    };

    return (
        <div>
            <div>
                <h2>Edit Exercise</h2>
                <p>Edit your exercise</p>
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
            <footer>
                <p>© 2024 Rafael Ayala</p>
            </footer>
        </div>
    );
}

export default EditExercisePage;
