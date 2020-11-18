import React from 'react';
import { connect } from 'react-redux'
import Question from './Question'

class Exam extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      currentQuestionIndex: 0
    }
  }

  render() {
    return (
      <Question question={this.getNextQuestion()}/>
    );
  }

  getNextQuestion = () => {
    return this.props.exam.questions[this.state.currentQuestionIndex++];
  }
}

const mapState = (state, props) => {
  return {
    exam: state.exam
  }
}

const mapDispatch = (dispatch) => {
  return {
  }
}

export default connect(mapState, mapDispatch)(Exam)
