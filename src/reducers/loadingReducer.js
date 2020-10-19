import { LOADING } from "../actions/actionTypes";

var initialState = {
    loading: false
}

export default function (state = initialState, action) {
    switch (action.type) {
        case LOADING:
            return { ...state, loading: action.isLoading }

        default:
            return state;
    }
}