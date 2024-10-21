import React from 'react';

function Movies({ movies, updateMovie, deleteMovie, toggleWatch }) {
  return (
    <div>
      <h2>Movie List</h2>
      <ul>
        {movies.map((movie, index) => (
          <li key={index}>
            {movie.isEditing ? (
              <input
                type="text"
                value={movie.title}
                onChange={(e) => updateMovie(index, e.target.value)}
                onBlur={() => updateMovie(index, movie.title, false)}
              />
            ) : (
              <span style={{ textDecoration: movie.watched ? 'line-through' : 'none' }}>
                {movie.title}
              </span>
            )}
            <button onClick={() => toggleWatch(index)}>
              {movie.watched ? 'Unwatch' : 'Watch'}
            </button>
            <button onClick={() => updateMovie(index, movie.title, true)}>Edit</button>
            <button onClick={() => deleteMovie(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Movies;
