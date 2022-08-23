const express = require('express');
const morgan = require('morgan');
const app = express();

//#region Middlewares and others
app.use(express.json());
morgan.token('body', request => {
    return JSON.stringify(request.body);
});
app.use(morgan(":method :url :status :res[content-length] - :response-time ms", {
    skip: function (req, res) { return req.method !== 'GET' }
}));
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :body", {
    skip: function (req, res) { return req.method !== 'POST' }
}));
//#endregion

let persons = [
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

//#region GET requests
app.get('/', (request, response) => {
    response.send('<div>Phonebook</div>')
});

app.get('/info', (request, response) => {
    response.send(info_page)
});
const info_page = `
<div>Phonebook has info for ${persons.length} people}</div>
<div>${new Date().toUTCString()}</div>
`

app.get('/api/persons', (request, response) => {
    response.json(persons);
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id);
    const person = persons.find(p => p.id === id);
    if (person) {
        response.json(person);
    } else {
        response.status(404).end('Person not found');
    }
})
//#endregion

//#region POST requests
app.post('/api/persons', (request, response) => {
    let body = request.body;

    if (!body.name || !body.number) {
        return response.status(400)
            .json({ error: 'Both Name and number are required' });
    } else if (checkIfExists(body.name)) {
        return response.status(400)
            .json({ error: 'Name already exists' });
    }

    let newPerson = {
        id: Math.floor(Math.random() * 100000),
        name: body.name,
        number: body.number
    }

    persons = persons.concat(newPerson);

    response.json(newPerson);
})

const checkIfExists = (name) => {
    let p = persons.find(p => p.name === name);
    if (p) return true;
    return false;
}
//#endregion

//#region DELETE requests
app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id);
    persons = persons.filter(p => p.id !== id);

    response.status(204).end(`Person with id ${id} was deleted if it existed`);
})
//#endregion

const PORT = 3001;
app.listen(PORT);
console.log(`Server is listening on port ${PORT}`);