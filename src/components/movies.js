import "../css/movies/movies.css";
import moviesData from "../data/movies.json";


export const renderMoviesComponent = () => {
    const movies = moviesData.movies;
    $.each(movies, (index, movie) => {
        $("ul.movies-list").append(`
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
    </li>
        `);
    });
};