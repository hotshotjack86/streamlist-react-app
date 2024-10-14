import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import StreamList from './components/StreamList';
import Movies from './components/Movies';
import Cart from './components/Cart';
import About from './components/About';
import './App.css'; // Import the CSS file

function App() {
  // State to manage the list of movies
  const [movies, setMovies] = useState([]);

  // Function to add a movie to the list, with error handling
  const addMovie = (movie) => {
    try {
      if (movie.trim() === "") {
        throw new Error("Movie title cannot be empty."); // Check for empty movie title
      }
      console.log('Adding movie:', movie); // Log the movie being added
      setMovies([...movies, movie]); // Add the new movie to the list
    } catch (error) {
      console.error("Error adding movie:", error.message); // Handle any errors
    }
  };

  return (
    <Router>
      <div>
        {/* Navigation bar with links to different app pages */}
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/movies">Movies</Link></li>
            <li><Link to="/cart">Cart</Link></li>
            <li><Link to="/about">About</Link></li>
          </ul>
        </nav>

        {/* Define routes for different pages */}
        <Routes>
          {/* Home page with StreamList form */}
          <Route path="/" element={<StreamList addMovie={addMovie} />} />
          
          {/* Movies page to display the list of added movies */}
          <Route path="/movies" element={<Movies movies={movies} />} />
          
          {/* Placeholder pages for future content */}
          <Route path="/cart" element={<Cart />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
