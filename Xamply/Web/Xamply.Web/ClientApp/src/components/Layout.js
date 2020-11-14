import React from 'react';
import { Container } from 'reactstrap';
import NavigationBar from './NavigationBar';
import { Footer } from './Footer';

export class Layout extends React.Component {
  render() {
    return (
      <div>
        <NavigationBar />
        <Container>
          {this.props.children}
        </Container>
        <Footer />
      </div>
    );
  }
}
