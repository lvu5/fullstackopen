const express = require('express')
const morgan = require('morgan')
const app = express()

app.use(express.json())
app.use(express.static('dist'))

morgan.token('ob', function (req, res) { 
    console.log("ob", req.body)
    return `${JSON.stringify(req.body)}` 
})

app.use(morgan(':method :url :status :response-time :req[header] :ob'))


phonebooks = [
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


app.get("/api/persons", (request, response) =>{
    return response.json(phonebooks)
})

app.get("/info", (request, response) => {
    const currentDateTime = new Date();
    const element = `
    <p>Phonebook has info for ${phonebooks.length} people <br/> <p>${currentDateTime.toLocaleString()}</p> </p>
    `
    response.send(element)
})

app.get("/api/persons/:id", (request, response) =>{
    const id = Number(request.params.id)
    const person = phonebooks.find(person => person.id === id)
    if (!person) {
        response.status(404).end()
        return
    }
    response.json(person)
})

app.delete("/api/persons/:id", (request, response) => {
    const id = Number(request.params.id)
    phonebooks = phonebooks.filter(phonebook => phonebook.id !== id)
    response.json(phonebooks)
})

const generateId = () => {
    const maxId = phonebooks.length > 0
      ? Math.max(...phonebooks.map(n => n.id))
      : 0
    return maxId + 1
  }

app.post("/api/persons", (request, response) => {
    const body = request.body
    if (!body) {
        response.status(404).json({
            error: "content missing"
        })
        return
    }
    if (!body.name || !body.number) {
        response.status(404).json({
            error: "name or number is missing"
        })
        return
    }
    if (phonebooks.find(person => person.name === body.name)) {
        response.status(404).json({
            error: "name must be unique"
        })
        return
    }

    const person = {
        name: body.name,
        numnber: body.number,
        id: generateId()
    }
    
    phonebooks = phonebooks.concat(person)
    response.json(phonebooks)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})