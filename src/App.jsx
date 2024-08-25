import React from 'react';
import './App.css'; // Import component-specific styles
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import CreateExercisePage from './pages/CreateExercisePage'; 
import EditExercisePage from './pages/EditExercisePage';

function App() {
  return (
    <Router>
      <Navigation />
      <header>
        <h1>Exercise Tracker App</h1>
      </header>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/edit-exercise/:id" element={<EditExercisePage />} />
        <Route path="/create-exercise" element={<CreateExercisePage />} />
      </Routes>
      <footer>
        <p>© 2024 Rafael Ayala</p>
      </footer>
    </Router>
  );
}

export default App;