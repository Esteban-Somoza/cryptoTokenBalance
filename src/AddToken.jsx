import React, { useState, useRef } from 'react'
import tokenHoldings from '../database/readTokenHoldings.js'
// import editDatabase from './functions/editDatabase';


export default function AddToken({ newT, data }) {
    let token = useRef()
    let ticker = useRef()
    let amount = useRef()

    function handleSubmit(form) {
        form.preventDefault()
        let database = tokenHoldings

        // console.log(newT);
        // console.log(database);

        let tokenToDatabase = {
            token: token.current.value,
            ticker: ticker.current.value,
            amount: amount.current.value
        }
        
        if( newT === false){
            console.log(tokenToDatabase);
            database.push(tokenToDatabase)
        }

        // return editDatabase(database)
    }
    // console.log(props.data.token);
    return (
        <div className='newToken'>
            <h2 className='total'>New Token:</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="text">Token Name</label>
                <input type="text" value={data.token == undefined ? undefined : data.token} ref={token} />
                <h5>note: if the value doesnt appear, this input might not be compatible to coingecko</h5>
                <br />
                <label htmlFor="text">Token Ticker</label>
                <input type="text" value={data.ticker == undefined ? undefined : data.ticker} ref={ticker} />
                <br />
                <label htmlFor="text" >amount</label>
                <input type="number" value={data.amount == undefined ? 0 : data.amount} ref={amount} />
                <br />
                <button>Add Token</button>
            </form>
        </div>
    )
}
