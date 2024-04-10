import "./css/main.css";
import { renderQuoteComponent } from "./components/quote";
import { renderMoviesComponent } from "./components/movies";

$(document).ready(() => {
    renderQuoteComponent();
    renderMoviesComponent();
});
