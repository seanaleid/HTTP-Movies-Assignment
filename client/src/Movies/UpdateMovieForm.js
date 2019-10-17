import React, { useState, useEffect } from 'react';
import axios from "axios"

const initialMovie = {
    title: "",
    id: "",
    director: "",
    metascore: "",
    stars: [ "" ]
}

const UpdateMovieForm = props => {
    console.log(props)
    const [ movie, setMovie ] = useState(initialMovie);

    useEffect(() => {
        const movieToUpdate = props.savedList.find(
            movie => `${movie.id}` === props.match.params.id
        )

        if (movieToUpdate) setMovie(movieToUpdate)
    }, [props.movie, props.match.params.id])

    // const handleChanges = e => {
    //     setMovie({
    //         ...movie,
    //         [e.target.name]: e.target.value
    //     })
    // }

    const handleChanges = ev => {
        ev.persist();
        let value = ev.target.value;
        if(ev.target.name === "metascore"){
            value = parseInt(value, 10)
        }

        setMovie({
            ...movie,
            [ev.target.name]: ev.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault();
        axios.put(`http://localhost:5000/api/movies/${props.id}`, movie)
        .then(res => console.log(res))
        .catch(err => console.log(err.response))
    }

    return (
        <div className="movie-card">
            <h2>Update Movie</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    name="title" 
                    placeholder="Title"
                    onChange={handleChanges}
                    value={movie.title}
                />
                <input 
                    type="text" 
                    name="director" 
                    placeholder="Director"
                    onChange={handleChanges}
                    value={movie.director}
                />
                <input 
                    type="text" 
                    name="metascore" 
                    placeholder="Metascore"
                    onChange={handleChanges}
                    value={movie.metascore}
                />
                <input 
                    type="text" 
                    name="stars" 
                    placeholder="Stars"
                    onChange={handleChanges}
                    value={movie.stars}
                />
                <button className="movie-button">Update</button>
            </form>
        </div>
    );
};

export default UpdateMovieForm;
