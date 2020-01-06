import React, { Component } from 'react';
import classes from './ContcatData.css';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import axios from '../../../axios-order';
import Input from '../../../components/UI/Input/Input';
import { connect } from 'react-redux';
import withError from '../../../hoc/withErrorHandler/withErrorHandler'
import * as orderActions from '../../../store/actions/index';

class ContactData extends Component {

    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                errorMessage: 'Please enter a valid name'
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                errorMessage: 'Please enter a valid street'
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Zip code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5,
                    isNumeric: true
                },
                valid: false,
                touched: false,
                errorMessage: 'Please enter a valid zip code'
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                errorMessage: 'Please enter a valid country'
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-mail'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false,
                errorMessage: 'Please enter a valid email address'
            },
            delivreyMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'fastest', displayValue: 'Fastest' },
                        { value: 'cheapest', displayValue: 'Cheapest' }
                    ]
                },
                value: 'fastest',
                validation: {},
                valid: true,
            }
        },
        formIsValid: false
    }

    componentDidMount() {
        console.log(this.props);
    }

    orderHandler = (event) => {
        event.preventDefault();
        console.log('orderHandler');
        //this.setState({ loading: true });
        const formData = {};
        for (let formElementIdentifier in this.state.orderForm) {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }
        const orderData = formData;
        const order = {
            ingredients: this.props.ingds,
            price: this.props.price,
            orderData
        }

        this.props.onPurchaseBurger(order);

    }

    checkValidity(rules, value) {
        let isValid = true;

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid;
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid;
        }

        return isValid;
    }

    inputChangedHandler = (event, elementIdentifier) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        };

        const updatedFormdElement = {
            ...updatedOrderForm[elementIdentifier]
        };

        updatedFormdElement.value = event.target.value;
        updatedFormdElement.valid = this.checkValidity(updatedFormdElement.validation, updatedFormdElement.value);
        updatedFormdElement.touched = true;
        updatedOrderForm[elementIdentifier] = updatedFormdElement;
        let formIsValid = true;
        for (let elementIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[elementIdentifier].valid && formIsValid;
        }
        this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid });

    }

    render() {

        let formElements = [];

        for (let key in this.state.orderForm) {
            formElements.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }

        let from = (
            <div>
                <h4>Enter your Contact Data</h4>
                <form onSubmit={this.orderHandler}>
                    {
                        formElements.map(formElement => (
                            <Input
                                key={formElement.id}
                                elementType={formElement.config.elementType}
                                elementConfig={formElement.config.elementConfig}
                                value={formElement.config.value}
                                invalid={!formElement.config.valid}
                                shouldValidate={formElement.config.validation}
                                touched={formElement.config.touched}
                                errorMessage={formElement.config.errorMessage}
                                changed={(event) => this.inputChangedHandler(event, formElement.id)} />
                        ))
                    }
                    <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
                </form>
            </div>);

        if (this.props.loading) {
            from = <Spinner />;
        }
        return (
            <div className={classes.ContactData}>
                {from}
            </div>
        )
    };
}

const mapStateToProps = state => {
    return {
        ingds: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onPurchaseBurger: (orderData) => dispatch(orderActions.purchaseBurger(orderData))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(withError(ContactData, axios));
