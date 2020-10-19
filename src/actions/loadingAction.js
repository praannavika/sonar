import { LOADING } from "./actionTypes"

export const setLoading = (isLoading) => {
    return {
        type: LOADING,
        isLoading
    }
}