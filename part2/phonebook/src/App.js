import { useState, useEffect } from "react";
import axios from "axios";
import React from 'react';
import phoneService from "./services/phonebook.js"

const App = () => {
  const t1 = [1,2,3]
  t1.push(4)
  console.log(t1)
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("")
  const [filterValue, setFilterValue] = useState("")
  
  useEffect(() => {
    console.log("effect")
    phoneService.getAll().then(data =>{
      console.log("promise fullfiled")
      setPersons(data)
    })
  }, [])
  
  const deleteName = (event) => {
    event.preventDefault();
    phoneService.deleteObject(event.target.getAttribute("realkey")).then(r => {
      setPersons(persons.filter(item => item.id != event.target.getAttribute("realkey")))
    })
  }

  const addName = (event) => {
    event.preventDefault();
    const newNameObject = {
      name: newName,
      number: newNumber
    }
    const arr = persons.map(p => p.name)

    if (!arr.includes(newName)){
      // setPersons(persons.concat(newNameObject)) 
      // without server
      // with server, we are not triggering the state directly 
      // but after posting it then we are doing it
      // axios.post("http://localhost:3001/persons", newNameObject)
      //   .then(r => {
      //     setPersons(persons.concat(r))
      //     setNewName("")
      //     setNewNumber("")
      //   })
      phoneService.create(newNameObject).then(returnedNote => {
        setPersons(persons.concat(returnedNote))
        setNewName("")
        setNewNumber("")
      })
      // phoneService.create(newNameObject).then(object => {
      //   setPersons(persons.concat(object))
      //   setNewName("")
      //   setNewNumber("")
      // })
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
      <div>
        
      </div>

      <h2>Numbers</h2>
          {namesToShow.map(p => {
            return(
              <div key={p.id}>
                <p>{p.name} {p.number+" "} <button key={p.id} realkey={p.id} onClick={deleteName}>delete</button></p>
              </div>
              )
            })
          }
    </div>
  );
};

export default App;

