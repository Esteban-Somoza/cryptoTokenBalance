import { useState, useEffect } from 'react'
import './App.css'
import TokenBalance from './TokenBalance'
import tokenHoldings from '../database/readTokenHoldings.js'
import coingeckoApiCall from './api/coingecko'

function App() {
  const [tokens, setTokens] = useState([])
  const [totalValue, setTotalValue] = useState(0)

  useEffect(() => {
    async function apiCall() {
      let data = await coingeckoApiCall(tokenHoldings)
      let totalValue = data.map(token => Number(token.value)).reduce((acc, token) => acc + token, 0)
      setTotalValue(totalValue.toFixed(2))
      return setTokens(data);
    }
    apiCall()
  }, [])

  // console.log(tokens);

  return (
    <div className="App">
      <h1 className='title'>Token holdings:</h1>
      <div className='totalValue'>
        <h2 className='total'>Total value held:</h2>
        {
          totalValue && <h3>${totalValue}</h3>
        }
      </div>
      <div className='body'>
        <div className='information'>
          {tokens && tokens.map((token, i) => <TokenBalance key={i} token={token.ticker} value={token.value} price={token.usd} />)}
        </div>
      </div>
    </div>
  )
}

export default App