import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'

class NavigationBar extends React.Component {
  render() {
    return (
      <nav className="grey darken-2">
        <div className="nav-wrapper">
          <a href="#" className="brand-logo">Logo</a>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li><Link to="/">Sass</Link></li>
            <li><Link to="/">Components</Link></li>
            <li><Link to="/">JavaScript</Link></li>
          </ul>
        </div>
      </nav>
    );
  }
}

const mapState = (state, props) => {
  return {
    categories: state.categories
  }
}

const mapDispatch = (dispatch) => {
  return {

  }
}

export default connect(mapState, mapDispatch)(NavigationBar)

