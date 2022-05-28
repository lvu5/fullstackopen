import { useState } from 'react'

const Button = ({ handleClick, text}) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const Stats = (props) => {
  if (props.array['all'] === 0)
    return (
      <div>
        <h1>statistic</h1>
        <p>No feedback given</p>
      </div>      
    )
  else{
    let paragraphs = []
    for(var i in props.array) {
      paragraphs.push(
        <tr>
          <td>{i}</td>
          <td>{props.array[i]}</td>
        </tr>
      )
    }
    return (
      <div>
        <h1>statistic</h1>
        <table>
          {paragraphs}
        </table>
      </div>
    )
  }
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [allClicks, setAll] = useState(0)

  const handleGoodClicks = () => {
    setGood(good + 1)
    setAll(allClicks + 1)
  } 
  const handleNeutralClicks = () => {
    setNeutral(neutral + 1)
    setAll(allClicks + 1)
  } 
  const handleBadClicks = () => {
    setBad(bad + 1)
    setAll(allClicks + 1)
  }
  let statistic = {
    'good': good,
    'neutral': neutral,
    'bad': bad,
    'all': allClicks,
    'average': (good * 1 + neutral * 0 + bad * -1) /allClicks,
    'positive': (good * 1) /allClicks * 100 + "%"
  }
  var keys = Object.keys(statistic)
  console.log(keys)
  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleGoodClicks} text='good'/>
      <Button handleClick={handleNeutralClicks} text='neutral'/>
      <Button handleClick={handleBadClicks} text='bad'/>
      
      <Stats array={statistic}/>
    </div>
  )
}

export default App