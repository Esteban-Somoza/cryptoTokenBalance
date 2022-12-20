import React, { useContext, useState, useRef } from 'react'
import { tokenDataContext } from "./context/TokenEditData";
import editDataBase from "./api/editDataBase";

export default function EditToken() {
    const { tokenData, setTokenData } = useContext(tokenDataContext)
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

        editDataBase(tokenToDatabase)
        return window.location.reload();
    }

    return (
        <div className='newToken'>
            <h2 className='total'>New Token:</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="text">Token Name</label>
                <input type="text" value={tokenData.token == undefined ? undefined : tokenData.token} ref={token} />
                <h5>note: if the value doesnt appear, this input might not be compatible to coingecko</h5>
                <br />
                <label htmlFor="text">Token Ticker</label>
                <input type="text" value={tokenData.ticker == undefined ? undefined : tokenData.ticker} ref={ticker} />
                <br />
                <label htmlFor="text" >amount</label>
                <input type="number" value={tokenData.amount == undefined ? undefined : tokenData.amount} ref={amount} />
                <br />
                <button>Edit Token</button>
            </form>
        </div>
    )
}
