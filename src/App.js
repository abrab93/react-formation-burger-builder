import React, { Component } from 'react';
import './App.css';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Authentication from './containers/Auth/Auth';
import { Route, Switch, Redirect } from 'react-router-dom';
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions/index';
import { connect } from 'react-redux';

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
        <Route path='/auth' component={Authentication} />
        <Route path='/' exact component={BurgerBuilder} />
        <Redirect to='/' />
      </Switch>
    );

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path='/orders' component={Orders} />
          <Route path='/checkout' component={Checkout} />
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
