import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckOutSummary';
import ContactData from '../Checkout/ContactData/ContactData';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

class Checkout extends Component {

    componentDidMount() {
        /*console.log('Checkout.componentDidMount');
        const query = new URLSearchParams(this.props.location.search);
        let loadedIngredients = {};
        let price = 0;
        for (let param of query.entries()) {
            if(param[0] === 'price'){
                price = param[1];
            }else{
                loadedIngredients[param[0]] = Number(param[1]);
            }
        }
        this.setState({ ingredients: loadedIngredients, totalPrice: price });*/
    }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {

        let summary = <Redirect to='/' />;

        if(this.props.ingds){
            const purchasedRedirect = this.props.purchased ? <Redirect to='/' /> : null;
            summary = (
                 <div>
                     {purchasedRedirect}
                    <CheckoutSummary
                        ingredients={this.props.ingds}
                        checkoutCancelled={this.checkoutCancelledHandler}
                        checkoutContinued={this.checkoutContinuedHandler} />
                        {/*<Route 
                        path={this.props.match.path + '/contact-data'} 
                        render={(props) => <ContactData 
                                                    ingredients={this.props.ingds} 
                                                    totalPrice={this.props.price}
                        {...props} />}/>*/}

                    <Route 
                        path={this.props.match.path + '/contact-data'} 
                        component={ContactData}
                    />

            </div>
            );
        }

        return summary;
    };
}

const mapStateToProps = state => {
    return {
        ingds: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        purchased: state.order.purchased
    };
};

export default connect(mapStateToProps)(Checkout);
