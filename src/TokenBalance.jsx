import React, { useState, useContext, useRef } from 'react'
import { tokenDataContext } from "./context/TokenEditData";

export default function TokenBalance(props) {
    const { tokenData, setTokenData } = useContext(tokenDataContext)

    function editToken(form) {
        form.preventDefault()
        console.log(props);
        // console.log(props.token);
        return setTokenData(props)
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
                <h4 className='value'>{(props.value / props.totalValue).toFixed(2)}%</h4>
            </div>
            <div className='data'>
                <h5>Token Price:</h5>
                <h4>${props.price.toFixed(3)}</h4>
            </div>
            <button onClick={editToken}>Edit Token</button>
        </div>
    )
}