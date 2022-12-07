import { useState, useEffect } from 'react'
import './App.css'
import TokenBalance from './TokenBalance'
import tokenHoldings from '../database/readTokenHoldings.js'
import coingeckoApiCall from './api/coingecko'

function App() {
  const [tokens, setTokens] = useState([])

  useEffect(() => {
    async function apiCall() {
      console.log(tokenHoldings);
      let tokenDataResponse = tokenHoldings
      let dataForApi = tokenDataResponse.map(token => token.token).toString()
      let data = await coingeckoApiCall(dataForApi)
      console.log(tokenDataResponse, data);

      let tokensData = tokenDataResponse.map(token => ({...token, usd: data[token.token].usd }))   
      
      console.log(tokensData);
    }
    apiCall()
  }, [tokens])


  return (
    <div className="App">
      <h2>Token holdings:</h2>
      {
        tokens && tokens.map((token, i) => <TokenBalance key={i} token={token.token} />
        )
      }
    </div>
  )
}

export default App
