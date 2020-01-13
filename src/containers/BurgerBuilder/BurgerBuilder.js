import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
//import * as actionTypes from '../../store/actions/actionTypes';
import * as actions from '../../store/actions/index';

export class BurgerBuilder extends Component {

    state = {
        purchasing: false,
    }

    componentDidMount() {

        this.props.onFetchIngredient();
    }

    updatePurchaseState = (ingredients) => {

        const sum = Object.keys(ingredients)
            .map(ngKey => {
                return ingredients[ngKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);

        return sum > 0;
    }

    /* addIngredientHandler = (type) => {
 
         const updatedIngredients = { ...this.state.ingredients };
         updatedIngredients[type] = this.state.ingredients[type] + 1;
         const newTotalPrice = this.state.totalPrice + INGREDIENT_PRICES[type];
         this.setState({ totalPrice: newTotalPrice, ingredients: updatedIngredients });
         this.updatePurchaseState(this.props.ingds);
     }
 
     removeIngredientHandler = (type) => {
         if (this.state.ingredients[type] > 0) {
             const updatedIngredients = { ...this.state.ingredients };
             updatedIngredients[type] = this.state.ingredients[type] - 1;
             const newTotalPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
             this.setState({ totalPrice: newTotalPrice, ingredients: updatedIngredients });
             this.updatePurchaseState(updatedIngredients);
         }
     }*/

    checkoutHandler = () => {
        if (this.props.isAuthenticated) {
            this.setState({ purchasing: true });
        } else {
            if(this.props.purchased){// to init state.order.purchased ==> resolve redirection bug 
                this.props.onPurchasedInit();
            }
            this.props.onSetAutRedirectPath();
            this.props.history.push('/auth');
        }

    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false })
    }

    purchaseContinueHandler = () => {
        /*let queryParam = [];
        for (let i in this.state.ingredients){
            queryParam.push(encodeURIComponent(i)+'='+encodeURIComponent(this.state.ingredients[i]));
        }
        queryParam.push('price='+this.state.totalPrice);
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryParam.join('&')
               });*/
        this.props.onPurchasedInit();
        this.props.history.push('/checkout');
    }

    render() {

        const disabledInfo = { ...this.props.ingds };

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = null;

        let burger = this.props.error ? <p>Ingredients can't be loaded !!</p> : <Spinner />;

        if (this.props.ingds) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ingds} />
                    <BuildControls
                        totalPrice={this.props.price}
                        disabled={disabledInfo}
                        isAuth={this.props.isAuthenticated}
                        ingredientsAdded={this.props.onAddIngredient}
                        ingredientsRemoved={this.props.onRemoveIngredient}
                        purchasable={!this.updatePurchaseState(this.props.ingds)}
                        ordred={this.checkoutHandler} />
                </Aux>
            );

            orderSummary = (<OrderSummary
                price={this.props.price}
                ingredients={this.props.ingds}
                purchaseCancelled={this.purchaseCancelHandler}
                purshaseContinued={this.purchaseContinueHandler} />);
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} closed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        ingds: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null,
        purchased: state.order.purchased
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAddIngredient: (ingredientName) => dispatch(actions.addIngredient(ingredientName)),
        onRemoveIngredient: (ingredientName) => dispatch(actions.removeIngredient(ingredientName)),
        onFetchIngredient: () => dispatch(actions.fetchIngredients()),
        onPurchasedInit: () => dispatch(actions.purchaseInit()),
        onSetAutRedirectPath: () => dispatch(actions.setAuthRredirectPath('/checkout')),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));