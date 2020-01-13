import React, { Component } from 'react';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {

    render() {

        const orderDetails = Object.keys(this.props.ingredients)
            .map(ngKey => {
                return (
                    <li key={ngKey}>
                        <span style={{ textTransform: 'capitalize' }}>{ngKey}:</span>{this.props.ingredients[ngKey]}
                    </li>
                )
            });

        return (
            <Aux>
                <div>
                    <h3>Your Order</h3>
                    <p>A delicious burger with the following ingredients:</p>
                    <ul>
                        {orderDetails}
                    </ul>
                    <p><strong>Total Price : {this.props.price.toFixed(2)}£</strong></p>
                    <p>Continue to checkout?</p>
                </div>
                <Button btnType="Danger" clicked={this.props.purchaseCancelled} >CANCEL</Button>
                <Button btnType="Success" clicked={this.props.purshaseContinued} >CONTINUE</Button>
            </Aux>
        );
    }

}

export default OrderSummary;