import * as actionTypes from '../actions/actionTypes';
import axios from '../../axios-order';

export const purchaseBurderSuccess = (id, orderData) =>{
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        id: id,
        orderData: orderData
    }
}

export const purchaseBurderFail = (error) =>{
     return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error
    }
}

export const purchaseBurderStart = (orderData) =>{
    return dispatch => {
        axios.post('/orders.json', orderData)
            .then(response => {
                console.log(response.data);
                dispatch(purchaseBurderSuccess(response.data, orderData));
            })
            .catch(error => {
                dispatch(purchaseBurderFail(error));
            });
    }
}