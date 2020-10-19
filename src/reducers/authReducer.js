import { OPEN_LOGIN_PAGE, OPEN_REGISTRATION_PAGE, REGISTER_CUSTOMER } from "../actions/actionTypes";

var initialState = {
    currPage: 0,
    activeLink: 0
}

export default function(state = initialState, action){
    switch(action.type){

        case OPEN_REGISTRATION_PAGE:
            return{
                ...state, 
                currPage: action.currPage,
                activeLink: 1
            }

        case OPEN_LOGIN_PAGE:
            return{
                ...state, 
                currPage: action.currPage,
                activeLink: 2
            }

        case REGISTER_CUSTOMER:
            break;

        default:
            return state;
    }
}