import React from 'react';
import { connect } from 'react-redux'

class ExamQuestion extends React.Component {
  render() {
    return (
      <ul class="collection with-header">
        <li class="collection-header"><h4>First Names</h4></li>
        <li class="collection-item"><div>Alvin<button class="secondary-content"><i class="material-icons">Choose</i></button></div></li>
        <li class="collection-item"><div>Alvin<button class="secondary-content"><i class="material-icons">Choose</i></button></div></li>
        <li class="collection-item"><div>Alvin<button class="secondary-content"><i class="material-icons">Choose</i></button></div></li>
        <li class="collection-item"><div>Alvin<button class="secondary-content"><i class="material-icons">Choose</i></button></div></li>
      </ul>
    );
  }
}

const mapState = (state, props) => {
  return {
    exam: this.state.exam
  }
}

const mapDispatch = (dispatch) => {
  return {
  }
}

export default connect(mapState, mapDispatch)(ExamQuestion)
