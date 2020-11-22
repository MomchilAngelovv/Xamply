import React from 'react';
import { connect } from 'react-redux'

class Dashboard extends React.Component {
  render() {
    return (
      <h2>Thanks for doing the test you can check results in profile page</h2>
    )
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

export default connect(mapState, mapDispatch)(Dashboard)
