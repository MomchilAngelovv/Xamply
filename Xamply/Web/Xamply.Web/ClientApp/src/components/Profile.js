import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'

class Profile extends React.Component {
  render() {
    return (
      this.renderUserProfile()
    );
  }

  renderUserProfile = () => {
    if (this.props.currentUser === null) {
      return <div>Please login to view your profile information</div>
    }

    const { email, id, accessToken } = this.props.currentUser;
    return (
      <div>
        <div>{email}</div>
        <div>{id}</div>
        <div>{accessToken}</div>
      </div>
    )
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
