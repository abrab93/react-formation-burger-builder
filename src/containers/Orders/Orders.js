import React, {Component} from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withError from '../../hoc/withErrorHandler/withErrorHandler'

class Orders extends Component {

    state = {
        orders: [],
        loading: true
    }

    componentDidMount(){
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
            this.setState({orders: fetchedOrders, loading: false});
        })
        .catch(error =>{
            console.log(error);
            this.setState({loading: false});
        })
    }

    render(){

        let orders = <Spinner />;

        if (!this.state.loading){
            orders = (
                <div>
                    {this.state.orders.map(order =>{
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

export default withError(Orders, axios);