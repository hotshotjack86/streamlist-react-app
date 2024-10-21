import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import StreamList from './components/StreamList';
import Movies from './components/Movies';
import Cart from './components/Cart';
import About from './components/About';
import './App.css'; // Import the CSS file

function App() {
  // State for storing the list of movies
  const [movies, setMovies] = useState([]);

  // Function to add a movie to the list with error handling
  const addMovie = (movie) => {
    try {
      // Check if the input is valid (non-empty)
      if (!movie.trim()) {
        throw new Error("Movie name cannot be empty");
      }
      // Log the movie title to the console (for debugging purposes)
      console.log('Adding movie:', movie);
      // Update the state by appending the new movie to the existing list
      setMovies([...movies, { title: movie, watched: false, isEditing: false }]);
    } catch (error) {
      // Display an error message to the user if an issue occurs
      alert(error.message);
    }
  };

  // Function to delete a movie from the list
  const deleteMovie = (index) => {
    // Filter out the movie to be deleted based on its index
    const updatedMovies = movies.filter((_, i) => i !== index);
    // Update the state with the new list
    setMovies(updatedMovies);
  };

  // Function to edit a movie
  const editMovie = (index, newTitle) => {
    const updatedMovies = [...movies];
    // Update the title of the movie at the given index
    updatedMovies[index].title = newTitle;
    updatedMovies[index].isEditing = false;
    // Update the state with the edited movie list
    setMovies(updatedMovies);
  };

  // Function to toggle the watched status of a movie
  const toggleWatched = (index) => {
    const updatedMovies = [...movies];
    // Flip the watched status of the movie at the given index
    updatedMovies[index].watched = !updatedMovies[index].watched;
    // Update the state with the modified list
    setMovies(updatedMovies);
  };

  return (
    <Router>
      <div>
        {/* Navigation Bar */}
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/movies">Movies</Link></li>
            <li><Link to="/cart">Cart</Link></li>
            <li><Link to="/about">About</Link></li>
          </ul>
        </nav>

        {/* Routes for navigating to different pages */}
        <Routes>
          {/* Home (StreamList) page where users can add movies */}
          <Route path="/" element={<StreamList addMovie={addMovie} />} />
          {/* Movies page where the list of added movies is displayed */}
          <Route path="/movies" element={<Movies movies={movies} deleteMovie={deleteMovie} editMovie={editMovie} toggleWatched={toggleWatched} />} />
          {/* Cart and About pages (placeholders for future functionality) */}
          <Route path="/cart" element={<Cart />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
