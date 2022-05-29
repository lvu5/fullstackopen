const Header = (props) => { 
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}

const Part = (props) => {
  return (
    <p> {props.part + " " + props.exercises} </p>
  )
}

const Content = (props) => {
  const {course} = props
  return (
    <div>
      {course.parts.map(part => 
        <Part key={part.id} part = {part.name} exercises = {part.exercises}/>
      )}
      <Total parts={course.parts}/>
    </div>
  )
}

const Total = (props) => {
  const {parts} = props;
  const exercises = parts.map(e => e.exercises)
  const sum = exercises.reduce(
    (prev, cur) => prev + cur, 0
  )
  return (
    <div>
      <p><b> Number of exercises {sum} </b></p>
    </div>
  )
}

const Course = (props) => {
  const {course} = props
  return (
    <div>
      {course.map(c => {
        return (
        <div key = {c.id}>
          <Header course={c.name} />
          <Content course= {c}/>
        </div>
        )
      }
      )}
      {/* <Header course={course.name} />
      <Content course = {course}/> */}
    </div>
  )
}

const App = () => {
const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return <Course course={courses} />
}

export default App