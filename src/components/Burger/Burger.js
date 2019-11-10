import React from 'react';
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
// import Aux from '../../hoc/Auxiliary';

const burger = (props) => {
    let transformedIngredients = Object.keys(props.ingredients)
         .map(ngKey => {
            return ([...Array(props.ingredients[ngKey])].map((_,i) =>{
                return <BurgerIngredient key={ngKey + i} type={ngKey} />
            }));
        })
        .reduce((arr, el) => {
            return arr.concat(el);
        },[]);

    if (transformedIngredients.length === 0){
        transformedIngredients = <p>Please start adding ingredients!</p>;
    }   

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom" />
            
        </div>
    );
}

export default burger;