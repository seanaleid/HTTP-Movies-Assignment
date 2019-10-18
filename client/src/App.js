import React, { useState } from "react";
import { Route } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import UpdateMovieForm from "./Movies/UpdateMovieForm"

const App = () => {
  const [savedList, setSavedList] = useState([]);
  console.log(savedList);
  const [updateMovie, setUpdateMovie] = useState([])
  // below doesn't work
  // const [movieInfo, setMovieInfo] = useState([]);

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  const updateMovieInfo = movie => {
    setUpdateMovie([...updateMovie, movie]);
  }

  
  // below doesn't work
  // const updateMovieInfo = movie => {
  //   setMovieInfo([...movieInfo, movie]);
  // }

  //

  return (
    <>
      <SavedList list={savedList} />
      <Route 
        exact path="/" 
        render={props => {
        return <MovieList {...props} addToSavedList={addToSavedList} updateMovieInfo={updateMovieInfo}/>;  
        }}
      />
      <Route
        path="/movies/:id"
        render={props => {
          return <Movie {...props} addToSavedList={addToSavedList} updateMovieInfo={updateMovieInfo}/>;
        }}
      />
      <Route path="/update-movie/:id" render={props => {
      return <UpdateMovieForm {...props} savedList={savedList}  updateMovieInfo={updateMovieInfo} /> 
        }} 
      />
    </>
  );
};

export default App;
