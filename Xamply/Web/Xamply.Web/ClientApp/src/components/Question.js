import React from 'react';
import { connect } from 'react-redux'

class Question extends React.Component {
  render() {
    const { value, answers } = this.props.question
    return (
      <ul className="collection with-header">
        <li className="collection-header"><h4>{value}</h4></li>
        {answers.map(answer => {
          return (
            <li key={answer.value} className="collection-item"><div>{answer.value}<button onClick={(event) => this.props.onQuestionAnswer(event, this.props.question.id, answer.value)} className="secondary-content"><i className="material-icons">Choose</i></button></div></li>)
        })}
      </ul>
    );
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

export default connect(mapState, mapDispatch)(Question)
