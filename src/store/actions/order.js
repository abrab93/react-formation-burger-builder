import * as actionTypes from '../actions/actionTypes';
import axios from '../../axios-order';

export const purchaseBurgerSuccess = (id, orderData) =>{
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        id: id,
        orderData: orderData
    }
}

export const purchaseBurgerFail = (error) =>{
     return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error
    };
}

export const purchaseBurderStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    };
};

export const purchaseBurger = (orderData) =>{
    return dispatch => {
        dispatch(purchaseBurderStart());
        axios.post('/orders.json', orderData)
            .then(response => {
                dispatch(purchaseBurgerSuccess(response.data.name, orderData));
            })
            .catch(error => {
                dispatch(purchaseBurgerFail(error));
            });

    };
}

export const purchaseInit = () =>{
    return {
        type: actionTypes.PURSHASE_INIT
    };
}

export const fetchOrders = () => {
    return dispatch => {
        dispatch(fetchOrdersStart());
        axios.get('/orders.json')
            .then(response =>{
                console.log(response.data);
                let fetchedOrders = [];
                for (let key in response.data){
                    fetchedOrders.push({
                        id: key, 
                        ...response.data[key]
                    });
                }
                dispatch(fetchOrdersSucced(fetchedOrders));
            })
            .catch(error =>{
                dispatch(fetchOrdersFailed(error));
        })    
    };
}

export const fetchOrdersFailed = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAILED,
        error: error
    };
}

export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START,
    };
}

export const fetchOrdersSucced = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCED,
        orders: orders
    };
}