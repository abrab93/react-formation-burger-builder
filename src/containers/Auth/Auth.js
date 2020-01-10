import React, { Component } from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.css';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
import { Redirect } from 'react-router-dom';


class Auth extends Component {

    state = {
        controles: {
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
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        },
        isSignup: false
    }

    componentDidMount() {
        if (!this.props.building && this.props.authRedirectPath !== '/') {
            this.props.onSetAuthRedirectPath();
        }
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

    inputChangedHandler = (event, controleName) => {
        const updatedControls = {
            ...this.state.controles,
            [controleName]: {
                ...this.state.controles[controleName],
                value: event.target.value,
                valid: this.checkValidity(this.state.controles[controleName].validation, event.target.value),
                touched: true
            }
        };

        this.setState({ controles: updatedControls })
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAth(this.state.controles.email.value, this.state.controles.password.value, this.state.isSignup);
    }

    switchHandler = () => {
        this.setState(prevStat => {
            return {
                isSignup: !prevStat.isSignup
            };
        });
    }

    render() {


        let formElements = [];

        for (let key in this.state.controles) {
            formElements.push({
                id: key,
                config: this.state.controles[key]
            });
        }

        let form = formElements.map(formElement => (
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

        let errorMessage = null;

        if (this.props.loading) {
            form = <Spinner />;
        }

        if (this.props.error) {
            errorMessage = (
                <p>{this.props.error.message}</p>
            );
        }

        let authRedirect = null;

        if (this.props.isAuthenticated) {
            authRedirect = <Redirect to={this.props.authRedirectPath} />
        }

        return (
            <div className={classes.Auth}>
                {authRedirect}
                {errorMessage}
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button btnType='Success'>Success</Button>
                </form>
                <Button
                    clicked={this.switchHandler}
                    btnType='Danger'>Switch to {!this.state.isSignup ? 'Signup' : 'Signin'}</Button>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRredirectPath('/'))
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        authRedirectPath: state.auth.authRedirectPath,
        building: state.burgerBuilder.building
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);