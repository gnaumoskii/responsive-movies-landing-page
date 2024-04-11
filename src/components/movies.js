import "../css/movies/movies.css";
import moviesData from "../data/movies.json";
import { closeModal, createModal } from "./utility/modal";

// Movies state
let movies = moviesData.movies;

export const renderMoviesComponent = () => {
    renderMoviesList(movies);
};

const renderMoviesList = (movies) => {
    $("ul.movies-list").html("");
    $.each(movies, (index, movie) => {
        const movieCard = createMovieCard(movie);
        $(movieCard).on("click", () => openMovieDetailsModal(movie));
        $("ul.movies-list").append(movieCard);
    });
};

const createMovieCard = (movie) => {
    return $(`
        <li class="movies-list__item col-12 px-5 px-sm-3 d-flex justify-content-center">
            <div class="movie-card">
                <div class="movie-card__poster-container"><img class="movie-card__poster" src="${movie.poster || "#"}"/></div>
                <div class="movie-card__details">
                <p class="movie-card__details__title">${movie.title}</p>
                    <div class="movie-card__details-info">
                        <p class="movie-card__details-info__year">${movie.year}</p>
                    </div>
                </div>
            </div>
        </li>`
    );
};

const openMovieDetailsModal = (movie) => {
    const movieDetailsElement = createMovieDetailsElement(movie);
    const modal = createModal(movieDetailsElement);
    $(".movies-page").append(modal);
};



const createMovieDetailsElement = (movie) => {
    const movieDetails = $(`<div class="movie-details container"></div>`);
    const movieDetailsContent = $(`
        <div class="movie-details__content">
            <div class="movie-details__content__poster-container">
                <img src="${movie.poster || "#"}" alt="${movie.title}" class="movie-details__content__poster">
            </div>
        </div>`
    );
    const movieDetailsInfo = $(`
        <div class="movie-details__content__info">
            <h1 class="movie-details__content__info__title">${movie.title}</h1>
            <p class="movie-details__content__info__description">${movie.description}</p>
            <div>
                <p class="movie-details__content__info__label">Release Year</p>
                <p class="movie-details__content__info__year">${movie.year}</p>
            </div>
            <div>
                <p class="movie-details__content__info__label">Genre</p>
                <p class="movie-details__content__info__genre">${movie.genre.join(", ").toLowerCase()}</p>
            </div>
        </div>`
    );

    const buttons = $(`<div class=""></div>`);
    const buttonEdit = $("<button>Edit</button>");
    const buttonDelete = $(`<button>Delete</button>`);
    buttonDelete.on("click", () => deleteMovie(movie.id));
    buttonEdit.on("click", () => editMovie(movie.id));

    buttons.append(buttonEdit, buttonDelete);
    movieDetailsInfo.prepend(buttons);
    movieDetailsContent.append(movieDetailsInfo);
    movieDetails.append(movieDetailsContent);

    return movieDetails;
};

const deleteMovie = (id) => {
    movies = movies.filter((movie) => movie.id !== id);
    // Re-rendering the movie list after removing the movie.
    renderMoviesComponent(movies);
    closeModal();
};

const editMovie = (id) => {

};
