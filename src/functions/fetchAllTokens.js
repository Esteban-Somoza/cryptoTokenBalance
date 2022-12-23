import axios from "axios"

export default async function fetchAllTokens() {
    let tokens = await axios.get('https://api.coingecko.com/api/v3/coins/list', { 
        headers: { "Accept-Encoding": "gzip,deflate,compress" } 
    })
    console.log('fetched');
    let accumulator = []
    tokens.data.forEach(token => accumulator.push(token.id))
    return accumulator
    // if (Object.keys(price.data).length === 0) return false;
    // else return true
}

// could get a full list of tokens and compare to that instead of calling the api every time