export default function validateTokenOnApi(token, tokenList) {
    let accumulator = []
    tokenList.forEach(token => accumulator.push(token.token))
    console.log('database: ', accumulator.includes(token));
    if (accumulator.includes(token)) return false;
    return true;
}