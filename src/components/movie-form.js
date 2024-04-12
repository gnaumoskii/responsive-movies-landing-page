import { closeModal, createModal } from "./utility/modal";
import "../css/movies/movie-form.css";
import { movies, renderMoviesComponent, openMovieDetailsModal } from "./movies";
export const createMovieFormElement = () => {};

export const openAddMovieModal = () => {
    const addFormContainer = createFormElement();
    const addForm = $(addFormContainer).find(".movie-form")[0];
    const cancelButton = $(addFormContainer).find(".movie-form__buttons__btn-cancel")[0];

    $(addForm).find('#movie-title').on("input", () => {
        $('#movie-title + .movie-form__input-group__error-message').remove()
    });

    $(addForm).find('#movie-description').on("input", () => {
        $('#movie-description + .movie-form__input-group__error-message').remove()
    });

    $(addForm).find('#movie-release-date').on("input", () => {
        $('#movie-release-date + .movie-form__input-group__error-message').remove()
    });


    $(addForm).on("submit", addFormSubmitHandler);
    $(cancelButton).on("click", () => {
        closeModal();
    });


    // Close all previous modals before opening the edit form modal.
    closeModal();

    // Create the edit modal and append it to the page component.
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

    // Close all previous modals before opening the edit form modal.
    closeModal();

    // Create the edit modal and append it to the page component.
    const editModal = createModal(editFormContainer);
    $(".movies-page").append(editModal);
};

const createFormElement = (movieData) => {
    return $(`
    <div class="movie-form__container">
            <h1 class='movie-form__container__heading'>${movieData ? "Edit Movie" : "Add Movie"}</h1>
            <form class="movie-form">
                <div class="movie-form__input-group">
                    <label class="movie-form__input-group__label" for="movie-title">Title</label>
                    <input class="movie-form__input-group__input" type="text" id="movie-title" name="movie-title" value="${movieData ? movieData.title : ""}"/>
                </div>
                <div class="movie-form__input-group">
                    <label class="movie-form__input-group__label" for="movie-description">Description</label>
                    <textarea class="movie-form__input-group__input" type="text" id="movie-description" name="movie-description">${
                        movieData ? movieData.description : ""
                    }</textarea>
                </div>
                <div class="movie-form__input-group">
                    <label class="movie-form__input-group__label" for="movie-release-date">Release Date</label>
                    <input class="movie-form__input-group__input" type="date" id="movie-release-date" name="movie-release-date" value="${
                        movieData ? movieData.releaseDate : ""
                    }"/>
                </div>
                <div>
                    <label class="movie-form__input-group__label">Genre</label>
                    <div class="movie-form__input-group__genres">
                        <label class="movie-form__input-group__genre" for="movie-genre--action">
                            <input 
                                class="movie-form__input-group__input--checkbox" 
                                ${movieData && movieData.genre.includes("ACTION") ? "checked" : ""} 
                                type="checkbox" 
                                name="movie-genre--action" 
                                id="movie-genre--action" 
                                data-value="ACTION"
                            />
                            ACTION
                        </label>
                        <label class="movie-form__input-group__genre" for="movie-genre--adventure">
                            <input 
                                class="movie-form__input-group__input--checkbox" 
                                ${movieData && movieData.genre.includes("ADVENTURE") ? "checked" : ""} 
                                type="checkbox" 
                                name="movie-genre--adventure" 
                                id="movie-genre--adventure" 
                                data-value="ADVENTURE"
                            />
                            ADVENTURE
                        </label>
                        <label class="movie-form__input-group__genre" for="movie-genre--animation">
                            <input 
                                class="movie-form__input-group__input--checkbox" 
                                ${movieData && movieData.genre.includes("ANIMATION") ? "checked" : ""} 
                                type="checkbox" 
                                name="movie-genre--animation" 
                                id="movie-genre--animation" 
                                data-value="ANIMATION"
                            />
                            ANIMATION
                        </label>
                        <label class="movie-form__input-group__genre" for="movie-genre--comedy">
                            <input 
                                class="movie-form__input-group__input--checkbox" 
                                ${movieData && movieData.genre.includes("COMEDY") ? "checked" : ""} 
                                type="checkbox" 
                                name="movie-genre--comedy" 
                                id="movie-genre--comedy" 
                                data-value="COMEDY"
                            />
                            COMEDY
                        </label>
                        <label class="movie-form__input-group__genre" for="movie-genre--crime">
                            <input 
                                class="movie-form__input-group__input--checkbox" 
                                ${movieData && movieData.genre.includes("CRIME") ? "checked" : ""} 
                                type="checkbox" 
                                name="movie-genre--crime" 
                                id="movie-genre--crime" 
                                data-value="CRIME"
                            />
                            CRIME
                        </label>
                        <label class="movie-form__input-group__genre" for="movie-genre--drama">
                            <input 
                                class="movie-form__input-group__input--checkbox" 
                                ${movieData && movieData.genre.includes("DRAMA") ? "checked" : ""} 
                                type="checkbox" 
                                name="movie-genre--drama" 
                                id="movie-genre--drama" 
                                data-value="DRAMA"
                            />
                            DRAMA
                        </label>
                        <label class="movie-form__input-group__genre" for="movie-genre--fantasy">
                            <input 
                                class="movie-form__input-group__input--checkbox" 
                                ${movieData && movieData.genre.includes("FANTASY") ? "checked" : ""} 
                                type="checkbox" 
                                name="movie-genre--fantasy" 
                                id="movie-genre--fantasy" 
                                data-value="FANTASY"
                            />
                            FANTASY
                        </label>
                        <label class="movie-form__input-group__genre" for="movie-genre--horror">
                            <input 
                                class="movie-form__input-group__input--checkbox" 
                                ${movieData && movieData.genre.includes("HORROR") ? "checked" : ""} 
                                type="checkbox" 
                                name="movie-genre--horror" 
                                id="movie-genre--horror" 
                                data-value="HORROR"
                            />
                            HORROR
                        </label>
                        <label class="movie-form__input-group__genre" for="movie-genre--sci-fi">
                            <input 
                                class="movie-form__input-group__input--checkbox" 
                                ${movieData && movieData.genre.includes("SCI-FI") ? "checked" : ""} 
                                type="checkbox" 
                                name="movie-genre--sci-fi" 
                                id="movie-genre--sci-fi" 
                                data-value="SCI-FI"
                            />
                            SCI-FI
                        </label>
                    </div>
                </div>
                <div class="movie-form__input-group">
                    <label class="movie-form__input-group__label" for="movie-poster">Poster</label>
                    <input class="movie-form__input-group__input" type="text" id="movie-poster" name="movie-poster" value="${
                        movieData ? movieData.poster : ""
                    }"/>
                </div>
                <div class="movie-form__buttons">
                    <button class="movie-form__buttons__btn-save btn-primary">Save</button>
                    <button type="button" class="movie-form__buttons__btn-cancel btn-secondary">Cancel</button>
                <div>

            </form>
    </div>
    `)[0];
};

const validateForm = ( title, description, releaseDate ) => {
    // Remove all existing error messages before validating form.
    $('.movie-form__input-group__error-message').remove();
    let isValid = true;
    if(title.trim().length > 250) {
        $("#movie-title").after('<p class="movie-form__input-group__error-message">Movie title can\' exceed 250 characters.</p>');
        isValid = false;
    } else if(title.trim().length === 0) {
        $("#movie-title").after('<p class="movie-form__input-group__error-message">Movie title cannot be empty.</p>');
        isValid = false;
    }


    if(description.trim().length > 500) {
        $("#movie-description").after('<p class="movie-form__input-group__error-message">Description can\'t exceed 500 characters.</p>')
        isValid = false;
    } else if(description.trim().length === 0) {
        $("#movie-description").after('<p class="movie-form__input-group__error-message">Description cannot be empty.</p>')
        isValid = false;
    }

    var datePattern = /^\d{4}-\d{2}-\d{2}$/;
    if(releaseDate.match(datePattern) === null) {
        $("#movie-release-date").after('<p class="movie-form__input-group__error-message">Invalid date.</p>')
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

    renderMoviesComponent();
    closeModal();
    openMovieDetailsModal(movie);
};

const getMovieFormData = (form) => {
    const title = form.elements["movie-title"].value;
    const description = form.elements["movie-description"].value;
    const releaseDate = form.elements["movie-release-date"].value;
    const genres = $(form).find(".movie-form__input-group__input--checkbox");
    const poster = form.elements["movie-poster"].value;

    const selectedGenres = [];
    // Loops through all genre checkboxes and adds the selected genres to the array.
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
