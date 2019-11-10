import React from 'react';
import Aux from '../../../hoc/Auxiliary';

const orderSummary = (props) => {
    const orderDetails = Object.keys(props.ingredients)
        .map(ngKey => {
            return (
                <li key={ngKey}>
                    <span style={{textTransform:'capitalize'}}>{ngKey}:</span>{props.ingredients[ngKey]}
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
                <p>Continue to checkout?</p>
            </div>
        </Aux>
    );
}

export default orderSummary;