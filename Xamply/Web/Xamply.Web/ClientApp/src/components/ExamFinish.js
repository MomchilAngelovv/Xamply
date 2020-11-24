import React from 'react';
import { connect } from 'react-redux'

class ExamFinish extends React.Component {
  render() {
    const { questionCount, correctAnswers } = this.props.location.state
    return (
      <h2>Result: {correctAnswers} / {questionCount}. Check profile page for more information</h2>
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

export default connect(mapState, mapDispatch)(ExamFinish)
