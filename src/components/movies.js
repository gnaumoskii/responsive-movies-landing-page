import "../css/movies/movies.css";
import moviesData from "../data/movies.json";
import { getEditFormElement, openEditFormModal } from "./movie-form";
import { closeModal, createModal } from "./utility/modal";

// Movies state
export let { movies } = moviesData;

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

export const openMovieDetailsModal = (movie) => {
    const movieDetailsElement = createMovieDetailsElement(movie);
    const modal = createModal(movieDetailsElement);
    $(".movies-page").append(modal);
};



const createMovieDetailsElement = (movie) => {
    const movieDetails = $(`
    <div class="movie-details container">
        <div class="movie-details__content">
            <div class="movie-details__content__poster-container">
                <img src="${movie.poster || "#"}" alt="${movie.title}" class="movie-details__content__poster">
            </div>
            <div class="movie-details__content__info">
                <div class="movie-details__content__info__buttons">
                    <button class="buttons__btn-edit btn-primary--gray">Edit</button>
                    <button class="buttons__btn-delete btn-secondary--danger">Delete</button>
                </div>
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
            </div>
        </div>
    </div>`);

    const buttonEdit = movieDetails.find(".buttons__btn-edit");
    const buttonDelete = movieDetails.find(".buttons__btn-delete");
    buttonDelete.on("click", () => deleteMovie(movie.id));
    buttonEdit.on("click", () => editMovie(movie));

    return movieDetails;
};

const deleteMovie = (id) => {
    movies = movies.filter((movie) => movie.id !== id);
    // Re-rendering the movie list after removing the movie.
    renderMoviesComponent(movies);
    closeModal();
};

const editMovie = (movie) => {
    openEditFormModal(movie);
};
