import { useState } from "react"
import { init, tx, id } from '@instantdb/react'
import { Cursors } from '@instantdb/react'

import Persons from './components/Persons'
import PersonForm from './components/PersonForm'

// ID for app: explore
const APP_ID = '45ce43b7-80b2-43f1-b3b2-d712154ab982'
const db = init({ appId: APP_ID })
const room = db.room()

function InstantApp() {
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')

  // Read Data
  const { isLoading, error, data } = db.useQuery({ persons: {} })
  if (isLoading) {
    return <div>Fetching data...</div>
  }
  if (error) {
    return <div>Error fetching data: {error.message}</div>
  }
  const { persons } = data
  // Write Data
  // ---------
  function addPerson(name, number) {
    db.transact(
      tx.persons[id()].update({
        name,
        number
      })
    )
  }
  function deletePerson(person) {
    return db.transact(tx.persons[person.id].delete())
  }

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)

  const handleSubmit = (event) => {
    event.preventDefault()
    addPerson(newName, newNumber)
    setNewName('')
    setNewNumber('')
  }

  const handlePersonDelete = (person) => {
    console.log(person)
    if (window.confirm("Delete " + person.name)) {
      deletePerson(person)
    }
  }

  return (
    <Cursors room={room} currentUserColor="tomato">
      <div>
        <h1>Phonebook</h1>
        <h2>Add a new</h2>
        <PersonForm
          newName={newName}
          newNumber={newNumber}
          onNameChange={handleNameChange}
          onNumberChange={handleNumberChange}
          onSubmit={handleSubmit}
        />
        <h2>Numbers</h2>
        <Persons persons={persons} onPersonDelete={handlePersonDelete} />
      </div>
    </Cursors>
  )
}

export default InstantApp
