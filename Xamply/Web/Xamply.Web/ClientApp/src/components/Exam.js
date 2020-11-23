import React from 'react';
import { connect } from 'react-redux'
import Question from './Question'

class Exam extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      exam: null,
      currentQuestion: null,
      answers: []
    }
  }

  render() {
    return (
      <React.Fragment>
        {this.state.currentQuestion === null
          ? <div>Loading...</div>
          : <Question onAnswer={(e, questionId, answerText) => this.handleAnswer(e, questionId, answerText)} question={this.state.currentQuestion} />
        }
      </React.Fragment>
    );
  }

  async componentDidMount() {
    const examId = this.props.match.params.id;

    const response = await fetch(`https://localhost:44312/exams/${examId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.props.currentUser.accessToken}`
      },
    });

    let data = await response.json()
    this.setState({
      exam: data.data,
      currentQuestion: data.data.questions[0]
    })
  }

  handleAnswer = (e, questionId, answerText) => {

    console.log(e, questionId, answerText)
    //this.setState({ answers: this.state.answers.push({ questionId, answerText }) })

    //if (this.state.currentQuestion.id === this.state.exam.questions[this.state.exam.questions.length - 1]) {
    //  const data = {
    //    answers: this.state.answers
    //  }

    //  fetch(`https://localhost:44312/exams/${this.state.exam.id}/finish`, {
    //    method: 'POST',
    //    headers: {
    //      'Content-Type': 'application/json',
    //      'Authorization': `Bearer ${this.props.currentUser.accessToken}`
    //    },
    //    body: JSON.stringify(data)
    //  })

    //  this.props.history.push("/examfinish");
    //  return;
    //}

    //const nextQuestionIndex = this.state.exam.questions.indexOf(this.state.currentQuestion) + 1
    //this.setState({ currentQuestion: this.state.exam.questions[nextQuestionIndex] })
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
