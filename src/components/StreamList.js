import React, { useState } from 'react';

function StreamList({ addMovie }) {
  const [movie, setMovie] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addMovie(movie);
    setMovie(''); // Clear the input field after submission
  };

  return (
    <div>
      <h2>Add a Movie</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={movie}
          onChange={(e) => setMovie(e.target.value)}
          placeholder="Enter movie title"
        />
        <button type="submit">Add to StreamList</button>
      </form>
    </div>
  );
}

export default StreamList;
