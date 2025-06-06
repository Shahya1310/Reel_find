import React, { useEffect, useState } from 'react';
import './App.css';

const API_KEY = '6e7783ed6f71d1fdff4cdc81ed527fe7'; 

const App = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch popular movies on initial load
  useEffect(() => {
    const fetchPopularMovies = async () => {
      setLoading(true);
      try {
        const res = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`);
        const data = await res.json();
        setMovies(data.results);
      } catch (error) {
        console.error('Error fetching popular movies:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPopularMovies();
  }, []);

  // Search movies by query
  const fetchMovies = async () => {
    if (!query.trim()) return;
    setLoading(true);
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`
      );
      const data = await res.json();
      setMovies(data.results);
    } catch (error) {
      console.error('Error fetching movies:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchMovies();
  };

  return (
    <div className="app">
      <h1>🎬CinePeek</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search for a movie..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      <h2 className="heading">
        {query ? 'Search Results' : 'Popular Movies'}
      </h2>

      {loading ? (
        <p className="loading">Loading...</p>
      ) : (
        <div className="movie-list">
          {movies.length > 0 ? (
            movies.map((movie) => (
              <div key={movie.id} className="movie-card">
                {movie.poster_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                    alt={movie.title}
                  />
                ) : (
                  <div className="no-image">No Image</div>
                )}
                <h3>{movie.title}</h3>
                <p>⭐ {movie.vote_average}</p>
              </div>
            ))
          ) : (
            <p className="no-results">No movies found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
