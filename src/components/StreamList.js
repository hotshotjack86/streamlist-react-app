import React, { useState } from 'react';

function StreamList({ addMovie }) {
  const [movie, setMovie] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (movie.trim()) {
      addMovie(movie);  // Pass the movie title to the parent (App.js)
      setMovie('');     // Clear the input field
    }
  };

  return (
    <div>
      <h1>StreamList Page</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={movie}
          onChange={(e) => setMovie(e.target.value)}
          placeholder="Enter movie or show name"
        />
        <button type="submit">Add to StreamList</button>
      </form>
    </div>
  );
}

export default StreamList;