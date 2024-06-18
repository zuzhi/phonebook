import { useState } from "react"

import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'

function App() {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filtered, setFiltered ] = useState(persons)
  const [ q, setQ ] = useState('')

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
