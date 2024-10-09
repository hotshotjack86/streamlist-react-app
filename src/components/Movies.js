import React from 'react';

function Movies({ movies = [] }) {
  return (
    <div>
      <h1>Movies Page</h1>
      <ul>
        {/* Loop through the movies array and display each movie */}
        {movies.length > 0 ? (
          movies.map((movie, index) => <li key={index}>{movie}</li>)
        ) : (
          <p>No movies added yet</p>
        )}
      </ul>
    </div>
  );
}

export default Movies;