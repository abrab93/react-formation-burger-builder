import React, { Component } from 'react';
import classes from './ContcatData.css';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import axios from '../../../axios-order';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {

    state = {
        orderForm : {
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
                valid: false
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
                valid: false
            },
            zipCode:{
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Zip code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 4,
                    maxLength: 6
                },
                valid: false
            } ,
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
                valid: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your E-mail'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false
            },
            delivreyMethod: {
                elementType: 'select',
                elementConfig: {
                   options: [
                       {value: 'fastest', displayValue: 'Fastest'},
                       {value: 'cheapest', displayValue: 'Cheapest'}
                   ]
                },
                value: ''
            }
        },
        loading: false
    }

    componentDidMount() {
        console.log(this.props);
    }

    orderHandler = (event) =>{
        event.preventDefault();
        console.log('orderHandler');
        this.setState({loading: true});
        const formData ={};
        for(let formElementIdentifier in this.state.orderForm){
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }
        const orderData = formData;
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            orderData
        }

        axios.post('/orders.json', order)
            .then(response => {
                console.log(response);
                this.setState({loading: false});
                this.props.history.push('/');
            })
            .catch(error => {
                console.log(error);
                this.setState({loading: false});
        });

    }

    checkValidity (rules, value) {
        let isValid = true;

        if(rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if(rules.minLength){
            isValid = value.length >= rules.minLength && isValid;
        }

        if(rules.maxLength){
            isValid = value.length <= rules.maxLength && isValid;
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
        if(updatedFormdElement.validation){
            updatedFormdElement.valid = this.checkValidity(updatedFormdElement.validation, updatedFormdElement.value);
        }
        console.log(updatedFormdElement);
        updatedOrderForm[elementIdentifier] = updatedFormdElement;

        this.setState({orderForm: updatedOrderForm});
       
    }

    render() {

        let formElements = [];

        for(let key in this.state.orderForm){
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
                            formElements.map(formElement =>(
                                <Input 
                                    key={formElement.id}
                                    elementType={formElement.config.elementType} 
                                    elementConfig={formElement.config.elementConfig} 
                                    value={formElement.config.value} 
                                    invalid={!formElement.config.valid}
                                    shouldValidate={formElement.config.validation}
                                    changed={(event) =>this.inputChangedHandler(event, formElement.id)}/>
                            ))
                        }
                        <Button btnType="Success">ORDER</Button>
                    </form>
                </div>);

                if (this.state.loading){
                    from = <Spinner />;
                }
        return (
            <div className={classes.ContactData}>
                {from}
            </div>
        )
    };
}
export default ContactData;
