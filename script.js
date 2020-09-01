//Select IDs from the DOM
const quoteContainer = document.getElementById('quote-container');
//Text or HTML content
const quoteText = document.getElementById('quote');
const author = document.getElementById('author');
//Buttons
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
//Loader
const loader = document.getElementById('loader');

//Show loading
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

//Hide loading
function complete() {
    if(!loader.hidden) {
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}

//Get Quote From API
async function getQuote() {
    //Show loader while getting quote
    loading();

    //How to get rid of cors errors
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';

    try{
        //Uses fetch api to cors proxy server and api for random quote
        const reponse = await fetch(proxyUrl + apiUrl);
        const data = await reponse.json();

        //If no author then add unknown
        if(data.quoteAuthor === '') {
            author.innerText = 'Unknown'; 
        } else {
            author.innerText = data.quoteAuthor;
        }
        
        // Reduce font size for long quotes
        if(data.quoteText.length > 50) {
            quoteText.classList.add('long-quote');
        } else {
            quoteText.classList.remove('long-quote');
        }
        quoteText.innerText = data.quoteText;
        
        //Stop loader once quote is completed
        complete();
    } catch(error) {
        getQuote();
        console.log('whoops, no quote', error);
    }
}

//Twitter function for sending a quote to twitter
function tweetQuote() {
    const quote = quoteText.innerText;
    const authorText = author.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${authorText}`;
    //Open up a new window
    window.open(twitterUrl, '_blank');
}

//Add Event Listeners
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);

//On Load function call
getQuote();