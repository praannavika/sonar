import { FETCH_CREDIT_CARDS, FETCH_TRANSACTIONS } from "./actionTypes.js"
import { AUTH_TOKEN } from "../constants/params.js";
import { baseUrl, customer, creditcards, expenses, } from "../constants/endpoints.js";
import { fetchApi } from "../utils/services/fetchApi.js";

export const fetchTransactions = (creditCardNumber) => async (dispatch) => {
    let jwt = localStorage.getItem(AUTH_TOKEN)
    let resp = await fetch(`${baseUrl}${customer}${creditcards}${expenses}` + '?creditCardNumber=' + creditCardNumber, {
        headers: {
            'Authorization': 'Bearer ' + jwt
        }
    })
    let transactions = await resp.json()
    let currPage = 1
    dispatch({ type: FETCH_TRANSACTIONS, transactions, currPage })
}

export const fetchCreditCards = () => {
    return async (dispatch) => {
        let currPage = 0
        fetchApi(`${baseUrl}${customer}${creditcards}`, "GET", null)((err, res) => {
            dispatch({
                type: FETCH_CREDIT_CARDS,
                creditCards: err.data,
                currPage
            })
        })

    }
}