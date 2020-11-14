import React from 'react';
import { connect } from 'react-redux'
import { usersActions } from '../actions/UsersActions'

class Login extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      email: '',
      password: '',
      loginFailed: false
    }
  }

  render() {
    return (
      <React.Fragment>
        <h3 className="center-align">Enter email and password:</h3>
        {this.renderLoginFailed()}
        <div className="row">
          <form className="col s12" onSubmit={(event) => this.login(event)}>
            <div className="row">
              <div className="input-field col s6">
                <input onChange={(event) => this.loginFormChange(event)} name="email" type="text" placeholder="Email:" className="validate" />
                <label htmlFor="email">First Name</label>
              </div>
              <div className="input-field col s6">
                <input onChange={(event) => this.loginFormChange(event)} name="password" type="password" placeholder="Password:" className="validate" />
                <label htmlFor="password">Last Name</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <button type="submit" className="btn waves-effect waves-light">Submit<i className="material-icons right">send</i></button>
              </div>
            </div>
          </form>
        </div>
      </React.Fragment>
    );
  }

  renderLoginFailed = () => {
    if (this.state.loginFailed === true) {
      return <div>Login failed. Please enter correct username and password.</div>
    }
  }

  loginFormChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  login = async (event) => {
    event.preventDefault();

    let data = {
      email: this.state.email,
      password: this.state.password
    }

    const response = await fetch("https://localhost:44312/users/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (response.status !== 200) {
      this.setState({ loginFailed: true })
      return;
    }

    const responseData = await response.json();
    this.props.login(responseData.currentUser)
    this.props.history.push('/')
  }
}

const mapState = (state, props) => {
  return {
  }
}

const mapDispatch = (dispatch) => {
  return {
    login: (currentUser) => dispatch(usersActions.login(currentUser))
  }
}

export default connect(mapState, mapDispatch)(Login)
