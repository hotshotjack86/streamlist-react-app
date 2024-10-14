import React, { useState } from 'react';

function StreamList({ addMovie }) {
  const [movie, setMovie] = useState(''); // State to manage the input value
  const [confirmationMessage, setConfirmationMessage] = useState(''); // State to manage the confirmation message

  const handleSubmit = (event) => {
    event.preventDefault();
    // Check if movie input is not empty
    if (movie.trim() === "") {
      setConfirmationMessage("Movie title cannot be empty!"); // Show error if empty
    } else {
      addMovie(movie); // Call the addMovie function passed as a prop
      setConfirmationMessage(`${movie} has been added to your list!`); // Set the confirmation message
      setMovie(''); // Clear the input field after submission
    }
  };

  return (
    <div>
      <h1>StreamList</h1>
      {/* Form to capture user input */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={movie}
          onChange={(e) => setMovie(e.target.value)}
          placeholder="Enter movie or show name"
        />
        <button type="submit">Add to StreamList</button>
      </form>
      
      {/* Display the confirmation message */}
      {confirmationMessage && <p>{confirmationMessage}</p>}
    </div>
  );
}

export default StreamList;
