const Helo = (props) => {
  console.log(props)
  return (
    <div>
      <p>Hello {props.name}, you are {props.age} years old</p>
    </div>
  )
}
const App = () => {
  const name = 'Peter'
  const age = 10
  return (
    <div>
      <h1>Greetings</h1>
      <Helo name="Linh" age={26 + 10}/>
      <Helo name="name" age={age}/>
    </div>
  )
}

export default App