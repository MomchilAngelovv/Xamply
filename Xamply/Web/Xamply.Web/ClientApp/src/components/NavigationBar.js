import React from 'react';
import { NavLink as ReactLink, Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { usersActions } from '../actions/UsersActions'
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Button } from 'reactstrap';

const navigationBarStyle = {
  backgroundColor: "#8EDBCC",
}

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
        <Navbar style={navigationBarStyle} light expand="md" className="sticky-top">
          <NavbarBrand to="/" tag={Link}>Xamply</NavbarBrand>
          <NavbarToggler onClick={this.toggleNavbar} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="mr-auto" navbar>
              <NavItem>
                <NavLink to="/rankings" tag={ReactLink}>Rankings</NavLink>
              </NavItem>
            </Nav>
            {this.userButtons()}
          </Collapse>
        </Navbar>
      </div>
    );
  }

  toggleNavbar = () => {
    this.setState({ isOpen: !this.state.isOpen })
  }

  userButtons = () => {
    if (this.props.currentUser === null) {
      return (
        <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink to="/login" tag={ReactLink} activeClassName="active">Login</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/register" tag={ReactLink} activeClassName="active" >Register</NavLink>
          </NavItem>
        </Nav>
      )
    }

    return (
      <Nav className="ml-auto" navbar>
        <UncontrolledDropdown nav inNavbar>
          <DropdownToggle nav caret>
            Profile
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem>
              <Link to="/profile" className="dropdown-item">Profile</Link>
            </DropdownItem>
            <DropdownItem divider />
            <div className="dropdown-item">
              <Button onClick={(e) => this.logout(e)} className="dropdown-item">Logout</Button>
            </div>
          </DropdownMenu>
        </UncontrolledDropdown>
      </Nav>
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

