import React from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout'
import Dashboard from './components/Dashboard'
import Login from './components/Login'
import Register from './components/Register'
import Profile from './components/Profile'
import Exam from './components/Exam'

export default class App extends React.Component {
  render() {
    return (
      <Layout>
        <Route exact path='/' component={Dashboard} />
        <Route exact path='/profile' component={Profile} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/register' component={Register} />
        <Route exact path='/exam' component={Exam} />
      </Layout>
    );
  }
}
