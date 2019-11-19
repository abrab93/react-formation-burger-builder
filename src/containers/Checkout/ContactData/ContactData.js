import React, { Component } from 'react';
import classes from './ContcatData.css';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import axios from '../../../axios-order';

class ContactData extends Component {

    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
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
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
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
                this.setState({loading: false});
                this.props.history.push('/');
                })
            .catch(error => {
                console.log(error);
                this.setState({loading: false});
                });

    }

    render() {

        let from = (
                <div>
                    <h4>Enter your Contact Data</h4>
                    <form>
                        <input className={classes.Input} type='text' name='name' placeholder='Your name' />
                        <input className={classes.Input} type='email' name='email' placeholder='Your email' />
                        <input className={classes.Input} type='text' name='street' placeholder='Street' />
                        <input className={classes.Input} type='text' name='postal' placeholder='Postal' />
                        <Button btnType="Success" clicked={(event) => this.orderHandler(event)}>ORDER</Button>
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
