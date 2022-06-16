const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const app = express()

app.use(express.json())
app.use(morgan())
app.use(cors())
app.use(express.static('build'))
let phonebook = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/info', (request, response) => {
    const date = new Date()
    const test = new Intl.DateTimeFormat('en-GB', { dateStyle: 'full', timeStyle: 'long' }).format(date)
    const zone = Intl.DateTimeFormat().resolvedOptions().timeZone
    response.send(`<p>Phonebook has info for ${phonebook.length} people</p><p>${test} (${zone})</p>`)
    
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = phonebook.find(person => person.id === id)
    if (person)
        response.json(person)
    else 
        response.status(404).end()
})

app.get('/api/persons',(resquest, response) => {
    response.json(phonebook)
})

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

app.post('/api/persons', (request, response) => {e
    const body = request.body
    if (body.name === "" || body.number === "")
        return response.status(404).json({
            error: "content missing"
        })
    if (phonebook.find(x => x.name === String(body.name)))
        return response.status(404).json({
            error: "name must be unique"
        })
    const person = {
        id: getRandomInt(10000),
        name: body.name,
        number: body.number
    }
    phonebook = phonebook.concat(person)
    response.json(body)
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    phonebook = phonebook.filter(person => person.id !== id)
    response.status(204).end()
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () =>{
    console.log(`Running on ${PORT}`)
})