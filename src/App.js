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

      const response = await fetch("https://react-http-a04e6-default-rtdb.firebaseio.com/movies.json");

      if (!response.ok) {
        throw new Error("Something went wrong....Retrying");
      }

      const data = await response.json();
     
      const loadedmovies=[];

      for(const key in data){
        loadedmovies.unshift({
          id:key,
          title:data[key].title,
          openingText:data[key].openingText,
          releaseDate:data[key].releaseDate
        })
      }
      setmovies(loadedmovies);
    } catch (error) {
      seterror(error.message);
    }
    setloading(false);
  }, []);

  useEffect(() => {
    fetchMoviehandler();
    console.log("fetched");
  }, [fetchMoviehandler]);

const submitHandler= async (e)=>{
  e.preventDefault();

  const movieObject={
    "title":e.target.title.value,
    "openingText":e.target.OpeningText.value,
    "releaseDate":e.target.date.value
  }

await fetch('https://react-http-a04e6-default-rtdb.firebaseio.com/movies.json',{
    method:'POST',
    body:JSON.stringify(movieObject),
    headers:{
      "content-Type":"aplication/json"
    }
  })


 fetchMoviehandler();
}

const removeHandler = useCallback(async (id) => {
  try {
    setloading(true);
  
    await fetch(`https://react-http-a04e6-default-rtdb.firebaseio.com/movies/${id}.json`, {
      method: "DELETE"
    });

    setmovies(movies.filter(movie => movie.id !== id));
  } catch (error) {
    seterror(error.message);
  }
  setloading(false);
}, [movies]);



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
          <button type="reset">Reset</button>
        </form>
      </div>

      <section>
        <button onClick={fetchMoviehandler}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading && movies.length > 0 && <MoviesList onremove={removeHandler} movieslist={movies} />}

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
