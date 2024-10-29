import React, { useState } from "react";
import axios from "axios";

const MovieSearch = () => {
    const [query, setQuery] = useState("");
    const [movies, setMovies] = useState([]);

    // Function to handle the search API request
    const handleSearch = async () => {
        try {
            const response = await axios.get(
                `https://api.themoviedb.org/3/search/movie`,
                {
                    params: {
                        api_key: "b4498fdacc1977f6b24006e325624a46",
                        query: query,
                    },
                }
            );
            setMovies(response.data.results);
        } catch (error) {
            console.error("Error fetching movie data:", error);
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <h1>Movie Search</h1>
            <div style={{ marginBottom: "20px" }}>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search for a movie..."
                    style={{ padding: "10px", fontSize: "16px" }}
                />
                <button onClick={handleSearch} style={{ padding: "10px", fontSize: "16px", marginLeft: "10px" }}>
                    Search
                </button>
            </div>
            <div>
                {movies.length > 0 ? (
                    movies.map((movie) => (
                        <div key={movie.id} style={{ marginBottom: "20px", borderBottom: "1px solid #ccc", paddingBottom: "10px" }}>
                            <h2>{movie.title}</h2>
                            <p><strong>Release Date:</strong> {movie.release_date}</p>
                            <p>{movie.overview}</p>
                        </div>
                    ))
                ) : (
                    <p>No movies found. Please try another search.</p>
                )}
            </div>
        </div>
    );
};

export default MovieSearch;
