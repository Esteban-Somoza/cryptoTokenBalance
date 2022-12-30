export default function validateTokenOnApi(token, tokenList) {
    console.log('api: ', tokenList.includes(token));
    if (tokenList.includes(token)) return true;
    return false;
}