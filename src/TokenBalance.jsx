import React, { useState, useEffect } from 'react'
import apiCall from './api/coingecko.js'

export default function TokenBalance(props) {
    const [price, setPrice] = useState(0)

    // console.log(props);

    return (
        <div className='token'>
            <h3 className='ticker'>{props.token}:</h3>
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
                <h4>${props.price.toFixed(2)}</h4>
            </div>
        </div>
    )
}
