import React from 'react';
import { connect } from 'react-redux'
import { Table,Alert } from 'reactstrap';

class Rankings extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tableRow: 1,
      userRankings: []
    }
  }

  render() {
    return (
      <React.Fragment>
        <h1 className="text-center">Rankings:</h1>
        {this.state.userRankings.length > 0 &&
          <Table hover dark>
            <thead>
              <tr>
                <th>#</th>
                <th>Email</th>
                <th>Average score</th>
              </tr>
            </thead>
            <tbody>
              {this.state.userRankings.map(ur => (
                <tr>
                  <th scope="row">{this.state.tableRow++}</th>
                  <td>{ur.email}</td>
                  <td>{ur.averageScore}</td>
                </tr>
              ))}
            </tbody>
          </Table>}

        {this.state.userRankings.length == 0 &&
          <Alert color="warning">
            Loading..
        </Alert>}

      </React.Fragment>
    );
  }

  async componentDidMount() {
    const response = await fetch("https://localhost:44312/exams/rankings", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status !== 200) {
      return;
    }

    const responseData = await response.json();
    this.setState({ userRankings: responseData.data.userRankings })
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

export default connect(mapState, mapDispatch)(Rankings)
