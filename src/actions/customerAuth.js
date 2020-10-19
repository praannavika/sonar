import { OPEN_LOGIN_PAGE, OPEN_REGISTRATION_PAGE, REGISTER_CUSTOMER } from "./actionTypes";

export const goToRegistration = () => {
    return (dispatch) => {
        let currPage = 1;
        dispatch({
            type: OPEN_REGISTRATION_PAGE,
            currPage
        })
    }
}

export const goToLogin = () => {
    return (dispatch) => {
        let currPage = 2;
        dispatch({
            type: OPEN_LOGIN_PAGE,
            currPage
        })
    }
}


export const registerUser = () => {

    return async (dispatch) => {
        let message = "Registration form"
        dispatch({
            type: REGISTER_CUSTOMER,
            message
        })

    }
}