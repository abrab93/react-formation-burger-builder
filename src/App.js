import React, { Component } from 'react';
import './App.css';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Authentication from './containers/Auth/Auth';
import { Route, Switch } from 'react-router-dom';
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
    return (
      <div>
        <Layout>
          {/* {this.state.show ? <BurgerBuilder /> : null} */}
          {/* <BurgerBuilder /> */}
          {/* <Checkout /> */}
          <Switch>
            <Route path='/orders' component={Orders} />
            <Route path='/checkout' component={Checkout} />
            <Route path='/auth' component={Authentication} />
            <Route path='/logout' component={Logout} />
            <Route path='/' exact component={BurgerBuilder} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryCheckAuthState: () => dispatch(actions.authCheckState())
  }
}

export default connect(null, mapDispatchToProps)(App);
