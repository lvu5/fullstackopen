import { useState, useEffect } from "react";
import axios from "axios";
import React from 'react';

const App = () => {

  const [persons, setPersons] = useState([]);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("")
  const [filterValue, setFilterValue] = useState("")
  
  useEffect(() => {
    console.log("effect")
    const promsise = axios.get("http://localhost:3001/persons")
    promsise.then(response => {
      console.log("promise fullfiled")
      setPersons(response.data)
    })
  }, [])

  const addName = (event) => {
    event.preventDefault();
    const newNameObject = {
      name: newName,
      number: newNumber
    }
    const arr = persons.map(p => p.name)

    if (!arr.includes(newName)){
      setPersons(persons.concat(newNameObject))
    }
    else
      alert(`${newName} is already added to phonebook`)

  }



  const onInputChange = (event) => {
    console.log(event.target)
    setNewName(event.target.value)
  }
  const onInputNum = (event) => {
    console.log(event.target)
    setNewNumber(event.target.value)
  }
  const onFilterChange = (event) => {
    console.log(event.target)
    setFilterValue(event.target.value)
  }

  const namesToShow = filterValue === "" ? persons : 
    persons.filter(person => person.name.toLowerCase().includes(filterValue))
  
  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with <input value={filterValue}
                                 onChange={onFilterChange}
                                 />
      </div>
      
      <form onSubmit={addName}>

        <div>
          name: <input value={newName} 
                       onChange={onInputChange}
                />
        </div>

        <div>
          number: <input value={newNumber} 
                       onChange={onInputNum}
                />
        </div>

        <div>
          <button type="submit">add</button>
        </div>
      </form>

      <h2>Numbers</h2>
          {namesToShow.map(p => 
          <p key={p.name}>{p.name} {p.number}</p>)}
    </div>
  );
};

export default App;
