import React from 'react';
import { connect } from 'react-redux'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

class Register extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
    }
  }

  render() {
    return (
      <React.Fragment>
        <h2 className="text-center">Register:</h2>
        <div className="row justify-content-center">
          <Form className="col-md-4 col-sm-12" onSubmit={(e) => this.handleRegister(e)}>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input onChange={(e) => this.handleInputChange(e)} type="email" name="email" id="email" placeholder="Email:" />
            </FormGroup>
            <FormGroup>
              <Label for="password">Password</Label>
              <Input onChange={(e) => this.handleInputChange(e)} type="password" name="password" id="password" placeholder="Password:" />
            </FormGroup>
            <FormGroup>
              <Label for="confirmPassword">Password</Label>
              <Input onChange={(e) => this.handleInputChange(e)} type="password" name="confirmPassword" id="confirmPassword" placeholder="Confirm password:" />
            </FormGroup>
            <Button>Register</Button>
            <hr />
          </Form>
        </div>
      </React.Fragment>
    );
  }

  renderRegisterFailed = () => {
    if (this.state.registerFailed === true) {
      return <div>Register failed. Please enter correct username, password and confirm password.</div>
    }
  }

  handleInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleRegister = async (e) => {
    e.preventDefault();

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
