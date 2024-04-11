import "./css/global.css";
import { renderQuoteComponent } from "./components/quote";
import { renderMoviesComponent } from "./components/movies";

$(document).ready(() => {
    renderQuoteComponent();
    renderMoviesComponent();
});
