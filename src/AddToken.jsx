import React, { useState, useRef } from 'react'
import postDataBase from "./api/postDataBase";

export default function AddToken() {
    let token = useRef()
    let ticker = useRef()
    let amount = useRef()

    function handleSubmit(form) {
        form.preventDefault()
        let tokenData = token.current.value
        let tickerData = ticker.current.value
        let amountData = amount.current.value

        let tokenToDatabase = {
            token: tokenData,
            ticker: tickerData,
            amount: amountData
        }

        postDataBase(tokenToDatabase)
        return window.location.reload();
    }
    
    return (
        <div className='newToken'>
            <h2 className='total'>New Token:</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="text">Token Name</label>
                <input type="text" ref={token} />
                <h5>note: if the value doesnt appear, this input might not be compatible to coingecko</h5>
                <br />
                <label htmlFor="text">Token Ticker</label>
                <input type="text" ref={ticker} />
                <br />
                <label htmlFor="text" >amount</label>
                <input type="number" ref={amount} />
                <br />
                <button>Add Token</button>
                <button className='cancel'>X</button>
            </form>
        </div>
    )
}
