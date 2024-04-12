import moviesData from "../data/movies.json";

// Global Movies State
export let movies;

export const saveMoviesData = (updatedMovies) => {
    movies = updatedMovies;
    localStorage.setItem("movies", JSON.stringify(movies));
}

// Persistent data handled in local storage, moviesData is the initial movies list
if(!localStorage.getItem("movies")) {
    localStorage.setItem("movies", JSON.stringify(moviesData.movies));
    movies = moviesData.movies;
} else {
    movies = JSON.parse(localStorage.getItem("movies"));
}