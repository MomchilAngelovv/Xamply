import React from 'react';
import { connect } from 'react-redux'

class Dashboard extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      questionCount: 0,
      categories: []
    }
  }

  render() {
    return (
      <React.Fragment>
        <h1 className="center-align">Choose category:</h1>
        <input onChange={(e) => this.handleInputChange(e)} name="questionCount" type="number" placeholder="Enter question numbers:" className="validate" />
        {this.renderCategories()}
      </React.Fragment>
    );
  }

  async componentDidMount() {
    if (this.props.currentUser === null) {
      this.props.history.push('/login')
    }

    const responseData = await (await fetch('https://localhost:44312/categories')).json()
    this.setState({ categories: responseData.categories })
  }

  componentDidUpdate() {
    if (this.props.currentUser === null) {
      this.props.history.push('/login')
      return;
    }
  }

  handleInputChange = (e) => {
    this.setState({ questionCount: e.target.value })
  }

  renderCategories = () => {
    if (this.state.categories.length === 0) {
      return <div>Loading</div>
    }

    return (
      <div className="row">
        {this.state.categories.map(c =>
          <div key={c.id} className="col s6">
            <div className="card blue-grey darken-1">
              <div className="card-content white-text">
                <span className="card-title">{c.value}</span>
                <p>
                  <label>
                    <input name="difficulty" type="radio" className="with-gap" value="Easy" />
                    <span>Easy</span>
                  </label>
                  <br />
                  <label>
                    <input name="difficulty" type="radio" className="with-gap" value="Medium" />
                    <span>Medium</span>
                  </label>
                  <br />
                  <label>
                    <input name="difficulty" type="radio" className="with-gap" value="Hard" />
                    <span>Hard</span>
                  </label>
                </p>
              </div>
              <div className="card-action">
                <button onClick={(e) => this.startExam(e, c.value)} >Start test</button>
              </div>
            </div>
          </div>)}
      </div>
    )
  }

  startExam = async (e, categoryValue) => {
    if (this.props.currentUser == null) {
      this.props.history.push('/login')
      return;
    }

    const data = {
      questionCount: Number(this.state.questionCount),
      difficultyValue: document.querySelector("input[name=difficulty]:checked").value,
      categoryValue,
    }

    const response = await fetch("https://localhost:44312/exams", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.props.currentUser?.accessToken}`
      },
      body: JSON.stringify(data)
    });

    if (response.status !== 200) {
      return;
    }

    const responseData = await response.json();
    this.props.history.push(`/exam/${responseData.examId}`)
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

export default connect(mapState, mapDispatch)(Dashboard)
