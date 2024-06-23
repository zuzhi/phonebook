const Person = ({ person, onPersonDelete }) => {

  return (
    <li>
      {person.name} {person.number} <button onClick={() => onPersonDelete(person)}>delete</button>
    </li>
  )
}

export default Person
