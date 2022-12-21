import { useContext, useState, useEffect, useRef} from 'react'
import { tokenDataContext } from "./context/TokenEditData";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRotateRight } from '@fortawesome/free-solid-svg-icons'

import './App.css'

import TokenBalance from './TokenBalance'
import AddToken from './AddToken'
import EditToken from './EditToken'
import getDataBase from "./api/getDataBase";
import coingeckoApiCall from './api/coingecko'
import sortByValue from './functions/sortByValue';


function refresh() {
  window.location.reload();
}

function App() {
  const { tokenData, setTokenData } = useContext(tokenDataContext)
  const [isVisible, setIsVisible] = useState(false)
  const [tokens, setTokens] = useState([])
  const [loading, setLoading] = useState(true)
  const [totalValue, setTotalValue] = useState(0)
  const [seconds, setSeconds] = useState(0)
  
  setTimeout(() => {
    refresh()
  }, 120000);
  
  setTimeout(() => {
    let secs = seconds + 1
    return setSeconds(secs)
  }, 1000);
  
  function changeVisibility (){
    return setIsVisible(!isVisible)
  }

  useEffect(() => {
    async function apiCall() {
      let dataBase = await getDataBase()
      let data = await coingeckoApiCall(dataBase.data.db);
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
    <div className="App" >
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
                return <form key={i} >
                  <TokenBalance token={token.token} ticker={token.ticker} value={token.value} price={token.usd} totalValue={totalValue} amount={token.amount}/>
                </form>
              })
              }
              <button onClick={changeVisibility}>Add Token</button>
            </div>
          </div>
          <button className='refresh' onClick={refresh}>
            <FontAwesomeIcon icon={faRotateRight} className="icon" />
          </button>
        </div>
      }
      <AddToken visibility={isVisible} changeVisibility={changeVisibility} />
      { tokenData && <EditToken/>}
    </div>
  )
}

export default App
