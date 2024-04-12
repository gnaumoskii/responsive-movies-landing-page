import "../css/movies/movies.css";

import { openEditMovieModal, openAddMovieModal } from "./movie-form";
import { closeModal, createModal } from "./utility/modal";
import { movies, saveMoviesData } from "../data/data";


export const appliedFilters = {
    genres: [],
    // Other filters could be applied.
};

$(document).ready(() => {
    $(".movies-options__filters-form").on("submit", applyFiltersHandler);
    $(".movies-options__buttons__btn-add").on("click", openAddMovieModal);
    $(".movies-options__buttons__btn-filter").on("click", () => {
        toggleExpandFilterOptions();
    });
});

export const renderMoviesComponent = () => {
    const filteredMovies = filterMovies();
    renderMoviesList(filteredMovies);
    
};

const renderMoviesList = (movies) => {
    $("ul.movies-list").html("");
    $.each(movies, (index, movie) => {
        const movieCard = createMovieCard(movie);
        movieCard.css('animation-delay', `${index/20}s`);
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
                    <p class="movie-card__details__release-date">${new Date(movie.releaseDate).getFullYear()}</p>
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
    <div class="movie-details container-fluid">
        <div class="movie-details__content">
            <div class="movie-details__content__poster-container">
                <img src="${movie.poster || "#"}" alt="${movie.title}" class="movie-details__content__poster">
            </div>
            <div class="movie-details__content__info">
                <div class="movie-details__content__info__buttons">
                    <button class="buttons__btn-edit custom-btn-primary--gray">Edit</button>
                    <button class="buttons__btn-delete custom-btn-secondary--danger">Delete</button>
                </div>
                <h1 class="movie-details__content__info__title">${movie.title}</h1>
                <p class="movie-details__content__info__description">${movie.description}</p>
                <div class="movie-detials__content__info-wrapper">
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
        </div>
    </div>`);

    const buttonEdit = movieDetails.find(".buttons__btn-edit");
    const buttonDelete = movieDetails.find(".buttons__btn-delete");
    buttonDelete.on("click", () => deleteMovie(movie.id));
    buttonEdit.on("click", () => editMovie(movie));

    return movieDetails;
};

const deleteMovie = (id) => {
    const updatedMovies = movies.filter((movie) => movie.id !== id);
    saveMoviesData(updatedMovies);
    // Re-rendering the movie list after removing the movie.
    renderMoviesList(updatedMovies);
    closeModal();
};

const editMovie = (movie) => {
    openEditMovieModal(movie);
};

const toggleExpandFilterOptions = () => {
    if($(".movies-options").hasClass("expanded")) {
        $('.movies-options__filters-form').css("max-height", '0px');
        $(".movies-options__buttons__btn-filter").removeClass("expanded");
        $(".movies-options").removeClass("expanded");
        $(".movies-options__filters-form").removeClass("expanded");
    } else {
        $(".movies-options__buttons__btn-filter").addClass("expanded");
        $('.movies-options__filters-form').css("max-height", $('.movies-options__filters-form')[0].scrollHeight);
        $(".movies-options").addClass("expanded");
        $(".movies-options__filters-form").addClass("expanded");
    }

};

const applyFiltersHandler = (event) => {
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
    const filteredMovies = filterMovies();
    renderMoviesList(filteredMovies);
};

const filterMovies = () => {
    const filteredMovies = movies.filter((movie) => {
        let containsGenre = true;
        for (let appliedGenre of appliedFilters.genres) {
            if (!movie.genre.includes(appliedGenre)) {
                containsGenre = false;
            }
        }
        return containsGenre;
    });

    return filteredMovies;
};
