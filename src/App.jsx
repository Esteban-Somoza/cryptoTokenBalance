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
  const [timeStamp, setTimeStamp] = useState('')

  function refresh() {
    window.location.reload();
  }

  useEffect(() => {
    async function apiCall() {
      let timeStamp = new Date().toLocaleTimeString();
      setTimeStamp(timeStamp);

      let data = await coingeckoApiCall(tokenHoldings);
      let orderedData = sortByValue(data);
      
      let totalValue = data.map(token => Number(token.value)).reduce((acc, token) => acc + token, 0);
      setTotalValue(totalValue.toFixed(2));

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
        <h5> última actualización: </h5>
        <h5 className='timestamp'>{timeStamp && timeStamp}</h5>
      </div>
      <div className='body'>
        <div className='information'>
          {tokens && tokens.map((token, i) => 
          <TokenBalance key={i} token={token.ticker} value={token.value} price={token.usd} totalValue={totalValue} />)}
        </div>
      </div>
      {/* <button><FontAwesomeIcon icon="fa-solid fa-rotate-right" /></button> */}
      <button className='refresh' onClick={refresh}>
        <FontAwesomeIcon icon={faRotateRight} className="icon" />
        </button>
    </div>
  )
}

export default App
