import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import StreamList from './components/StreamList';
import Movies from './components/Movies';
import CartSystem from './components/CartSystem';
import About from './components/About';
import MovieSearch from './components/MovieSearch'; 
import Login from './components/Login';  // Import Login component
import subscriptions from './Data';
import './App.css';

function App() {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user')) || null);
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem('cart')) || []);

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Logout function to clear user data
  const handleLogout = () => {
    setUser(null);
  };

  // Add to Cart function to manage subscriptions
  const addToCart = (item) => {
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
      alert('You cannot add more than one subscription.');
    } else {
      const updatedCart = [...cart, { ...item, quantity: 1 }];
      setCart(updatedCart);
    }
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
            <li><Link to="/search">Search Movies</Link></li>
            {user ? (
              <li><button onClick={handleLogout}>Logout</button></li>
            ) : (
              <li><Link to="/login">Login</Link></li>
            )}
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={user ? <StreamList /> : <Navigate to="/login" />} />
          <Route path="/movies" element={user ? <Movies /> : <Navigate to="/login" />} />
          <Route path="/cart" element={user ? <CartSystem cart={cart} /> : <Navigate to="/login" />} />
          <Route path="/about" element={<About />} />
          <Route path="/search" element={<MovieSearch />} />
          <Route path="/login" element={<Login onLoginSuccess={setUser} />} />
        </Routes>

        {/* Available Subscriptions */}
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
