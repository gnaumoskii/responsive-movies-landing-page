import { closeModal, createModal } from "./utility/modal";
import "../css/movies/movie-form.css";
import { renderMoviesComponent, openMovieDetailsModal } from "./movies";
import { movies, saveMoviesData } from "../data/data";

export const openAddMovieModal = () => {
    const addFormContainer = createFormElement();
    const addForm = $(addFormContainer).find(".movie-form")[0];
    const cancelButton = $(addFormContainer).find(".movie-form__buttons__btn-cancel")[0];

    addErrorMessagesHandler(addForm);
    $(addForm).on("submit", addFormSubmitHandler);
    $(cancelButton).on("click", () => {
        closeModal();
    });

    closeModal(); // Close all previous modals before opening the edit form modal
    const addModal = createModal(addFormContainer);
    $(".movies-page").append(addModal);
};

export const openEditMovieModal = (movie) => {
    const editFormContainer = createFormElement(movie);
    const editForm = $(editFormContainer).find(".movie-form")[0];
    const cancelButton = $(editFormContainer).find(".movie-form__buttons__btn-cancel")[0];
    $(editForm).on("submit", (e) => editFormSubmitHandler(e, movie.id));
    $(cancelButton).on("click", () => {
        closeModal();
        openMovieDetailsModal(movie);
    });

    addErrorMessagesHandler(editForm); // Added error handling
    closeModal(); // Close all previous modals before opening the edit form modal

    const editModal = createModal(editFormContainer);
    $(".movies-page").append(editModal);
};

const addErrorMessagesHandler = (form) => {
    // Clear the existing error messages on input change
    $(form).find("#movie-title").on("input", () => {
        if($("#movie-title + .movie-form__input-group__error-message").length) {
            $("#movie-title + .movie-form__input-group__error-message").remove();
        }
    });

    $(form).find("#movie-description").on("input", () => {
        if($("#movie-description + .movie-form__input-group__error-message").length) {
            $("#movie-description + .movie-form__input-group__error-message").remove();
            
        }
    });

    $(form).find("#movie-release-date").on("input", () => {
        if($("#movie-release-date + .movie-form__input-group__error-message").length) {
            $("#movie-release-date + .movie-form__input-group__error-message").remove();
        }
    });
};

const createFormElement = (movieData) => {
    return $(`
    <div class="movie-form__container">
            <h1 class='movie-form__container__heading'>${movieData ? "Edit Movie" : "Add Movie"}</h1>
            <form class="movie-form">
                <div class="movie-form__input-group">
                    <label class="movie-form__input-group__label" for="movie-title">Title</label>
                    <input 
                        class="movie-form__input-group__input" 
                        type="text" 
                        id="movie-title" 
                        name="movie-title" 
                        value="${movieData ? movieData.title : ""}" 
                        autocomplete="off"
                    />
                </div>
                <div class="movie-form__input-group">
                    <label class="movie-form__input-group__label" for="movie-description">Description</label>
                    <textarea class="movie-form__input-group__input" type="text" id="movie-description" name="movie-description" autocomplete="off">${
                        movieData ? movieData.description : ""
                    }</textarea>
                </div>
                <div class="movie-form__input-group">
                    <label class="movie-form__input-group__label" for="movie-release-date">Release Date</label>
                    <input 
                        class="movie-form__input-group__input" 
                        type="date" 
                        id="movie-release-date" 
                        name="movie-release-date" 
                        value="${movieData ? movieData.releaseDate : ""}"
                    />
                </div>
                <div>
                    <label class="movie-form__input-group__label">Genre</label>
                    <div class="movie-form__input-group__genres">
                        <input 
                            class="movie-form__input-group__input--checkbox" 
                            ${movieData && movieData.genre.includes("ACTION") ? "checked" : ""} 
                            type="checkbox" 
                            name="movie-genre--action" 
                            id="movie-genre--action" 
                            data-value="ACTION"
                        />
                        <label class="movie-form__input-group__genre" for="movie-genre--action">
                            ACTION
                        </label>
                        <input 
                            class="movie-form__input-group__input--checkbox" 
                            ${movieData && movieData.genre.includes("ADVENTURE") ? "checked" : ""} 
                            type="checkbox" 
                            name="movie-genre--adventure" 
                            id="movie-genre--adventure" 
                            data-value="ADVENTURE"
                        />
                        <label class="movie-form__input-group__genre" for="movie-genre--adventure">
                            ADVENTURE
                        </label>
                        <input 
                            class="movie-form__input-group__input--checkbox" 
                            ${movieData && movieData.genre.includes("ANIMATION") ? "checked" : ""} 
                            type="checkbox" 
                            name="movie-genre--animation" 
                            id="movie-genre--animation" 
                            data-value="ANIMATION"
                        />
                        <label class="movie-form__input-group__genre" for="movie-genre--animation">
                            ANIMATION
                        </label>
                        <input 
                            class="movie-form__input-group__input--checkbox" 
                            ${movieData && movieData.genre.includes("COMEDY") ? "checked" : ""} 
                            type="checkbox" 
                            name="movie-genre--comedy" 
                            id="movie-genre--comedy" 
                            data-value="COMEDY"
                        />
                        <label class="movie-form__input-group__genre" for="movie-genre--comedy">
                            COMEDY
                        </label>
                        <input 
                            class="movie-form__input-group__input--checkbox" 
                            ${movieData && movieData.genre.includes("CRIME") ? "checked" : ""} 
                            type="checkbox" 
                            name="movie-genre--crime" 
                            id="movie-genre--crime" 
                            data-value="CRIME"
                        />
                        <label class="movie-form__input-group__genre" for="movie-genre--crime">
                            CRIME
                        </label>
                        <input 
                            class="movie-form__input-group__input--checkbox" 
                            ${movieData && movieData.genre.includes("DRAMA") ? "checked" : ""} 
                            type="checkbox" 
                            name="movie-genre--drama" 
                            id="movie-genre--drama" 
                            data-value="DRAMA"
                        />
                        <label class="movie-form__input-group__genre" for="movie-genre--drama">
                            DRAMA
                        </label>
                        <input 
                            class="movie-form__input-group__input--checkbox" 
                            ${movieData && movieData.genre.includes("FANTASY") ? "checked" : ""} 
                            type="checkbox" 
                            name="movie-genre--fantasy" 
                            id="movie-genre--fantasy" 
                            data-value="FANTASY"
                        />
                        <label class="movie-form__input-group__genre" for="movie-genre--fantasy">
                            FANTASY
                        </label>
                        <input 
                            class="movie-form__input-group__input--checkbox" 
                            ${movieData && movieData.genre.includes("HORROR") ? "checked" : ""} 
                            type="checkbox" 
                            name="movie-genre--horror" 
                            id="movie-genre--horror" 
                            data-value="HORROR"
                        />
                        <label class="movie-form__input-group__genre" for="movie-genre--horror">
                            HORROR
                        </label>
                        <input 
                            class="movie-form__input-group__input--checkbox" 
                            ${movieData && movieData.genre.includes("SCI-FI") ? "checked" : ""} 
                            type="checkbox" 
                            name="movie-genre--sci-fi" 
                            id="movie-genre--sci-fi" 
                            data-value="SCI-FI"
                        />
                        <label class="movie-form__input-group__genre" for="movie-genre--sci-fi">
                            SCI-FI
                        </label>
                    </div>
                </div>
                <div class="movie-form__input-group">
                    <label class="movie-form__input-group__label" for="movie-poster">Poster</label>
                    <input 
                        class="movie-form__input-group__input" 
                        type="text" id="movie-poster" 
                        name="movie-poster" 
                        value="${movieData ? movieData.poster : ""}" 
                        autocomplete="off"
                    />
                </div>
                <div class="movie-form__buttons">
                    <button class="movie-form__buttons__btn-save custom-btn-primary">Save</button>
                    <button type="button" class="movie-form__buttons__btn-cancel custom-btn-secondary">Cancel</button>
                <div>

            </form>
    </div>
    `)[0];
};

const validateForm = (title, description, releaseDate) => {
    // Remove all existing error messages before validating the form
    $(".movie-form__input-group__error-message").remove();
    let isValid = true;
    if (title.trim().length > 250) {
        $("#movie-title").after('<p class="movie-form__input-group__error-message">Movie title can\' exceed 250 characters.</p>');
        isValid = false;
    } else if (title.trim().length === 0) {
        $("#movie-title").after('<p class="movie-form__input-group__error-message">Movie title cannot be empty.</p>');
        isValid = false;
    }

    if (description.trim().length > 500) {
        $("#movie-description").after('<p class="movie-form__input-group__error-message">Description can\'t exceed 500 characters.</p>');
        isValid = false;
    } else if (description.trim().length === 0) {
        $("#movie-description").after('<p class="movie-form__input-group__error-message">Description cannot be empty.</p>');
        isValid = false;
    }

    var datePattern = /^\d{4}-\d{2}-\d{2}$/;
    if (releaseDate.match(datePattern) === null) {
        $("#movie-release-date").after('<p class="movie-form__input-group__error-message">Invalid date.</p>');
        isValid = false;
    }
    return isValid;
};

const addFormSubmitHandler = (event) => {
    event.preventDefault();

    const form = $(".movie-form")[0];
    const { title, description, releaseDate, poster, genre } = getMovieFormData(form);

    const formIsValid = validateForm(title, description, releaseDate);
    if (!formIsValid) {
        return;
    }

    const newMovie = {
        id: movies.length.toString(),
        title,
        releaseDate,
        description,
        genre,
        poster,
    };
    movies.push(newMovie);
    saveMoviesData(movies);
    closeModal();
    renderMoviesComponent();
};

const editFormSubmitHandler = (event, movieId) => {
    event.preventDefault();
    const form = $(".movie-form")[0];
    const { title, description, releaseDate, poster, genre } = getMovieFormData(form);

    const formIsValid = validateForm(title, description, releaseDate);
    if (!formIsValid) {
        return;
    }
    const movie = movies.find((movie) => movie.id === movieId);
    movie.title = title;
    movie.description = description;
    movie.releaseDate = releaseDate;
    movie.genre = genre;
    movie.poster = poster;
    saveMoviesData(movies);
    closeModal();
    openMovieDetailsModal(movie);
    renderMoviesComponent();
};

const getMovieFormData = (form) => {
    const title = form.elements["movie-title"].value;
    const description = form.elements["movie-description"].value;
    const releaseDate = form.elements["movie-release-date"].value;
    const genres = $(form).find(".movie-form__input-group__input--checkbox");
    const poster = form.elements["movie-poster"].value;

    const selectedGenres = [];
    // Loops through all genre checkboxes and adds only the selected genres to the array
    for (let genre of genres) {
        if (genre.checked === true) {
            selectedGenres.push(genre.dataset.value);
        }
    }

    const movieFormData = {
        title,
        description,
        releaseDate,
        genre: selectedGenres,
        poster,
    };

    return movieFormData;
};
