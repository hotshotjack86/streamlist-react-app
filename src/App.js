import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import StreamList from './components/StreamList';
import Movies from './components/Movies';
import Cart from './components/Cart';
import About from './components/About';
import './App.css'; // Import the CSS file

function App() {
  const [movies, setMovies] = useState([]);

  // Function to add a movie to the list
  const addMovie = (movieTitle) => {
    const newMovie = { title: movieTitle, watched: false, isEditing: false };
    setMovies([...movies, newMovie]);
  };

  // Function to delete a movie from the list
  const deleteMovie = (index) => {
    const updatedMovies = movies.filter((_, i) => i !== index);
    setMovies(updatedMovies);
  };

  // Function to mark a movie as watched/unwatched
  const toggleWatch = (index) => {
    const updatedMovies = movies.map((movie, i) =>
      i === index ? { ...movie, watched: !movie.watched } : movie
    );
    setMovies(updatedMovies);
  };

  // Function to edit a movie title
  const updateMovie = (index, newTitle, startEdit = false) => {
    const updatedMovies = movies.map((movie, i) =>
      i === index ? { ...movie, title: newTitle, isEditing: startEdit } : movie
    );
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
          <Route
            path="/movies"
            element={<Movies movies={movies} updateMovie={updateMovie} deleteMovie={deleteMovie} toggleWatch={toggleWatch} />}
          />
          <Route path="/cart" element={<Cart />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;