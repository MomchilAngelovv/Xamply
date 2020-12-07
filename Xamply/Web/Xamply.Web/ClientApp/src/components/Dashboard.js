import React from 'react';
import { connect } from 'react-redux'
import { Col, Row, Card, CardImg, CardText, CardBody, CardTitle, Button, Input, Label } from 'reactstrap';

class Dashboard extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      questionCount: 1,
      categories: []
    }
  }

  render() {
    return (
      <React.Fragment>
        <Row>
          <Col>
            <Label>Question count</Label>
          </Col>
          <Col>
            <Input onChange={(e) => this.handleInputChange(e)} value={this.state.questionCount} name="questionCount" type="number" placeholder="Enter question numbers:" />
          </Col>
        </Row>
        <h1 className="text-center">Choose category:</h1>
        {this.renderCategories()}
      </React.Fragment>
    );
  }

  async componentDidMount() {
    if (this.props.currentUser === null) {
      this.props.history.push('/login')
      return;
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
      <Row>
        {this.state.categories.map(c =>
          <Col>
            <Card key={c.id}>
              <CardImg top src={c.imageUrl} alt="Card image cap" className="img-fluid img-thumbnail"/>
              <CardBody>
                <CardTitle tag="h5">{c.value}</CardTitle>
                <CardText>
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
                </CardText>
                <Button onClick={(e) => this.startExam(e, c.value)} >Start test</Button>
              </CardBody>
            </Card>
          </Col>
        )}
      </Row>
    )
  }

  startExam = async (e, categoryValue) => {
    if (this.props.currentUser === null) {
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
        'Authorization': `Bearer ${this.props.currentUser.accessToken}`
      },
      body: JSON.stringify(data)
    });

    if (response.status !== 200) {
      return;
    }

    const responseData = await response.json();
    this.props.history.push(`/exam/${responseData.data.examId}`)
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
