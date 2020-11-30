import React from 'react';
import { Link } from 'react-router-dom'


const footerStyle = {
  backgroundColor: "#8EDBCC",
}

class Footer extends React.Component {
  render() {
    return (
      <footer className="footer fixed-bottom" style={footerStyle}>
        <div className="container">
          <div className="row">
            <div className="col l6 s12">
              <h5 className="white-text">Footer Content</h5>
              <p className="grey-text text-lighten-4">© 2014 Copyright Text</p>
            </div>
            <div className="col l4 offset-l2 s12">
              <h5 className="white-text">Links</h5>
              <ul>
                <Link to="/">Link 1</Link>
                <Link to="/">Link 1</Link>
                <Link to="/">Link 1</Link>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

export { Footer }
