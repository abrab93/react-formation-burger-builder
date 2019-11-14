import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
    salad: 0.4,
    meat: 1.5,
    bacon: 1,
    cheese: 0.6
}

class BurgerBuilder extends Component {

    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount (){
        console.log('[BurgerBuilder].componentDidMount')
        axios.get("/ingredients.json")
            .then(response =>{
                this.setState({ingredients: response.data});
                console.log(response.data);
            })
            .catch(error =>{this.setState({error:true})});
    }

    updatePurchaseState = (ingredients) => {

        const sum = Object.keys(ingredients)
            .map(ngKey => {
                return ingredients[ngKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);

        this.setState({ purchasable: sum > 0 });
    }

    addIngredientHandler = (type) => {

        const updatedIngredients = { ...this.state.ingredients };
        updatedIngredients[type] = this.state.ingredients[type] + 1;
        const newTotalPrice = this.state.totalPrice + INGREDIENT_PRICES[type];
        this.setState({ totalPrice: newTotalPrice, ingredients: updatedIngredients });
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        if (this.state.ingredients[type] > 0) {
            const updatedIngredients = { ...this.state.ingredients };
            updatedIngredients[type] = this.state.ingredients[type] - 1;
            const newTotalPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
            this.setState({ totalPrice: newTotalPrice, ingredients: updatedIngredients });
            this.updatePurchaseState(updatedIngredients);
        }
    }

    checkoutHandler = () => {
        this.setState({ purchasing: true });
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false })
    }

    purchaseContinueHandler = () => {
        this.setState({loading: true});
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'abdelmoughit',
                address:{
                    street: 'Str N12',
                    zipCode: 42560,
                    country: 'Morocco'
                },
                email: 'test@gmail.com'
            },
            delivreyMethod: 'fastest'
        }
        
        axios.post('/orders.json', order)
            .then(response => {
                console.log(response);
                this.setState({loading: false, purchasing: false});
                })
            .catch(error => {
                console.log(error);
                this.setState({loading: false, purchasing: false});
                });
    }

    render() {

        const disabledInfo = { ...this.state.ingredients };

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = null;

        let burger = this.state.error ? <p>Ingredients can't be loaded !!</p> : <Spinner />;

        if (this.state.ingredients){
            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls
                        totalPrice={this.state.totalPrice}
                        disabled={disabledInfo}
                        ingredientsAdded={this.addIngredientHandler}
                        ingredientsRemoved={this.removeIngredientHandler}
                        purchasable={!this.state.purchasable}
                        ordred={this.checkoutHandler}/>
                </Aux>
            );

            orderSummary = (<OrderSummary
                        price={this.state.totalPrice}
                        ingredients={this.state.ingredients}
                        purchaseCancelled={this.purchaseCancelHandler}
                        purshaseContinued={this.purchaseContinueHandler}/>);

            if(this.state.loading){
                orderSummary = <Spinner />;
        }
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

export default withErrorHandler(BurgerBuilder, axios);