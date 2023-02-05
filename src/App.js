import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setmovies] = useState([]);

  const [loading, setLoading] = useState(false);

  async function fetchMoviehandler() {
    setLoading(true);
    const response = await fetch("https://swapi.dev/api/films");

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
    setLoading(false);
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviehandler}>Fetch Movies</button>
      </section>
      <section>
        {!loading && movies.length>0 &&  <MoviesList movies={movies} />}

        {!loading  && movies.length===0 && (
          <h2>
            No Movies Found
          </h2>
        )}

        {loading  && movies.length===0 && (
          <div>
            <div className="spinner-border text-danger" role="status"></div>
            <div>Loading...</div>
          </div>
        )}
      </section>
    </React.Fragment>
  );
}

export default App;
