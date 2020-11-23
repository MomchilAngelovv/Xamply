import React from 'react';
import { connect } from 'react-redux'
import { usersActions } from '../actions/UsersActions'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

class Login extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      email: '',
      password: '',
    }
  }

  render() {
    return (
      <React.Fragment>
        <h2 className="text-center">Login:</h2>
        <div className="row justify-content-center">
          <Form className="col-md-4 col-sm-12" onSubmit={(e) => this.handleLogin(e)}>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input onChange={(e) => this.handleInputChange(e)} value={this.state.email} type="email" name="email" id="email" placeholder="Email:" />
            </FormGroup>
            <FormGroup>
              <Label for="password">Password</Label>
              <Input onChange={(e) => this.handleInputChange(e)} value={this.state.password} type="password" name="password" id="password" placeholder="Password:" />
            </FormGroup>
            <Button>Login</Button>
            <hr />
          </Form>
        </div>
      </React.Fragment>
    );
  }

  componentDidUpdate() {
    if (this.props.currentUser === null) {
      this.props.history.push('/login')
    }
  }

  handleInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleLogin = async (e) => {
    e.preventDefault();

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

    this.setState({
      email: '',
      password: '',
    });

    if (response.status !== 200) {
      return;
    }

    const responseData = await response.json();
    this.props.login(responseData.data)
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
