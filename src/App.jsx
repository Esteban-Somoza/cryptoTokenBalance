import { useState, useEffect } from 'react'
import './App.css'
import TokenBalance from './TokenBalance'
import tokenHoldings from '../database/readTokenHoldings.js'
import coingeckoApiCall from './api/coingecko'
import sortByValue from './functions/sortByValue';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRotateRight } from '@fortawesome/free-solid-svg-icons'


function App() {
  const [tokens, setTokens] = useState([])
  const [totalValue, setTotalValue] = useState(0)
  const [seconds, setSeconds] = useState(0)

  function refresh() {
    window.location.reload();
  }

  setTimeout(() => {
    refresh()
  }, 9000);

  setTimeout(() => {
      let secs = seconds + 1
      return setSeconds(secs)
  }, 1000);

  
  useEffect(() => {
    async function apiCall() {
      let data = await coingeckoApiCall(tokenHoldings);
      let orderedData = sortByValue(data);
      
      let totalValue = data.map(token => Number(token.value)).reduce((acc, token) => acc + token, 0);
      setTotalValue(totalValue.toFixed(2));
      
      console.log(orderedData);
      return setTokens(orderedData);
    }
    apiCall()
  }, [])


  return (
    <div className="App">
      <h1 className='title'>Token holdings:</h1>
      <div className='totalValue'>
        <h2 className='total'>Total value held:</h2>
        {
          totalValue && <h3>${totalValue}</h3>
        }
        <br />
        <h5> last update: </h5>
        <h5 className='timestamp'>
          {seconds != 0 && seconds == 1 ? `${seconds} second ago` : `${seconds} seconds ago`}
        </h5>
      </div>
      <div className='body'>
        <div className='information'>
          {tokens && tokens.map((token, i) => 
          <TokenBalance key={i} token={token.ticker} value={token.value} price={token.usd} totalValue={totalValue} />)}
        </div>
      </div>
      <button className='refresh' onClick={refresh}>
        <FontAwesomeIcon icon={faRotateRight} className="icon" />
        </button>
    </div>
  )
}

export default App
