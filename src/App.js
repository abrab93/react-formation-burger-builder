// import Checkout from './containers/Checkout/Checkout';
// import Orders from './containers/Orders/Orders';
// import Authentication from './containers/Auth/Auth';
import React, { Component } from 'react';
import './App.css';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import { Route, Switch, Redirect } from 'react-router-dom';
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions/index';
import { connect } from 'react-redux';
import asyncComponent from './hoc/asynComponent/asynComponent';

const asyncCheckoutComponent = asyncComponent(() => {
  return import('./containers/Checkout/Checkout');
});
const asyncOrdersComponent = asyncComponent(() => {
  return import('./containers/Orders/Orders');
});
const asyncAuthenticationComponent = asyncComponent(() => {
  return import('./containers/Auth/Auth');
});



class App extends Component {

  state = {
    show: true
  }

  // componentDidMount(){
  //   setTimeout( ()=>{
  //     this.setState({show: false});
  //   },5000)
  // }

  componentDidMount() {
    this.props.onTryCheckAuthState();
  }

  render() {

    let routes = (
      <Switch>
        <Route path='/auth' component={asyncAuthenticationComponent} />
        <Route path='/' exact component={BurgerBuilder} />
        <Redirect to='/' />
      </Switch>
    );

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path='/auth' component={asyncAuthenticationComponent} />
          <Route path='/orders' component={asyncOrdersComponent} />
          <Route path='/checkout' component={asyncCheckoutComponent} />
          <Route path='/logout' component={Logout} />
          <Route path='/' exact component={BurgerBuilder} />
          <Redirect to='/' />
        </Switch>
      );
    }

    return (
      <div>
        <Layout>
          {/* {this.state.show ? <BurgerBuilder /> : null} */}
          {/* <BurgerBuilder /> */}
          {/* <Checkout /> */}
          {routes}
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryCheckAuthState: () => dispatch(actions.authCheckState())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
