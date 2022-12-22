import React, { useState, useContext, useRef } from 'react'
import { tokenDataContext } from "./context/TokenEditData";
import refresh from "./functions/refresh";

import deleteToken from "./api/deleteDataBase";

import './tokenBalance.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faEraser } from '@fortawesome/free-solid-svg-icons'

export default function TokenBalance(props) {
    const { tokenData, setTokenData } = useContext(tokenDataContext)

    function editToken(form) {
        form.preventDefault()
        props.editToken()
        return setTokenData(props)
    }

    function deleteTokenConfirm(form) {
        form.preventDefault()
        let confirmDelete = confirm('Are you sure you want to delete this token?')
        if (confirmDelete) {
            deleteToken({token: props.token})
            return refresh(); 
        }
        else return
    }

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
                <h5>Amount:</h5>
                <h4 className='value'>{props.amount}</h4>
            </div>
            <div className='data'>
                <h5>Token Price:</h5>
                <h4>${props.price.toFixed(3)}</h4>
            </div>
            {/* <button onClick={editToken}>Edit Token</button> */}
            <FontAwesomeIcon icon={faPen} className="tokenMenu" />
            <div>
                <button onClick={editToken}><FontAwesomeIcon icon={faPen} className="tokenMenu" /></button>
                <button onClick={deleteTokenConfirm}><FontAwesomeIcon icon={faEraser} className="tokenMenu" /></button>
            </div>
        </div>
    )
}