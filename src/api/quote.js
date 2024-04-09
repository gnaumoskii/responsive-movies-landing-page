const URL = "https://raw.githubusercontent.com/vilaboim/movie-quotes/master/movie-quotes.json";

export const getQuote = async () => {
    const response = await fetch(URL);
    const data = await response.json();
    
    // Transform the data to an array of type [{text: string, movie: string}, ...]
    const quotes = data.map((dataQuote) => {
        return { text: dataQuote.split('" ')[0], movie: dataQuote.split('" ')[1] };
    });
    // Selects random quote from the whole quotes list.
    const randomQuote = quotes[Math.floor(Math.random() * data.length)];
    return randomQuote;
};
