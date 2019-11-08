import React, { Component } from 'react';
import './App.css';
import Layout from './containers/Layout';

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
            <p>layout Test!!</p>
        </Layout>
      </div>
    );
  }
}

export default App;
