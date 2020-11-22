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
      <Question onQuestionAnswer={(event, questionId, answerText) => this.moveToNextQuestion(questionId, answerText)} question={this.getQuestion()} />
    );
  }

  componentDidMount() {

  }

  moveToNextQuestion = (questionId, answerText) => {
    this.props.addExamAnswer(questionId, answerText);

    if (this.props.exam.questions.length === this.state.currentQuestionIndex + 1) {
      const data = {
        answers: this.props.examAnswers
      }

      fetch("https://localhost:44312/exams/resultsCheck", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.props.currentUser.accessToken}`
        },
        body: JSON.stringify(data)
      })

      this.props.history.push("/examfinish");
      return;
    }

    this.setState({ currentQuestionIndex: this.state.currentQuestionIndex + 1 })
  }

  getQuestion = () => {
    return this.props.exam.questions[this.state.currentQuestionIndex];
  }
}

const mapState = (state, props) => {
  return {
    currentUser: state.currentUser,
  }
}

const mapDispatch = (dispatch) => {
  return {
  }
}

export default connect(mapState, mapDispatch)(Exam)
