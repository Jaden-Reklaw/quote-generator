//Get Quote From API
async function getQuote() {
    //How to get rid of cors errors
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';

    try{
        const reponse = await fetch(proxyUrl + apiUrl);
        const data = reponse.json();
        console.log(data);
    } catch(error) {
        getQuote();
        console.log('whoops, no quote', error);
    }
}

//On Load function call
getQuote();