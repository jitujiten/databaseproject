import React, { useState, useEffect, useCallback } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setmovies] = useState([]);

  const [isLoading, setloading] = useState(false);

  const [error, seterror] = useState(null);

  const fetchMoviehandler = useCallback(async () => {
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
  }, []);

  useEffect(() => {
    fetchMoviehandler();
    console.log("fetched");
  }, [fetchMoviehandler]);

const submitHandler=(e)=>{
  e.preventDefault();

  const movieObject={
    "title":e.target.title.value,
    "opening_crawl":e.target.OpeningText.value,
    "release_date":new Date(e.target.date.value)
  }
 console.log(movieObject);

}





  return (
    <React.Fragment>
      <div className="section1">
        <form onSubmit={submitHandler}>
          <label htmlFor="Title" className="form-label">
            Title
          </label>
          <input id="title" type="text" className="form-control" />
          <label htmlFor="Opening Text" className="form-label">
            Opening Text
          </label>
          <textarea
            id="OpeningText"
            className="form-control"
            rows="3"
          ></textarea>
          <label htmlFor="Release Date" className="form-label">
          Release Date
          </label>
          <input type="date" 
           id="date" 
          className="form-control" />
          <button>Add More</button>
        </form>
      </div>

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
