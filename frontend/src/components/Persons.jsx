import Person from '../components/Person'

const Persons = ({ persons, onPersonDelete }) => {

  return (
    <ul>
      {
        persons.map(person =>
          <Person key={person.id} person={person} onPersonDelete={onPersonDelete} />
        )
      }
    </ul>
  )
}

export default Persons
