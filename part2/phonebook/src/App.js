import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas",
      number: "040-1234567"  
    }
  ]);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("")

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
  return (
    <div>
      <h2>Phonebook</h2>
      
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

      <div>
          {persons.map(p => 
          <p key={p.name}>{p.name} {p.number}</p>)}
      </div>
    </div>
  );
};

export default App;
