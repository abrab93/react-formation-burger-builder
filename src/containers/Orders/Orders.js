import React, {Component} from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withError from '../../hoc/withErrorHandler/withErrorHandler'
import {connect} from 'react-redux';
import * as orderActions from '../../store/actions/index';

class Orders extends Component {

    componentDidMount(){
        /*axios.get('/orders.json')
        .then(response =>{
            console.log(response.data);
            let fetchedOrders = [];
            for (let key in response.data){
                fetchedOrders.push({
                    id: key, 
                    ...response.data[key]
                });
            }
            this.setState({orders: fetchedOrders, loading: false});
        })
        .catch(error =>{
            console.log(error);
            this.setState({loading: false});
        })*/
        this.props.onFetchOrders(this.props.token);
    }

    render(){

        let orders = <Spinner />;

        if (!this.props.loading){
            orders = (
                <div>
                    {this.props.orders.map(order =>{
                        return <Order
                                    key={order.id}
                                    ingredients={order.ingredients}
                                    price={order.price} />
                    })}
                </div>
            );
        }

        return(
            <div>
                {orders}  
            </div>
        );
    }
}

const mapStatToProps = state =>{
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: (token) => dispatch(orderActions.fetchOrders(token))
    }
}

export default connect(mapStatToProps, mapDispatchToProps)(withError(Orders, axios));