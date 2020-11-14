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
            { this.renderUserButtons() }
          </ul>
        </div>
      </nav>
    );
  }

  renderUserButtons = () => {
    if (this.props.currentUser === null) {
      return (
        <React.Fragment>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/">Register</Link></li>
        </React.Fragment>
      )
    }

    return (
      <React.Fragment>
        <li><Link to="/">Profile</Link></li>
        <li><Link to="/">Logout</Link></li>
      </React.Fragment>
    )
  }
}

const mapState = (state, props) => {
  return {
    currentUser: state.currentUser,
    categories: state.categories
  }
}

const mapDispatch = (dispatch) => {
  return {

  }
}

export default connect(mapState, mapDispatch)(NavigationBar)

