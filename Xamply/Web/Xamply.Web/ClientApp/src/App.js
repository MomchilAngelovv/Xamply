import React from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout'
import Dashboard from './components/Dashboard'

export default class App extends React.Component {
  render() {
    return (
      <Layout>
        <Route exact path='/' component={Dashboard} />
      </Layout>
    );
  }
}
