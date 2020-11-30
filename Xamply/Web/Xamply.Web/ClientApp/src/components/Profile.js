import React from 'react';
import { connect } from 'react-redux'
import { Row, Col, Alert, ListGroup, ListGroupItem } from 'reactstrap';

class Profile extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      userInformation: null,
      exams: null
    }
  }

  render() {
    return (
      <React.Fragment>
        <h4 className="text-center">User information:</h4>
        <Row>
          <Col className="d-flex justify-content-center">
            <button onClick={(e) => this.showData(e, this.props.currentUser.id)} className="btn btn-primary">Id</button>
          </Col>
          <Col className="d-flex justify-content-center">
            <button onClick={(e) => this.showData(e, this.props.currentUser.email)} className="btn btn-primary">Email</button>
          </Col>
          <Col className="d-flex justify-content-center">
            <button onClick={(e) => this.showData(e, this.props.currentUser.accessToken)} className="btn btn-primary">Access token</button>
          </Col>
        </Row>
        {this.state.userInformation !== null &&
          <React.Fragment>
            <hr />
            <Alert color="success" className="text-center text-break">
              {this.state.userInformation}
            </Alert>
          </React.Fragment>
        }
        <hr />
        <h4 className="text-center">Exams:</h4>

        {this.state.exams &&
          <ListGroup>
            {this.state.exams.map(e => (
              <ListGroupItem key={e.id} tag="button" action>{e.id} : {e.category} : {e.difficulty} : {e.questionCount} : {e.score}</ListGroupItem>)
            )}
          </ListGroup>
        }

        {!this.state.exams &&
          <Alert color="warning" className="text-center text-break">
            Loading...
          </Alert>
        }

      </React.Fragment>
    );
  }

  async componentDidMount() {
    const response = await fetch(`https://localhost:44312/users/${this.props.currentUser.id}/exams`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.props.currentUser.accessToken}`
      },
    });

    if (response.status !== 200) {
      return;
    }
    const responseData = await response.json();

    this.setState({ exams: responseData.data.exams })
    console.log(responseData)
  }

  componentDidUpdate() {
    if (this.props.currentUser === null) {
      this.props.history.push('/login')
    }
  }

  showData = (e, userInformation) => {
    this.setState({ userInformation: userInformation })
  }
}

const mapState = (state, props) => {
  return {
    currentUser: state.currentUser
  }
}

const mapDispatch = (dispatch) => {
  return {

  }
}

export default connect(mapState, mapDispatch)(Profile)
