import React from 'react';
import { Jumbotron } from 'reactstrap';
import NavigationBar from './NavigationBar';
import { Footer } from './Footer';

const jumbotronStyle = {
  height: "100vh",
}

export class Layout extends React.Component {
  render() {
    return (
      <div>
        <NavigationBar />
        <Jumbotron style={jumbotronStyle}>
          {this.props.children}
        </Jumbotron>
        <Footer />
      </div>
    );
  }
}
