import { useState, useEffect } from 'react'
import phoneService from './services/phones'

const DisplayFilter = ({persons, filters, deletePerson}) => {
  const filter = filters.toLowerCase()
  if (filter !== '') {
    return (
        <ul>
        {
        persons
          .filter(person => person.name.toLowerCase().includes(filter) && filter !== "")
          .map(person => (
            <li key={person.id}>{person.name} {person.number} <button onClick={() => deletePerson(person.id)}>delete</button></li>
          ))
          
        }
        </ul>
    )
  }
  // 
  return (
    <ul>
    {
    persons
      .map(person => (
        <li key={person.id}>{person.name} {person.number} <button onClick={() => deletePerson(person.id)}>delete</button></li>
      ))
    }
    </ul>
  )

}

const Filter = (props) => {
  return (
    <div>
        filter shown with <input value={props.value} onChange={props.filter}></input>
    </div>
  )
    
}

const Form = ({newName, newNumber, handleSubmit, handleInputchange}) => {
  return(
    <form onSubmit={handleSubmit}>
        <div>
          name: <input id="name" value={newName} onChange={handleInputchange}/>
        </div>
        <div>
          number: <input id="num" value={newNumber} onChange={handleInputchange}></input>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
    </form>
  )
}

const App = () => {

  const [persons, setPersons] = useState([])
  var resuseable = []

  useEffect(() => {
    console.log("effect")
    phoneService.getAll().then(persons => {
          console.log("promise done")
          setPersons(persons)
         })
  }, [])

  const [newName, setNewName] = useState('')
  const [newNumber, setnewNumber] = useState('')
  const [newNameFilter, setNewNameFilter] = useState('')

  const handleInputchange = (event) => {
    if (event.target.id === "num")
      setnewNumber(event.target.value)
    else if (event.target.id === "name"){
      console.log(event.target.value)
      setNewName(event.target.value)
    }
  }

  const deletePerson = (id) => {
    confirm("are you sure you want to delete")
    const deletePersonHelper = (id) => {
      phoneService.remove(id).then(() => {
        resuseable.push(id)
        setPersons(persons.filter(person => person.id !== id))
      })
    }
    return deletePersonHelper(id)
  }

  const handleFilter = (event) => {
    setNewNameFilter(event.target.value)
  }


  const handleSubmit = (event) => {

    event.preventDefault()
    var person = persons.find(person => person.name === newName)
    if (person) {
      confirm(newName + " is already in phonebook, wanna update to new number?")
      const newPerson = { ...person, number: newNumber}
      phoneService.update(person.id, newPerson).then(
        updatedPerson => {
          setPersons(persons.map(p => p.id !== person.id ? p : updatedPerson))
        }
      )
    }
    console.log(resuseable)
    var newId = 0
    if (resuseable.length > 0) {
      newId = resuseable.shift()
    }
    else {
      newId = persons.length > 0 ? Math.max(...persons.map(p => parseInt(p.id))) + 1 : 1;
    }
    const newPerson = {name: newName, number: newNumber, id: newId.toString()}
    

    phoneService.create(newPerson).then(
      returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setnewNumber('')
      }
    )
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter value={newNameFilter} filter={handleFilter}></Filter>

      <h2>Add new person</h2>
      <Form newName={newName} newNumber={newNumber} handleSubmit={handleSubmit} handleInputchange={handleInputchange}></Form>

      <h2>Numbers</h2>
      <ul>
        <DisplayFilter persons={persons} filters={newNameFilter} deletePerson={deletePerson}></DisplayFilter>
      </ul>
    </div>
  )
}

export default App