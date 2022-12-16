import React, { useState, useEffect, useRef } from 'react'

import apiCall from './api/coingecko.js'

export default function TokenBalance(props) {
    const [price, setPrice] = useState(0)

    function editToken(btn) {
        btn.preventDefault()
        console.log(props.token);
        // form.preventDefault()
        // console.log(form);
        // console.log(form.target.form.firstChild.firstChild.innerHTML.slice(0, -1));
        // let token = edit.target.firstChild.firstChild.innerHTML.slice(0, -1);
        // let tokenToEdit = findToken(tokenHoldings, token)
        // setNewToken(false)
        // return setTokenData(tokenToEdit)
      }
    // console.log(props);
    return (
        <div className='token'>
            <h3 className='ticker'>{props.ticker}:</h3>
            <div className='data'>
                <h5>Value held:</h5>
                <h4 className='value'>${props.value}</h4>
            </div>
            <div className='data'>
                <h5>Portion of portfolio:</h5>
                <h4 className='value'>{(props.value/props.totalValue).toFixed(2)}%</h4>
            </div>
            <div className='data'>
                <h5>Token Price:</h5>
                <h4>${props.price.toFixed(3)}</h4>
            </div>
            <button onClick={editToken}>Edit Token</button>
        </div>
    )
}