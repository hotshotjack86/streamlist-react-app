import React, { useState } from 'react';

function StreamList({ addMovie }) {
  const [movieTitle, setMovieTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (movieTitle.trim()) {
      addMovie(movieTitle);
      setMovieTitle(''); // Clear the input field after adding
    } else {
      alert('Please enter a movie title');
    }
  };

  return (
    <div>
      <h1>StreamList</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={movieTitle}
          onChange={(e) => setMovieTitle(e.target.value)}
          placeholder="Enter movie or show name"
        />
        <button type="submit">Add Movie</button>
      </form>
    </div>
  );
}

export default StreamList;
