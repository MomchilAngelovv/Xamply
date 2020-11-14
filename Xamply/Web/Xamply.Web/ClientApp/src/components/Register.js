import React from 'react';
import { connect } from 'react-redux'

class Register extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
      registerFailed: false,
      modalShow: 'none',
    }
  }

  render() {
    return (
      <React.Fragment>
        <h3 className="center-align">Enter email ,password and confirm password:</h3>
        {this.renderRegisterFailed()}
        <div className="row">
          <form className="col s12" onSubmit={(event) => this.register(event)}>
            <div className="row">
              <div className="input-field col s4">
                <input onChange={(event) => this.loginFormChange(event)} name="email" type="text" placeholder="Email:" className="validate" />
              </div>
              <div className="input-field col s4">
                <input onChange={(event) => this.loginFormChange(event)} name="password" type="password" placeholder="Password:" className="validate" />
              </div>
              <div className="input-field col s4">
                <input onChange={(event) => this.loginFormChange(event)} name="confirmPassword" type="password" placeholder="Confirm password:" className="validate" />
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <button type="submit" className="btn waves-effect waves-light">Submit<i className="material-icons right">send</i></button>
              </div>
            </div>
          </form>
        </div>
        <div id="register-modal" className="modal" style={{ display: this.state.modalShow}}>
          <div className="modal-content">
            <h4>Succesfully registration</h4>
            <p>You have register successfully. Please login to continue.</p>
          </div>
          <div className="modal-footer">
            <button onClick={this.goToLogin} className="modal-close waves-effect waves-green btn-flat">Go to login page</button>
          </div>
        </div>
      </React.Fragment>
    );
  }

  goToLogin = () => {
    this.props.history.push('/login')
  }

  renderRegisterFailed = () => {
    if (this.state.registerFailed === true) {
      return <div>Register failed. Please enter correct username, password and confirm password.</div>
    }
  }

  loginFormChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  register = async (event) => {
    event.preventDefault();

    console.log(1)

    let data = {
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword
    }

    const response = await fetch("https://localhost:44312/users/register", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (response.status !== 200) {
      this.setState({ registerFailed: true })
      return;
    }

    this.setState({ modalShow: 'block' })
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

export default connect(mapState, mapDispatch)(Register)
