import React from 'react';
import ReactDOM from 'react-dom';

const feedbackTypes = {
  GOOD:     "Good",
  NEUTRAL:  "Neutral",
  POOR:     "Poor"
}

const Button = (props) => {
  return (
    <button onClick={props.updateCounter(props.type)}>{props.type}</button>
  )
}

const Statistics = (props) => {
  if (props.state.goodCounter === 0 && props.state.neutralCounter === 0 && props.state.badCounter === 0) {
    return(
      <p>No feedback given, yet</p>
    )
  } else {
    return (
      <div>
        <h1>Statistics</h1>
        <table>
          <tbody>
            <Statistic type={feedbackTypes.GOOD} value={props.state.goodCounter}/>
            <Statistic type={feedbackTypes.NEUTRAL} value={props.state.neutralCounter}/>
            <Statistic type={feedbackTypes.POOR} value={props.state.badCounter}/>
            <Statistic type={"Average"} value={props.calculateAverage()}/>
            <Statistic type={"Positive"} value={props.calculatePositive() + " %"}/>
          </tbody>
        </table>
      </div>
    )
  }
}

const Statistic = (props) => {
  return (
    <tr>
      <td>{props.type}</td>
      <td>{props.value}</td>
    </tr>
  )
}

class App extends React.Component {
  
  constructor() {
    super()
    this.state = {
      goodCounter: 0,
      neutralCounter: 0,
      badCounter: 0
    }
  }

  updateCounter = (typeOfCounter) => {
    return () => {
      switch (typeOfCounter) {
        case feedbackTypes.GOOD:
          this.setState({goodCounter: this.state.goodCounter + 1})
          break
        case feedbackTypes.NEUTRAL:
          this.setState({neutralCounter: this.state.neutralCounter + 1})
          break
        case feedbackTypes.POOR:
          this.setState({badCounter: this.state.badCounter + 1})
          break
        // no default
      }
    }
  }

  calculateAverage = () => {
    return ((this.state.goodCounter - this.state.badCounter) / (this.state.goodCounter + this.state.neutralCounter + this.state.badCounter))
  }

  calculatePositive = () => {
    return (this.state.goodCounter / (this.state.goodCounter + this.state.neutralCounter + this.state.badCounter) * 100)
  }

  render() {
    return (
      <div>
        <h1>Give feedback</h1>

        <Button type={feedbackTypes.GOOD} updateCounter={this.updateCounter}/>
        <Button type={feedbackTypes.NEUTRAL} updateCounter={this.updateCounter}/>
        <Button type={feedbackTypes.POOR} updateCounter={this.updateCounter}/>
        <Statistics state={this.state} calculateAverage={this.calculateAverage} calculatePositive={this.calculatePositive}/>
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
