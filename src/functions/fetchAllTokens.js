import axios from "axios"

export default async function fetchAllTokens() {
    let tokens = await axios.get('https://api.coingecko.com/api/v3/coins/list', { 
        headers: { "Accept-Encoding": "gzip,deflate,compress" } 
    })
    console.log('fetched');
    let accumulator = []
    tokens.data.forEach(token => accumulator.push(token.id))
    return accumulator
}
