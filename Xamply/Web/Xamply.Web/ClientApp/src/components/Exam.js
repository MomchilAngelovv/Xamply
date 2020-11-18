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
      <Question onQuestionAnswer={() => this.moveToNextQuestion()} question={this.getQuestion()} />
    );
  }
  moveToNextQuestion = () => {
    if (this.props.exam.questions.length === this.state.currentQuestionIndex + 1) {
      this.props.history.push("/")
      return;
    }
    this.setState({ currentQuestionIndex: this.state.currentQuestionIndex + 1})
  }

  getQuestion = () => {
    return this.props.exam.questions[this.state.currentQuestionIndex];
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
