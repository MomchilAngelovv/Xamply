import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { usersActions } from '../actions/UsersActions'

class NavigationBar extends React.Component {
  render() {
    return (
      <nav className="grey darken-2">
        <div className="nav-wrapper">
          <Link to="/" className="brand-logo">Logo</Link>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            {this.renderUserButtons()}
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
          <li><Link to="/register">Register</Link></li>
        </React.Fragment>
      )
    }

    return (
      <React.Fragment>
        <li><Link to="/profile">Profile</Link></li>
        <li><a onClick={this.logout}>Logout</a></li>
      </React.Fragment>
    )
  }

  logout = () => {
    this.props.logout()
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
    logout: () => dispatch(usersActions.logout())
  }
}

export default connect(mapState, mapDispatch)(NavigationBar)

