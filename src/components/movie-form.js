import { closeModal, createModal } from "./utility/modal";
import "../css/movies/movie-form.css";
import { movies, renderMoviesComponent, openMovieDetailsModal } from "./movies";
export const createMovieFormElement = () => {};

export const openEditFormModal = (movie) => {
    const editFormContainer = createFormElement(movie);
    $(editFormContainer).prepend("<h1 class='movie-form__container__heading'>Edit Movie</h1>");

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
                    <label class="movie-form__input-group__label" for="movie-year">Year</label>
                    <input class="movie-form__input-group__input" type="text" id="movie-year" name="movie-year" value="${movieData ? movieData.year : ""}"/>
                </div>
                <div>
                    <label class="movie-form__input-group__label" for="movie-year">Genre</label>
                    <div class="movie-form__input-group__genres">
                        <label class="movie-form__input-group__genre" for="movie-genre--action">
                            <input 
                                class="movie-form__input-group__input--checkbox" 
                                ${movieData.genre.includes("ACTION") ? 'checked' : ''} 
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
                                ${movieData.genre.includes("ADVENTURE") ? 'checked' : ''} 
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
                                ${movieData.genre.includes("ANIMATION") ? 'checked' : ''} 
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
                                ${movieData.genre.includes("COMEDY") ? 'checked' : ''} 
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
                                ${movieData.genre.includes("CRIME") ? 'checked' : ''} 
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
                                ${movieData.genre.includes("DRAMA") ? 'checked' : ''} 
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
                                ${movieData.genre.includes("FANTASY") ? 'checked' : ''} 
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
                                ${movieData.genre.includes("HORROR") ? 'checked' : ''} 
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
                                ${movieData.genre.includes("SCI-FI") ? 'checked' : ''} 
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
                    <button class="movie-form__buttons__btn-save">Save</button>
                    <button type="button" class="movie-form__buttons__btn-cancel">Cancel</button>
                    
                <div>

            </form>
    </div>
    `)[0];
};

const validateForm = (form) => {
    // Add form validation...
    return true;
};

const editFormSubmitHandler = (event, movieId) => {
    event.preventDefault();

    const form = event.target;
    const title = form.elements["movie-title"].value;
    const description = form.elements["movie-description"].value;
    const year = form.elements["movie-year"].value;
    const genres = $(form).find(".movie-form__input-group__input--checkbox");

    const selectedGenres = [];
    // Loops through all genre checkboxes and adds the selected genres to the array.
    for(let genre of genres) {
        if(genre.checked === true) {
            selectedGenres.push(genre.dataset.value);
        }
    }

    const poster = form.elements["movie-poster"].value;
    const movie = movies.find((movie) => (movie.id === movieId));
    const formIsValid = validateForm();

    if (!formIsValid) {
    }
    movie.title = title;
    movie.description = description;
    movie.year = year;
    movie.genre = selectedGenres;
    movie.poster = poster;

    renderMoviesComponent();
    closeModal();
    openMovieDetailsModal(movie);
};
