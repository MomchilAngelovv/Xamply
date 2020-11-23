import React from 'react';
import { NavLink as ReactLink } from 'react-router-dom';
import { connect } from 'react-redux'
import { usersActions } from '../actions/UsersActions'
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, NavbarText } from 'reactstrap';

class NavigationBar extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isOpen: true
    }
  }

  render() {
    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">Xamply</NavbarBrand>
          <NavbarToggler onClick={this.toggleNavbar} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="mr-auto" navbar>
              <NavItem>
                <NavLink href="/">Components</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="https://github.com/reactstrap/reactstrap">GitHub</NavLink>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Options
                </DropdownToggle>
                <DropdownMenu right>

                  <DropdownItem>
                    Option 2
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>
                    Reset
                </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
            {this.renderUserButtons()}

          </Collapse>
        </Navbar>
      </div>






























    );
  }

  //   <nav className="grey darken-2">
  //  <div className="nav-wrapper">
  //    <Link to="/" className="brand-logo center">Xamply</Link>
  //    <ul id="nav-mobile" className="right hide-on-med-and-down">
  //      {this.renderUserButtons()}
  //    </ul>
  //  </div>
  //</nav>

  toggleNavbar = () => {
    this.setState({ isOpen: !this.state.isOpen })
  }

  renderUserButtons = () => {
    if (this.props.currentUser === null) {
      return (
        <React.Fragment>
          <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink to="/login" tag={ReactLink} activeClassName="active">Login</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/register" tag={ReactLink} activeClassName="active" >Register</NavLink>
            </NavItem>
          </Nav>
        </React.Fragment>
      )
    }

    return (
      <React.Fragment>
        <NavItem>
          <NavLink href="/profile">Profile</NavLink>
        </NavItem>
        <li><button onClick={this.logout}>Logout</button></li>
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

