import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import StreamList from './components/StreamList';
import Movies from './components/Movies';
import Cart from './components/Cart';
import About from './components/About';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);

  // Function to add a movie to the list
  const addMovie = (movie) => {
    if (!movie.trim()) {
      alert("Movie name cannot be empty");
      return;
    }
    setMovies([...movies, { title: movie, watched: false, isEditing: false }]);
  };

  // Function to toggle the watched status of a movie
  const toggleWatch = (index) => {
    const updatedMovies = [...movies];
    updatedMovies[index].watched = !updatedMovies[index].watched;
    setMovies(updatedMovies);
  };

  // Function to edit a movie
  const updateMovie = (index, newTitle, isEditing = false) => {
    const updatedMovies = [...movies];
    updatedMovies[index].title = newTitle;
    updatedMovies[index].isEditing = isEditing;
    setMovies(updatedMovies);
  };

  // Function to delete a movie from the list
  const deleteMovie = (index) => {
    const updatedMovies = movies.filter((_, i) => i !== index);
    setMovies(updatedMovies);
  };

  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/movies">Movies</Link></li>
            <li><Link to="/cart">Cart</Link></li>
            <li><Link to="/about">About</Link></li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<StreamList addMovie={addMovie} />} />
          <Route path="/movies" element={<Movies movies={movies} updateMovie={updateMovie} deleteMovie={deleteMovie} toggleWatch={toggleWatch} />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
