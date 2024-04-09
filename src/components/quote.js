import { getQuote } from "../api/quote";
import "../css/quote/quote.css";

export const renderQuoteComponent = async () => {
    //Display loading spinner;
    $(".quote-container").html(
        `<svg width="24" height="24" stroke="#FFF" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><style>.spinner_V8m1{transform-origin:center;animation:spinner_zKoa 2s linear infinite}.spinner_V8m1 circle{stroke-linecap:round;animation:spinner_YpZS 1.5s ease-in-out infinite}@keyframes spinner_zKoa{100%{transform:rotate(360deg)}}@keyframes spinner_YpZS{0%{stroke-dasharray:0 150;stroke-dashoffset:0}47.5%{stroke-dasharray:42 150;stroke-dashoffset:-16}95%,100%{stroke-dasharray:42 150;stroke-dashoffset:-59}}</style><g class="spinner_V8m1"><circle cx="12" cy="12" r="9.5" fill="none" stroke-width="3"></circle></g></svg>`
    );
    try {
        const quote = await getQuote(); 
        $(".quote-container").html(
            `   <h2 class="quote-container__label">Today's Movie Quote</h2>
                <p class="quote-container__quote">${quote.text}</p>
                <p class="quote-container__author">${quote.movie}</p>
            `
        );
    } catch (error) {
        $(".quote-container").html(
            `
                <p class="quote-container__error-message">Oops! An error occured while fetching the quote.</p>
            `
        );
    }
};
