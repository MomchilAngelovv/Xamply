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

  handleAnswer = async (e, questionId, answerText) => {

    this.state.answers.push({ questionId, answerText });
    const currentQuestionIndex = this.state.exam.questions.indexOf(this.state.currentQuestion);

    console.log(currentQuestionIndex, this.state.exam.questionCount - 1)
    if (currentQuestionIndex === this.state.exam.questionCount - 1) {
      const data = {
        examId: this.state.exam.id,
        answers: this.state.answers
      }

      const response = await fetch(`https://localhost:44312/exams/finish`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.props.currentUser.accessToken}`
        },
        body: JSON.stringify(data)
      })

      if (response.status !== 200) {
        return;
      }

      const responseData = await response.json()

      this.props.history.push({
        pathname: '/examfinish',
        state: {
          questionCount: this.state.exam.questionCount,
          correctAnswers: responseData.data.correctAnswers
        },
      });

      this.setState({
        exam: null,
        currentQuestion: null,
        answers: []
      })

      return;
    }

    const nextQuestionIndex = currentQuestionIndex + 1
    this.setState({ currentQuestion: this.state.exam.questions[nextQuestionIndex] })
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
