import React from 'react';
import { connect } from 'react-redux'
import { Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class Register extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
      registerResult: '',
      modalToggle: false
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
              <Input onChange={(e) => this.handleInputChange(e)} value={this.state.email} type="email" name="email" id="email" placeholder="Email:" />
            </FormGroup>
            <FormGroup>
              <Label for="password">Password</Label>
              <Input onChange={(e) => this.handleInputChange(e)} value={this.state.password} type="password" name="password" id="password" placeholder="Password:" />
            </FormGroup>
            <FormGroup>
              <Label for="confirmPassword">Password</Label>
              <Input onChange={(e) => this.handleInputChange(e)} value={this.state.confirmPassword} type="password" name="confirmPassword" id="confirmPassword" placeholder="Confirm password:" />
            </FormGroup>
            <Button>Register</Button>
            <hr />
          </Form>
        </div>
        <Modal isOpen={this.state.modalToggle} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Modal title</ModalHeader>
          <ModalBody>
            <div>{this.state.registerResult}</div>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggleModal}>CTA</Button>
            <Button color="secondary" onClick={this.toggleModal}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </React.Fragment>
    );
  }

  toggleModal = () => {
    this.setState({ modalToggle: !this.state.modalToggle })
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

    this.toggleModal();

    this.setState({
      email: '',
      password: '',
      confirmPassword: ''
    });

    if (response.status !== 200) {
      this.setState({ registerResult: "Register failed. Please enter correct username, password and confirm password." })
      return;
    }

    this.setState({ registerResult: "You have registered succesfully." })
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
