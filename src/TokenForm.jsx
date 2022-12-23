import React, { useContext, useEffect, useState } from 'react'
import { useForm } from "react-hook-form";
import { tokenDataContext } from "./context/TokenEditData";
import postDataBase from "./api/postDataBase";
import editDataBase from "./api/editDataBase";
import fetchAllTokens from "./functions/fetchAllTokens";
import validateTokenOnApi from "./validations/validateTokenOnApi";
import validateTokenOnDatabase from "./validations/validateTokenOnDatabase";

import './form.css'

import clearForm from "./functions/clearForm";

export default function TokenForm({ visibility, changeVisibility, isNewToken, tokenDatabase}) {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const { tokenData, setTokenData } = useContext(tokenDataContext)
    const [tokenList, setTokenList] = useState([])

    let classes = `${visibility} tokenForm`

    useEffect(() => {
        let getAllTokens = async () => {
            let result = await fetchAllTokens()
            console.log(result.length);
            return setTokenList(result)
        }
        getAllTokens()
    }, [])

    function cancel(e) {
        e.preventDefault();
        changeVisibility()
        setTokenData({})
        return clearForm();
    }

    function submit(data) {
        isNewToken ? postDataBase(data) : editDataBase(data)
        return window.location.reload();
    }


    return (
        <div className={classes}>
            <form onSubmit={handleSubmit(submit)} id='form'>
                <h2 className='total'>{isNewToken ? 'Add Token:' : 'Edit Token:'}</h2>
                <label htmlFor="text">Token Name</label>
                <br />

                <input type="text" defaultValue={isNewToken ? undefined : tokenData.token}
                    {...register("token", {
                        required: true,
                        validate: {
                            api: value => validateTokenOnApi(value, tokenList),
                            database: value => validateTokenOnDatabase(value, tokenDatabase)
                        }
                    })}
                    aria-invalid={errors.token ? "true" : "false"}
                    placeholder='ethereum' />

                {errors.token?.type === 'required' && <p role="alert">Token name is required. (Ej: 'bitcoin')</p>}
                {errors.token?.type === 'api' && <p role="alert">This token name doesn't match with Coingecko's API</p>}
                {errors.token?.type === 'database' && <p role="alert">You already added this token</p>}
                <br />

                <label htmlFor="text">Token Ticker</label>
                <br />

                <input type="text" defaultValue={isNewToken ? undefined : tokenData.ticker}
                    {...register("ticker", { required: true })}
                    aria-invalid={errors.ticker ? "true" : "false"}
                    placeholder='ETH' />

                {errors.ticker?.type === 'required' && <p role="alert">Token ticker required. (Ej: 'BTC')</p>}

                <br />
                <label htmlFor="text" >amount</label>

                <br />
                <input type="number" defaultValue={isNewToken ? undefined : tokenData.amount}
                    {...register("amount", {
                        required: true, validate: {
                            positiveNumber: value => {
                                return parseFloat(value) >= 0;
                            }
                        }
                    })}
                    aria-invalid={errors.amount ? "true" : "false"}
                    placeholder='0.5' />

                {errors.amount?.type === 'required' && <p role="alert">Amount is required</p>}
                {errors.amount?.type === 'positiveNumber' && <p role="alert">Must be positive number</p>}

                <br />

                <button type='submit'>{isNewToken ? 'New Token' : 'Edit Token'}</button>
                <button className='cancel' onClick={cancel}>X</button>
            </form>
        </div>
    )
}
