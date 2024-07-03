import { useEffect, useState } from "react"

import Persons from './components/Persons'
import PersonForm from './components/PersonForm'

import AV from 'leancloud-storage'
AV.init({
  appId: "gITbxeQnwacooozSej6OtP1W-MdYXbMMI",
  appKey: "B1HSnF3BhO2LdAI2rQMzdPl8",
  serverURL: "https://gitbxeqn.api.lncldglobal.com",
});

function LeanCloudApp() {
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ persons, setPersons ] = useState([])

  // Fetch Data
  useEffect(() => {
    const query = new AV.Query("Person");
    query.find().then((persons) => {
      const personArr = persons.map(p => p.toJSON())
      console.log(personArr)
      setPersons(personArr)
    });
  }, [])
  // Insert Data
  function addPerson(name, number) {
    // 声明 class
    const Person = AV.Object.extend("Person");

    // 构建对象
    const person = new Person();

    // 为属性赋值
    person.set("name", name);
    person.set("number", number);

    // 将对象保存到云端
    person.save().then(
      (person) => {
        const newPersons = persons.concat(person.toJSON())
        setPersons(newPersons)
      },
      (error) => {
        // 异常处理
        console.log(error)
      }
    );
  }
  // Delete data
  function deletePerson(person) {
    const p = AV.Object.createWithoutData("Person", person.objectId);
    p.destroy();
    const newPersons = persons.filter(p => p.objectId !== person.objectId)
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

export default LeanCloudApp
