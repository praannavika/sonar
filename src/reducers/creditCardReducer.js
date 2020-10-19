import { FETCH_CREDIT_CARDS, FETCH_TRANSACTIONS } from "../actions/actionTypes.js"

var initialState = {
    creditCards : [],
    currPage : 0
}

export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_TRANSACTIONS:
            {
                return { ...state, transactions: action.transactions, currPage: action.currPage }
            }

        case FETCH_CREDIT_CARDS:
            {
                return { ...state, creditCards: action.creditCards, currPage: action.currPage }
            }

        default:
            return state
    }
}