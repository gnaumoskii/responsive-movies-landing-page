import "../css/movies/movies.css";
import moviesData from "../data/movies.json";
import { openEditMovieModal, openAddMovieModal } from "./movie-form";
import { closeModal, createModal } from "./utility/modal";

// Global Movies State
export let { movies } = moviesData;
let filteredMovies = movies;
export const appliedFilters = {
    genres: [],
};

export const renderMoviesComponent = () => {
    $(".movies-options__filters-form").hide();
    $(".movies-options__filters-form").on("submit", filterApplyHandler);
    $(".movies-options__buttons__btn-add").on("click", openAddMovieModal);
    $(".movies-options__buttons__btn-filter").on("click", toggleFilterOptions);
    $(".movies-options__filters-form__btn-submit").on("click", filterApplyHandler);
    renderMoviesList(filteredMovies);
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
                        <p class="movie-card__details-info__release-date">${new Date(movie.releaseDate).getFullYear()}</p>
                    </div>
                </div>
            </div>
        </li>`);
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
                    <p class="movie-details__content__info__label">Release Date</p>
                    <p class="movie-details__content__info__release-date">${new Date(movie.releaseDate).toLocaleDateString(undefined, {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                    })}</p>
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
    renderMoviesList(movies);
    closeModal();
};

const editMovie = (movie) => {
    openEditMovieModal(movie);
};

const toggleFilterOptions = () => {
    $(".movies-options__filters-form").toggle();
    if ($(".movies-options__filters-form").is(":visible")) {
        $(".movies-options__buttons__btn-filter").addClass("expanded");
    } else {
        $(".movies-options__buttons__btn-filter").removeClass("expanded");
    }
};

const filterApplyHandler = (event) => {
    event.preventDefault();

    const form = $(".movies-options__filters-form")[0];

    const genres = $(form).find(".filters-form__genres__input-group__input--checkbox");
    const selectedGenres = [];
    for (const genre of genres) {
        if (genre.checked) {
            selectedGenres.push(genre.dataset.filterValue);
        }
    }

    appliedFilters.genres = [...selectedGenres];
    console.log(appliedFilters.genres);
    filteredMovies = movies.filter((movie) => {
        let containsGenre = true;
        for (let appliedGenre of appliedFilters.genres) {
            if (!movie.genre.includes(appliedGenre)) {
                containsGenre = false;
            }
        }
        return containsGenre;
    });

    renderMoviesList(filteredMovies);
};
