import React, { useRef, useContext } from 'react'
import { useForm } from "react-hook-form";
import { tokenDataContext } from "./context/TokenEditData";
import postDataBase from "./api/postDataBase";
import editDataBase from "./api/editDataBase";
import './form.css'

import clearForm from "./functions/clearForm";

export default function TokenForm({ visibility, changeVisibility, isNewToken }) {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const { tokenData, setTokenData } = useContext(tokenDataContext)
    let classes = `${visibility} tokenForm`

    function cancel(e) {
        e.preventDefault();
        changeVisibility()
        setTokenData({})
        return clearForm();
    }

    let test = function(a){
        if (a == 'hi') return false
        else return true
    }

    const onSubmit = (data) => console.log(data);
    
    let token = useRef()
    let ticker = useRef()
    let amount = useRef()

    function submit(form) {
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
            <form onSubmit={handleSubmit(onSubmit)} id='form'>
                <h2 className='total'>{isNewToken ? 'Add Token:' : 'Edit Token:'}</h2>
                <label htmlFor="text">Token Name</label>
                {/* <input 
        {...register("firstName", { required: true })} 
        aria-invalid={errors.firstName ? "true" : "false"} 
      /> */}
                <br />
                <input type="text" ref={token} defaultValue={isNewToken ? undefined : tokenData.token} 
                {...register("token", { required: true, validate: value => test(value)})}
                aria-invalid={errors.token ? "true" : "false"}
                placeholder='ethereum'/>
                
                {errors.token?.type === 'required' && <p role="alert">Token name is required. (Ej: 'bitcoin')</p>}
                {errors.token?.type === 'validate' && <p role="alert">This token name might not be compatible with Coingecko</p>}
                {/* <h5>note: if the value doesnt appear, this input might not be compatible to coingecko</h5> */}
                <br />

                <label htmlFor="text">Token Ticker</label>
                <br />
                <input type="text" ref={ticker} defaultValue={isNewToken ? undefined : tokenData.ticker} 
                {...register("ticker", { required: true})}
                aria-invalid={errors.ticker ? "true" : "false"}
                placeholder='ETH'/>

                {errors.ticker?.type === 'required' && <p role="alert">Token ticker required. (Ej: 'BTC')</p>}

                <br />
                <label htmlFor="text" >amount</label>
                <br />
                <input type="number" ref={amount} defaultValue={isNewToken ? undefined : tokenData.amount} 
                {...register("amount", { required: true})}
                aria-invalid={errors.amount ? "true" : "false"}
                placeholder='0.5'/>
                <br />
                <button type='submit'>{isNewToken ? 'New Token' : 'Edit Token'}</button>
                <button className='cancel' onClick={cancel}>X</button>
            </form>
        </div>
    )
}
