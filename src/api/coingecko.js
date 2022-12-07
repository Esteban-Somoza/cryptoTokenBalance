import axios from "axios"

let call = async (data) => {
    let dataForApiCall = data.map(token => token.token).toString()
    let price = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${dataForApiCall}&vs_currencies=usd`)
    let response = price.data
    let tokensData = data.map(token => ({ ...token, usd: response[token.token].usd, value: (response[token.token].usd * token.amount ).toFixed(2) }))
    return tokensData
}


export default call