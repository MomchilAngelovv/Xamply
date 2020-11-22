import React from 'react';
import { connect } from 'react-redux'

class Profile extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      data: null,
    }
  }

  render() {
    return (
      <div className="row">
        <div className="col s12">
          <ul className="tabs">
            <li className="tab col s3"><button onClick={(e) => this.showData(e, this.props.currentUser.id)}>Id</button></li>
            <li className="tab col s3"><button onClick={(e) => this.showData(e, this.props.currentUser.email)} className="active">Email</button></li>
            <li className="tab col s3"><button onClick={(e) => this.showData(e, this.props.currentUser.accessToken)}>Access token</button></li>
          </ul>
        </div>
        <div className="col s12">{this.state.data}</div>
      </div>
    );
  }

  componentDidUpdate() {
    if (this.props.currentUser === null) {
      this.props.history.push('/login')
    }
  }

  showData = (e, data) => {
    this.setState({ data: data })
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
