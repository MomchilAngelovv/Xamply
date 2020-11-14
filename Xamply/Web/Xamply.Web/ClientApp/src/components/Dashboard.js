import React from 'react';
import { connect } from 'react-redux'
import { categoriesActions } from '../actions/CategoriesActions'

class Dashboard extends React.Component {
  render() {
    return (
      <React.Fragment>
        <h1 className="center-align">Choose category:</h1>
        {this.renderCategories()}
      </React.Fragment>
    );
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
                <span className="card-title">{category.name}</span>
                <p>
                  <label>
                    <input name="difficulty" type="radio" className="with-gap" />
                    <span>Eazy</span>
                  </label>
                  <br />
                  <label>
                    <input name="difficulty" type="radio" className="with-gap" />
                    <span>Medium</span>
                  </label>
                  <br />
                  <label>
                    <input name="difficulty" type="radio" className="with-gap" />
                    <span>Hard</span>
                  </label>
                </p>
              </div>
              <div className="card-action">
                <button>Start test</button>
                <button>Pin this category for later</button>
              </div>
            </div>
          </div>)}
      </div>
    )
  }

  async componentDidMount() {
    const response = await (await fetch('https://localhost:44312/categories')).json()

    console.log(response.categories)
    this.props.fetchCategories(response.categories)
  }
}

const mapState = (state, props) => {
  return {
    categories: state.categories
  }
}

const mapDispatch = (dispatch) => {
  return {
    fetchCategories: (categories) => dispatch(categoriesActions.fetchCategories(categories))
  }
}

export default connect(mapState, mapDispatch)(Dashboard)
