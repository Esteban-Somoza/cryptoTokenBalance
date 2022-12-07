import React, { useState, useEffect } from 'react'
import apiCall from './api/coingecko.js'

export default function TokenBalance(props) {
    const [price, setPrice] = useState(0)
    
    console.log(props);

    useEffect(() => {
        async function fetchData() {
            console.log('bla' + props.id);
            let tokenValue = await apiCall(props.id)
            // console.log(tokenValue);
            return setPrice(tokenValue)
        }
        fetchData();
    }, [price]);

    return (
        <div className='token'>
            <h3 className='tok'>{props.id}:</h3>
            <div className='a'>
                <h4>price:</h4>
                <h4>{price}</h4>
            </div>
        </div>
    )
}
