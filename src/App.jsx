import { useState, useEffect } from 'react'
import './App.css'
import TokenBalance from './TokenBalance'
import AddToken from './AddToken'
import tokenHoldings from '../database/readTokenHoldings.js'
import coingeckoApiCall from './api/coingecko'
import sortByValue from './functions/sortByValue';
import findToken from "../database/findToken";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRotateRight } from '@fortawesome/free-solid-svg-icons'


function App() {
  const [tokens, setTokens] = useState([])
  const [loading, setLoading] = useState(true)
  const [totalValue, setTotalValue] = useState(0)
  const [seconds, setSeconds] = useState(0)
  const [newToken, setNewToken] = useState(true)
  const [tokenData, setTokenData] = useState({})

  function refresh() {
    window.location.reload();
  }

  // function addToken(tok) {
  //   // tok.preventDefault()
  //   // let token = tok.target.firstChild.firstChild.innerHTML.slice(0, -1);
  // }

  // function editToken(edit) {
  //   edit.preventDefault()
  //   let token = edit.target.firstChild.firstChild.innerHTML.slice(0, -1);
  //   let tokenToEdit = findToken(tokenHoldings, token)
  //   setNewToken(false)
  //   return setTokenData(tokenToEdit)
  // }

  setTimeout(() => {
    refresh()
  }, 60000);

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
      
      setTimeout(() => {
        setLoading(false)
      }, 1000);

      return setTokens(orderedData);
    }
    apiCall()
  }, [])


  return (
    <div className="App">
      {loading ? <div className='loading'><FontAwesomeIcon icon={faRotateRight} className="load" /></div> :
        <div className='mainBody'>
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
              {tokens && tokens.map((token, i) => {
                // return <form key={i} onSubmit={editToken}>
                return <form key={i} >
                  <TokenBalance token={token.ticker} value={token.value} price={token.usd} totalValue={totalValue} />
                  {/* <button>edit</button> */}
                </form>
              })
              }
            </div>
          </div>
          <button className='refresh' onClick={refresh}>
            <FontAwesomeIcon icon={faRotateRight} className="icon" />
          </button>
        </div>
      }
      {/* <AddToken newT={newToken} data={tokenData} /> */}
      {/* needs to adapt to new or false */}
    </div>
  )
}

export default App
