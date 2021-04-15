import React from 'react';
import axios from 'axios';

const Reminder = (props) => {
    return (
        <div>
            <li> {new Date(props.reminder.timestamp).toLocaleString()} {props.reminder.name} <button onClick={event => props.deleteReminder(event, props.reminder.id, props.reminder.name)}>Delete</button> </li> 
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
      reminders: [],
      newName: '',
      newTimestamp: ''
    }
  }

  componentDidMount() {
    axios
        .get('/api/reminders')
        .then(response => {
            this.setState({reminders: response.data})
        })
  }

  handleNameChange = (event) => {
    this.setState({newName: event.target.value})
  }

  handleDateTimeChange = (event) => {
    this.setState({newTimestamp: event.target.value})
  }

  deleteReminder = (event, id, name) => {
    if (window.confirm("Are you sure you want to remove reminder: " + name))
    axios
        .delete('/api/reminders/' + id)
        .then(response => {
            this.setState({reminders: this.state.reminders.filter(reminder => reminder.id !== id)})
        })
  }

  addReminder = (event) => {
    event.preventDefault()
    if (!this.state.reminders.map(reminder => reminder.name).includes(this.state.newName)) {
        const reminder = {
            name: this.state.newName,
            timestamp: this.state.newTimestamp
        }
        axios
            .post('/api/reminders', reminder)
            .then(response => {
                this.setState({
                    reminders: this.state.reminders.concat(response.data),
                    newName: '',
                    newTimestamp: ''
                })
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
        {this.state.reminders.map(reminder => <Reminder reminder={reminder} key={reminder.name} deleteReminder={this.deleteReminder}/>)}
      </div>
    )
  }
}

export default App
