import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import StreamList from './components/StreamList';
import Movies from './components/Movies';
import CartSystem from './components/CartSystem';
import About from './components/About';
import MovieSearch from './components/MovieSearch'; // New component for TMDB search
import subscriptions from './Data';  // Importing data from Data.js
import './App.css';

function App() {
  const [movies, setMovies] = useState(() => {
    const savedMovies = localStorage.getItem('movies');
    return savedMovies ? JSON.parse(savedMovies) : [];
  });

  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Save movies and cart to localStorage on updates
  useEffect(() => {
    localStorage.setItem('movies', JSON.stringify(movies));
  }, [movies]);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Movie Functions
  const addMovie = (movie) => {
    if (!movie.trim()) {
      alert("Movie name cannot be empty");
      return;
    }
    setMovies([...movies, { title: movie, watched: false, isEditing: false }]);
  };

  const toggleWatch = (index) => {
    const updatedMovies = [...movies];
    updatedMovies[index].watched = !updatedMovies[index].watched;
    setMovies(updatedMovies);
  };

  const updateMovie = (index, newTitle, isEditing = false) => {
    const updatedMovies = [...movies];
    updatedMovies[index].title = newTitle;
    updatedMovies[index].isEditing = isEditing;
    setMovies(updatedMovies);
  };

  const deleteMovie = (index) => {
    const updatedMovies = movies.filter((_, i) => i !== index);
    setMovies(updatedMovies);
  };

  // Cart Functions
  const addToCart = (item) => {
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
      alert('You cannot add more than one subscription.');
    } else {
      const updatedCart = [...cart, { ...item, quantity: 1 }];
      setCart(updatedCart);
    }
  };

  const removeFromCart = (id) => {
    const updatedCart = cart.filter(item => item.id !== id);
    setCart(updatedCart);
  };

  const increaseQuantity = (id) => {
    const updatedCart = cart.map(item =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCart(updatedCart);
  };

  const decreaseQuantity = (id) => {
    const updatedCart = cart.map(item =>
      item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
    );
    setCart(updatedCart);
  };

  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
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
            <li><Link to="/search">Search Movies</Link></li> {/* New link for TMDB search */}
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<StreamList addMovie={addMovie} />} />
          <Route path="/movies" element={<Movies movies={movies} updateMovie={updateMovie} deleteMovie={deleteMovie} toggleWatch={toggleWatch} />} />
          <Route path="/cart" element={<CartSystem cart={cart} removeFromCart={removeFromCart} increaseQuantity={increaseQuantity} decreaseQuantity={decreaseQuantity} calculateTotalPrice={calculateTotalPrice} />} />
          <Route path="/about" element={<About />} />
          <Route path="/search" element={<MovieSearch />} /> {/* Route for TMDB search */}
        </Routes>

        {/* Display available subscriptions */}
        <h2>Available Subscriptions</h2>
        {subscriptions.map((item) => (
          <div key={item.id}>
            <span>{item.name}</span>
            <span>Price: ${item.price}</span>
            <button onClick={() => addToCart(item)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </Router>
  );
}

export default App;
