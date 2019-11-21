import React from 'react';
import classes from './Order.css';

const order = (props) => {
    const ingredients = [];

    for (let key in props.ingredients){
        ingredients.push({
            name: key,
            amount: props.ingredients[key]
        });
    }

    const ingredientsOutput = ingredients.map(ng =>{
        return <span 
            style={{
                textTransform: 'capitalize',
                display: 'inline-block',
                margin: '0 8px',
                border: '1px solid #ccc',
                padding: '5px'
            }}
            key={ng.name}>{ng.name} ({ng.amount})
        </span>
    })

    return (
        <div className={classes.Order}>
            <p>Ingredients: {ingredientsOutput} </p>
            <p>Price: <strong>USD {props.price}</strong></p>
        </div>
    )
};

export default order;