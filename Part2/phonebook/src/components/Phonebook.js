import React from 'react'

const Phonebook = ({phonebook}) => {
    return (
        <div>
            <Header title={phonebook.name}/>
            <Contacts contacts={phonebook.contacts}/>
        </div>
    )
}

const Header = (props) => {
    return (
      <h1>{props.title}</h1>
    )
}
  
const Contacts = (props) => {
    return (
        <div>
            <table>
                <tbody>
                    {props.contacts.map(contact => <Entry key={contact.id} name={contact.name} phone={contact.phonenumber}/>)}
                </tbody>
            </table>
            <br/>
            <p>Total number of entries: {props.contacts.length}</p>
        </div>
    )
}
  
const Entry = (props) => {
    return (
        <tr>
            <td>Name: {props.name}</td>
            <td>Number: {props.phone}</td>
        </tr>
    )
}

export default Phonebook
