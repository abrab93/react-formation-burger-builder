import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckOutSummary';

class Checkout extends Component {

    state = {
        ingredients: {
            bacon: 0,
            cheese: 0,
            meat: 0,
            salad: 0
        }
    }

    componentDidMount() {
        console.log('Checkout.componentDidMount');
        const query = new URLSearchParams(this.props.location.search);
        let loadedIngredients = {};
        for (let param of query.entries()) {
            loadedIngredients[param[0]] = Number(param[1]);
        }
        this.setState({ ingredients: loadedIngredients });
    }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {
        return (
            <div>
                <CheckoutSummary
                    ingredients={this.state.ingredients}
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler} />
            </div>
        )
    };
}

export default Checkout;
