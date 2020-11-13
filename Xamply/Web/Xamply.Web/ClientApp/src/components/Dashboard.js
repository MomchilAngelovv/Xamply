import React from 'react';
import { connect } from 'react-redux'

class Dashboard extends React.Component {
  renderCategories = () => {
    if (this.props.categories.length === 0) {
      return <div>Loading</div>
    }

    return this.props.categories.map(category =>
      <div className="row">
        <div className="col s12 m6">
          <div className="card blue-grey darken-1">
            <div className="card-content white-text">
              <span className="card-title">{category.name}</span>
              <p>
                <label>
                  <input name="category-difficult" type="radio" className="with-gap" />
                  <span>Eazy</span>
                </label>
                <br />
                <label>
                  <input name="category-difficult" type="radio" className="with-gap" />
                  <span>Medium</span>
                </label>
                <br />
                <label>
                  <input name="category-difficult" type="radio" className="with-gap" />
                  <span>Hard</span>
                </label>
              </p>
            </div>
            <div className="card-action">
              <button>Start test</button>
              <button>Pin this category for later</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <React.Fragment>
        <h1>Choose category:</h1>
        {this.renderCategories()}
      </React.Fragment>
    );
  }
}

function attachProps(state, props) {
  return {
    categories: state.categories
  }
}

export default connect(attachProps)(Dashboard)
