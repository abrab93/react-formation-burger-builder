import React from 'react';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import Button from '../../UI/Button/Button';

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
                <p><strong>Total Price : {props.price.toFixed(2)}£</strong></p>
                <p>Continue to checkout?</p>
            </div>
            <Button btnType="Danger" clicked={props.purchaseCancelled} >CANCEL</Button>
            <Button btnType="Success" clicked={props.purshaseContinued} >CONTINUE</Button>
        </Aux>
    );
}

export default orderSummary;