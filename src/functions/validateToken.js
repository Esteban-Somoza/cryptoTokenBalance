import axios from "axios"

export default async function validateToken(token) {
    let price = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${token}&vs_currencies=usd`)
    if (Object.keys(price.data).length === 0) return false;
    else return true
}

// could get a full list of tokens and compare to that instead of calling the api every time