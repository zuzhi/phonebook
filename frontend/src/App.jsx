import { useState, useEffect } from "react"

import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'

import axios from 'axios'

function App() {
  const [persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filtered, setFiltered ] = useState(persons)
  const [ q, setQ ] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
        setFiltered(response.data)
      })
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault()
    let person = {
      id: Math.floor(Math.random() * 100000),
      name: newName,
      number: newNumber
    }

    const nameExists = persons.filter(person => person.name === newName).length > 0
    if (nameExists) {
      alert(`${newName} is already added to phonebook`)
      return
    }

    const newPersons = persons.concat(person)
    setPersons(newPersons)
    setQ('')
    setFiltered(newPersons)
    setNewName('')
    setNewNumber('')
  }

  const handleFilter = (event) => {
    const q = event.target.value
    console.log(q)
    setQ(q)
    const filtered = persons.filter(person => person.name.toLowerCase().indexOf(q.toLowerCase()) >= 0)
    setFiltered(filtered)
  }

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter q={q} onFilter={handleFilter} />
      <h3>add a new</h3>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        onNameChange={handleNameChange}
        onNumberChange={handleNumberChange}
        onSubmit={handleSubmit}
      />
      <h2>Numbers</h2>
      <Persons persons={filtered} />
    </div>
  )
}

export default App
