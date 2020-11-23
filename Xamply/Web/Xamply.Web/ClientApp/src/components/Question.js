import React from 'react';
import { connect } from 'react-redux'
import { ListGroup, ListGroupItem } from 'reactstrap';

class Question extends React.Component {
  render() {
    const { value, answers } = this.props.question
    return (
      <div className="row justify-content-center">
        <div className="col-md-9 col-sm-12">
          <h2 className="text-center">{value}</h2>
          <ListGroup>
            {answers.map(answer =>
              <ListGroupItem key={answer.value}>{answer.value} <button onClick={(e) => this.props.onAnswer(e, this.props.question.id, answer.value)} className="secondary-content">Choose</button></ListGroupItem>
            )}
          </ListGroup>
        </div>
      </div>
    );
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

export default connect(mapState, mapDispatch)(Question)
