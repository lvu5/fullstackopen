import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas" }
  ]);

  const [newName, setNewName] = useState("");

  const addName = (event) => {
    event.preventDefault();
    const newNameObject = {
      name: newName
    }
    setPersons(persons.concat(newNameObject))
  }
  const onInputChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
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
          <button type="submit">add</button>
        </div>
      </form>

      <h2>Numbers</h2>
      <div>debug: {newName}</div>
      <div>
       {persons.map(p => 
       <p>{p.name}</p>)}
      </div>
    </div>
  );
};

export default App;
