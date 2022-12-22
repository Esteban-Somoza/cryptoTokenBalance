import React, { useRef, useContext } from 'react'
import { tokenDataContext } from "./context/TokenEditData";
import postDataBase from "./api/postDataBase";
import editDataBase from "./api/editDataBase";
import './form.css'

import clearForm from "./functions/clearForm";

export default function TokenForm({ visibility, changeVisibility, isNewToken }) {
    const { tokenData, setTokenData } = useContext(tokenDataContext)
    let classes = `${visibility} tokenForm`
    
    function cancel(e) {
        e.preventDefault();
        changeVisibility()
        setTokenData({})
        return clearForm();
    }

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

        isNewToken ? postDataBase(tokenToDatabase) : editDataBase(tokenToDatabase)
        return window.location.reload();
    }

    return (
        <div className={classes}>
            <form onSubmit={handleSubmit} id='form'>
                <h2 className='total'>{isNewToken ? 'Add Token:' : 'Edit Token:'}</h2>
                <label htmlFor="text">Token Name</label>
                <br />
                <input type="text" ref={token} defaultValue={isNewToken ? undefined : tokenData.token}/>
                <h5>note: if the value doesnt appear, this input might not be compatible to coingecko</h5>
                <br />
                <label htmlFor="text">Token Ticker</label>
                <br />
                <input type="text" ref={ticker} defaultValue={isNewToken ? undefined : tokenData.ticker}/>
                <br />
                <label htmlFor="text" >amount</label>
                <br />
                <input type="number" ref={amount} defaultValue={isNewToken ? undefined : tokenData.amount}/>
                <br />
                <button>{isNewToken ? 'New Token' : 'Edit Token'}</button>
                <button className='cancel' onClick={cancel}>X</button>
            </form>
        </div>
    )
}
