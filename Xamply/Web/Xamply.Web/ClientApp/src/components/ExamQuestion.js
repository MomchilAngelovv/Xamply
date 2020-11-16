﻿import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'

class ExamQuestion extends React.Component {
  render() {
    return (
      <footer className="page-footer grey darken-2">
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
                <Link to="/">Link 2</Link>
                <Link to="/">Link 3</Link>
                <Link to="/">Link 4</Link>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

const mapState = (state, props) => {
  return {
  }
}

const mapDispatch = (dispatch) => {
  return {
  }
}

export default connect(mapState, mapDispatch)(ExamQuestion)