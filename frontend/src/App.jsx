import { useState, useEffect } from "react"

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'

function App() {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filtered, setFiltered ] = useState(persons)
  const [ q, setQ ] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
        setFiltered(initialPersons)
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

    personService
      .create(person)
      .then(returnedPerson => {
        console.log(returnedPerson)
        const newPersons = persons.concat(returnedPerson)
        setPersons(newPersons)
        setQ('')
        setFiltered(newPersons)
        setNewName('')
        setNewNumber('')
      })
  }

  const handleFilter = (event) => {
    const q = event.target.value
    console.log(q)
    setQ(q)
    const filtered = persons.filter(person => person.name.toLowerCase().indexOf(q.toLowerCase()) >= 0)
    console.log(filtered)
    setFiltered(filtered)
  }

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)

  const handlePersonDelete = (person) => {
    console.log(person)
    if (window.confirm("Delete " + person.name)) {
      personService
        .deletePerson(person.id)
        .then(() => {
          const newFiltered = filtered.filter(p => p.id !== person.id)
          const newPersons = persons.filter(p => p.id !== person.id)
          setFiltered(newFiltered)
          setPersons(newPersons)
        })
    }
  }


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
      <Persons persons={filtered} onPersonDelete={handlePersonDelete} />
    </div>
  )
}

export default App
