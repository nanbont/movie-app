import React, { useEffect, useState } from 'react';
import Search from './Components/Search.jsx';
import Spinner from './Components/Spinner.jsx';
import MovieCard from './Components/MovieCard.jsx';
import { useDebounce } from 'react-use';
import { updateSearchCount, getTrendingMovies } from './appwrite.js'; // Corrected import

const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const App = () => {
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const [movies, setMovies] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  
   
  const [trendingMovies, setTrendingMovies] = useState([]);
  

  useDebounce(
    () => setDebouncedSearchTerm(searchTerm),
    500,
    [searchTerm]
  );

  const loadTrendingMovies = async () => { // Corrected function name
    try {
      const movies = await getTrendingMovies();
      setTrendingMovies(movies);
    } catch (error) {
      console.error("Error fetching trending movies:", error); // Corrected template literal syntax
    }
  };

  useEffect(() => {
    const fetchMovies = async (query = '') => {
      setIsLoading(true);
      try {
        const API_OPTIONS = {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${API_KEY}`,
          },
        };

        const endpoint = query
          ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(
              query
            )}&language=en-US&page=1`
          : `${API_BASE_URL}/movie/popular?language=en-US&page=1`;
        const response = await fetch(endpoint, API_OPTIONS);

        if (!response.ok) {
          throw new Error("Failed to fetch movies.");
        }
        const result = await response.json();
        setMovies(result.results);
        setIsLoading(false);

        if (query && result.results && result.results.length > 0) {
          await updateSearchCount(query, result.results[0]);
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
        setErrorMessage('Error fetching movies. Please try again later.');
        setIsLoading(false);
      }
    };

    if (API_KEY) {
      fetchMovies(debouncedSearchTerm);
    } else {
      console.error("API_KEY is not set. Please check your .env file.");
      setErrorMessage("API Key is missing. Please check your .env file.");
      setIsLoading(false);
    }
  }, [API_KEY, debouncedSearchTerm]);

  useEffect(() => {
    loadTrendingMovies();
  }, []);

  return (
    <main>
      <div className="pattern" />

      <div className="wrapper">
        <header>
          <img src="./hero.png" alt="Hero Banner" />
          <h1>
            Find <span className="text-gradient">Movies</span> you'll Enjoy Without the Hassle
          </h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>

        {trendingMovies.length > 0 && (
          <section className="trending">
            <h2>Trending Movies</h2>

            <ul>
              {trendingMovies.map((movie, index) => (
                <li key={movie.$id}>
                  <p>{index + 1}</p>
                  <img src={movie.poster_url} alt={movie.searchTerm} /> {/* Corrected image and alt attributes */}
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="all-movies">
          <h2>All movies</h2>

          {isLoading ? (
            <Spinner />
          ) : errorMessage ? (
            <p className="text-red-500">{errorMessage}</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 p-4">
              {movies &&
                movies.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export default App;