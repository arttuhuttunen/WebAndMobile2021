import React from 'react';

const Reminder = (props) => {
    return (
        <div>
            <li> {new Date(props.reminder.timestamp).toLocaleString()} {props.reminder.name}</li>
        </div>
    )
}

const Form = (props) => {
    return (
        <div>
            <h2>Add Reminder</h2>
            <form onSubmit={props.addReminder}>
                <div>
                    Name: <input value={props.state.newName} onChange={props.handleNameChange}/>
                </div>
                <div>
                    Date: <input type="datetime-local" value={props.state.newTimestamp} onChange={props.handleDateTimeChange}/>
                </div>
                <div>
                    <button type="submit">Add</button>
                </div>
            </form>
        </div>
    )
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      reminders: [
        {
          name: 'Buy some eggs',
          timestamp: "2018-11-10T13:00:00.141Z"
        }
      ],
      newName: '',
      newTimestamp: ''
    }
  }

  handleNameChange = (event) => {
    this.setState({newName: event.target.value})
  }

  handleDateTimeChange = (event) => {
    this.setState({newTimestamp: event.target.value})
  }

  addReminder = (event) => {
    event.preventDefault()
    if (!this.state.reminders.map(reminder => reminder.name).includes(this.state.newName)) {
        const reminder = {
            name: this.state.newName,
            timestamp: this.state.newTimestamp
        }
        const reminders = this.state.reminders.concat(reminder)
        this.setState({
            reminders: reminders,
            newName: '',
            newTimestamp: ''
        })
    } else {
        alert("Reminder '" + this.state.newName + "' already exists.")
    }
  }

  render() {
    return (
      <div>
        <Form addReminder={this.addReminder} state={this.state} handleNameChange={this.handleNameChange} handleDateTimeChange={this.handleDateTimeChange}/>
        <h2>Reminders:</h2>
        {this.state.reminders.map(reminder => <Reminder reminder={reminder} key={reminder.name}/>)}
      </div>
    )
  }
}

export default App
