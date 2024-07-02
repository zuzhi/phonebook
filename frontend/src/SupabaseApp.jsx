import { useEffect, useState } from "react"

import Persons from './components/Persons'
import PersonForm from './components/PersonForm'

import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
const supabaseUrl = 'https://dhnazqyqdakwnotkonom.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRobmF6cXlxZGFrd25vdGtvbm9tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTk5MDU2MDUsImV4cCI6MjAzNTQ4MTYwNX0.r0sCisy1NFuRs5Zm3A2uwATlfqtAx3rI3ToOgDXDElo'
const supabase = createClient(supabaseUrl, supabaseKey)

function SupabaseApp() {
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ persons, setPersons ] = useState([])

  // Fetch Data
  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from('phonebook')
        .select()

      if (data) {
        setPersons(data)
      }

      if (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [])
  // Insert Data
  async function addPerson(name, number) {
    const { data, error } = await supabase
      .from('phonebook')
      .insert({ name: name, number: number })
      .select()
    if (error) {
      console.log(error)
    }
    const newPersons = persons.concat(data[0])
    setPersons(newPersons)
  }
  // Delete data
  async function deletePerson(person) {
    await supabase
      .from('phonebook')
      .delete()
      .eq('id', person.id)
    const newPersons = persons.filter(p => p.id !== person.id)
    setPersons(newPersons)
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
  )
}

export default SupabaseApp
