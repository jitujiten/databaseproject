import React, { useState, useEffect,useCallback } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  
  const [movies, setmovies] = useState([]);

  const [isLoading, setloading] = useState(false);

  const [error, seterror] = useState(null);


 
  
  const fetchMoviehandler =useCallback(async ()=>{
    try {
      setloading(true);

      const response = await fetch("https://swapi.dev/api/films");

      if (!response.ok) {
        throw new Error("Something went wrong....Retrying");
      }

      const data = await response.json();

      const transformedmovies = data.results.map((moviedata) => {
          return {
            id: moviedata.episode_id,
            title: moviedata.title,
            openingText: moviedata.opening_crawl,
            releaseDate: moviedata.release_date,
          };
        });
    
      
      setmovies(transformedmovies);
    } catch (error) {
      seterror(error.message);
    }
    setloading(false);
  },[]);

  useEffect(() => {
    fetchMoviehandler();
    console.log("fetched")
}, [fetchMoviehandler]);


  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviehandler}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading && movies.length > 0 && <MoviesList movies={movies} />}

        {!isLoading && movies.length === 0 && !error && (
          <h2>No Movies found</h2>
        )}

        {!isLoading && !error && <h2>{error}</h2>}

        {isLoading && (
          <div>
            <div className="spinner-border text-warning" role="status"></div>
            <div>Loading...</div>
          </div>
        )}
      </section>
    </React.Fragment>
  );
}

export default App;
