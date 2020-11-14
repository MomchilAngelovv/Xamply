import React from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout'
import Dashboard from './components/Dashboard'
import Login from './components/Login'
import Register from './components/Register'

export default class App extends React.Component {
  render() {
    return (
      <Layout>
        <Route exact path='/' component={Dashboard} />
        <Route exact path='/profile' component={Dashboard} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/register' component={Register} />
      </Layout>
    );
  }
}
