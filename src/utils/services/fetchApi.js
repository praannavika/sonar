import axios from "axios"
import { AUTH_TOKEN } from "../../constants/params"


export const fetchApi = (url, method, body) => async callback => {
    let jwt = localStorage.getItem(AUTH_TOKEN)
    await axios({
        method,
        url,
        data: body,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + jwt
        }
    }).then((response) => {
        return callback(null, response)
    }).catch((err) => {
        return callback(err.response)
    })
}