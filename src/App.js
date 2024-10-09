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
  const addMovie = (movie) => {
    console.log('Adding movie:', movie);  // Log the movie being added
    setMovies([...movies, movie]); // Add the new movie to the list
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
          <Route path="/movies" element={<Movies movies={movies} />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;