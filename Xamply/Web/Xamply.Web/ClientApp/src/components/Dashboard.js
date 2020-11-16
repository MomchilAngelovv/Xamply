import React from 'react';
import { connect } from 'react-redux'
import { categoriesActions } from '../actions/CategoriesActions'
import { examsActions } from '../actions/ExamsActions'

class Dashboard extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      questionCount: 0
    }
  }

  render() {
    return (
      <React.Fragment>
        <h1 className="center-align">Choose category:</h1>
        <input onChange={(event) => this.setQuestionCount(event)} name="questionCount" type="number" placeholder="Enter question numbers:" className="validate" />
        {this.renderCategories()}
      </React.Fragment>
    );
  }

  setQuestionCount = (event) => {
    this.setState({ questionCount: event.target.value })
  }

  renderCategories = () => {
    if (this.props.categories.length === 0) {
      return <div>Loading</div>
    }

    return (
      <div className="row">
        {this.props.categories.map(category =>
          <div key={category.id} className="col s6">
            <div className="card blue-grey darken-1">
              <div className="card-content white-text">
                <span className="card-title">{category.value}</span>
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
                <button onClick={(event) => this.startExam(event)} categoryname={category.value}>Start test</button>
                <button>Pin this category for later</button>
              </div>
            </div>
          </div>)}
      </div>
    )
  }

  startExam = async (event) => {
    if (this.props.currentUser == null) {
      this.props.history.push('/login')
      return;
    }

    let data = {
      questionCount: Number(this.state.questionCount),
      difficultyValue: document.querySelector("input[name=difficulty]:checked").value,
      categoryValue: event.target.getAttribute("categoryname"),
    }

    const response = await fetch("https://localhost:44312/exams", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.props.currentUser?.accessToken}`
      },
      body: JSON.stringify(data)
    });
    console.log(response)

    if (response.status !== 200) {
      return;
    }

    const responseData = await response.json();
    console.log(responseData)
    this.props.newExam(responseData.exam)
    this.props.history.push('/exam')
  }

  async componentDidMount() {
    const response = await (await fetch('https://localhost:44312/categories')).json()

    console.log(response.categories)
    this.props.fetchCategories(response.categories)
  }
}

const mapState = (state, props) => {
  return {
    currentUser: state.currentUser,
    categories: state.categories
  }
}

const mapDispatch = (dispatch) => {
  return {
    fetchCategories: (categories) => dispatch(categoriesActions.fetchCategories(categories)),
    newExam: (exam) => dispatch(examsActions.newExam(exam))
  }
}

export default connect(mapState, mapDispatch)(Dashboard)
