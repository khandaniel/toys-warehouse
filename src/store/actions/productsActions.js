import {requestApi} from "../../services/networkProvider";

export const getProducts = (token) => (dispatch) => {
    requestApi('toys', null, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then((data) => {
        dispatch({
            type: 'PRODUCTS_RECEIVED',
            products: data.toys
        })
    })
}