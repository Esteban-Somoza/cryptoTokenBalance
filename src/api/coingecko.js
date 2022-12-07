import axios from "axios"

let call = async (id) => {
    let price = await axios.get (`https://api.coingecko.com/api/v3/simple/price?ids=${id}&vs_currencies=usd`)
    console.log(price.data);
    return price.data
}


export default call