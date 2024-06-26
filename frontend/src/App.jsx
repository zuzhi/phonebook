import { useState, useEffect } from "react"

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'

import personService from './services/persons'

function App() {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filtered, setFiltered ] = useState(persons)
  const [ q, setQ ] = useState('')
  const [ errorMessage, setErrorMessage ] = useState(null)
  const [ successMessage, setSuccessMessage ] = useState(null)

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
      name: newName,
      number: newNumber
    }

    const nameExists = persons.filter(person => person.name === newName).length > 0
    if (nameExists) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        // first find person, then update
        const person = persons.find(person => person.name === newName)
        person.number = newNumber
        personService
          .update(person.id, person)
          .then(updated => {
            const personIndex = persons.findIndex(person => person.id === updated.id)
            console.log(updated)
            if (personIndex !== -1) {
              const updatedPerson = { ...persons[personIndex], number: updated.number }
              persons[personIndex] = updatedPerson
              setNewName('')
              setNewNumber('')
              setPersons(persons)
              setFiltered(persons.filter(person => person.name.toLowerCase().indexOf(q.toLowerCase()) >= 0))

              setSuccessMessage(
                `Updated ${updated.name}`
              )
              setTimeout(() => {
                setSuccessMessage(null)
              }, 5000)
            }
          })
      }
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

        setSuccessMessage(
          `Added ${returnedPerson.name}`
        )
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
      })
      .catch(error => {
        setErrorMessage(error.response.data.error)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
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
          const newPersons = persons.filter(p => p.id !== person.id)
          setFiltered(newPersons.filter(person => person.name.toLowerCase().indexOf(q.toLowerCase()) >= 0))
          setPersons(newPersons)
        })
        .catch(error => {
          console.log(error)
          const newPersons = persons.filter(p => p.id !== person.id)
          setFiltered(newPersons.filter(person => person.name.toLowerCase().indexOf(q.toLowerCase()) >= 0))
          setPersons(newPersons)
          setErrorMessage(
            `Information of ${person.name} has already been removed from server`
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
    }
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} type='error' />
      <Notification message={successMessage} type='success' />
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
