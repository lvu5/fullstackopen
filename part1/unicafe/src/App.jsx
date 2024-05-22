import { useState } from 'react'

const Button = (props) => (
  <button onClick={props.onClick}>
    {props.text}
  </button>
)

const StatisticLine = (props) => {
  if (props.text === "positive")
    return(
      <p>{props.text} {props.val} %</p>
    )
  else
    return (
      <p>{props.text} {props.val}</p>
  )
    
}

const Statistics = (props) => {
  return (
    <div>
      <StatisticLine text="good" val={props.good}/>
      <StatisticLine text="neutral" val={props.neutral}/>
      <StatisticLine text="bad" val={props.bad}/>
      <StatisticLine text="all" val={props.all}/>
      <StatisticLine text="average" val={props.score/props.all}/>
      <StatisticLine text="positive" val={props.good/props.all}/>
    </div>

  )

}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [score, setScore] = useState(0)
  const handleClick = (s) => () => {
    if (s === 'good'){
      const new_good = good + 1
      const new_score = score + 1
      setGood(new_good)
      const new_all = new_good + neutral + bad
      setAll(new_all)
      setScore(new_score)
      
    } else if (s === 'neutral') {
      const new_neutral = neutral + 1
      const new_score = score + 0
      setNeutral(new_neutral)
      const new_all = good + new_neutral + bad
      setAll(new_all)
    } else if (s === "bad") {
      const new_bad = bad + 1
      const new_score = score + -1
      setScore(new_score)
      setBad(new_bad)
      const new_all = good + neutral + new_bad
      setAll(new_all)
      setScore(new_score)
    }
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={handleClick('good')} text="good"></Button>
      <Button onClick={handleClick('neutral')} text="neutral"></Button>
      <Button onClick={handleClick('bad')} text="bad"></Button>
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} all={all} score={score}/>
    </div>
  )
}

export default App