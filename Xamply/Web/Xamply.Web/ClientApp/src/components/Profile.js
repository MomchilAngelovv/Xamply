import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { Button } from 'reactstrap';

class Profile extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      userData: null,
      myExams: []
    }
  }
  render() {
    return (
      this.renderUserProfile()
    );
  }

  renderUserProfile = () => {
    if (this.props.currentUser === null) {
      return <div>Please login to view your profile information</div>
    }


    return (
      <div className="row">
        <div className="col s12">
          <ul className="tabs">
            <li className="tab col s3"><Button onClick={(event) => this.setUserData(event)} userdata="email" className="active">Email</Button></li>
            <li className="tab col s3"><Button onClick={(event) => this.setUserData(event)} userdata="id">Id</Button></li>
            <li className="tab col s3"><Button onClick={(event) => this.setUserData(event)} userdata="accessToken">Access token</Button></li>
            <li className="tab col s3"><Button onClick={(event) => this.setMyExams(event)}>My exams</Button></li>
          </ul>
        </div>
        <div className="col s12">{this.state.userData}</div>
        <ul className="collapsible">
          {this.state.myExams.map(e => {
            return (
              <li key={e.id}>
                <div className="collapsible-header">
                  <i className="material-icons">filter_drama</i>
                  {e.id} {e.category} {e.difficulty} {e.questionCount}
                  <span className="new badge">4</span></div>
                <div className="collapsible-body"><p>Lorem ipsum dolor sit amet.</p></div>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }

  setMyExams = async () => {
    const responseData = await (await fetch(`https://localhost:44312/exams`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.props.currentUser.accessToken}`
      },
    })).json();

    this.setState({ myExams: responseData.myExams })
  }

  setUserData = (event) => {
    const searchData = event.target.getAttribute("userdata")
    console.log(searchData)
    this.setState({ userData: this.props.currentUser[searchData] })
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
