import React, { useState, useEffect } from 'react'
import apiCall from './api/coingecko.js'

export default function TokenBalance(props) {
    const [price, setPrice] = useState(0)
    
    // console.log(props);

    return (
        <div className='token'>
            <h3 className='ticker'>{props.token}:</h3>
            <div className='price'>
                <h4>Token Price:</h4>
                <h4>${props.price}</h4>
            </div>
            <div className='value'>
                <h4>Value held:</h4>
                <h4>${props.value}</h4>
            </div>
        </div>
    )
}
