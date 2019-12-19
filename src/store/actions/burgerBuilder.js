import * as actionTypes from '../actions/actionTypes';
import axios from '../../axios-order';


export const addIngredient = ( ingredientName ) => {
    return {type: actionTypes.ADD_INGREDIENT, ingredientName: ingredientName};
}

export const removeIngredient = ( ingredientName ) => {
    return {type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingredientName};
}

const setIngredient= (ingredients) =>{
    return {type: actionTypes.SET_INGREDIENT, ingredients: ingredients};
}

const fetchIngredientsFailed = () =>{
    return {type: actionTypes.FETCH_INGREDIENTS_FAILED};
}

export const fetchIngredients = () => {
    return dispatch => {
        axios.get("/ingredients.json")
            .then(response => {
                dispatch(setIngredient(response.data));
            })
            .catch(() => { 
                dispatch(fetchIngredientsFailed());
            });
    }
}