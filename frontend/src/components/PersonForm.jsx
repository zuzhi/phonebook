const PersonForm = (props) => {

  return (
    <form onSubmit={props.onSubmit}>
      <div>
        name: <input name="name" type="text" value={props.newName} onChange={props.onNameChange} />
      </div>
      <div>
        number: <input name="number" type="text" value={props.newNumber} onChange={props.onNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default PersonForm
