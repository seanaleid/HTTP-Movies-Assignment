import React from "react";
import axios from "axios";
import MovieCard from "./MovieCard";

export default class Movie extends React.Component {
  constructor(props) {
    console.log(props);
    super(props);
    this.state = {
      movie: null
    };
  }

  
  updateMovie = () => {
    const updateMovieInfo = this.props.updateMovieInfo;
    updateMovieInfo((id) => {this.state.movie.find(
      film => `${film.id}` === this.props.match.params.id
    )})
  }


  componentDidMount() {
    this.fetchMovie(this.props.match.params.id);
  }

  // function that works like --> updateMovie
  componentWillReceiveProps(newProps) {
    if (this.props.match.params.id !== newProps.match.params.id) {
      this.fetchMovie(newProps.match.params.id);
    }
  }

  fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      // .then(res => this.setState({ movie: res.data }))
      .then(res => console.log(res))
      .catch(err => console.log(err.response));
  };

  saveMovie = () => {
    const addToSavedList = this.props.addToSavedList;
    addToSavedList(this.state.movie);
  };

  deleteMovie = id => {
    axios
      .delete(`http://localhost:5000/api/movies/${id}`)
      .then(res => {
        console.log(res);
        let newArray = this.state.filter(film => film.id !== id)
        this.state.movie=([...newArray])
      })
      .catch(err => console.log(err.response))
  }

  render() {
    if (!this.state.movie) {
      return <div>Loading movie information...</div>;
    }

    return (
      <div className="save-wrapper">
        <MovieCard movie={this.state.movie} />
        <div className="save-button" onClick={this.saveMovie}>
          Save
        </div>
        <button 
          className="movie-button" 
          onClick={() => this.props.history.push(`/update-movie/${this.updateMovie}`)}
          >
            Edit
          </button>
        <button className="movie-button" onClick={this.deleteMovie}>Delete</button>
      </div>
    );
  }
}
