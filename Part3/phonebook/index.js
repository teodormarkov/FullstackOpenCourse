require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const Person = require('./models/person')

const app = express();

//#region Middlewares and others
app.use(cors());
app.use(express.json());
app.use(express.static('build'));
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
<div>Phonebook has info for ${persons.length} people</div>
<div>${new Date().toUTCString()}</div>
`

app.get('/api/persons', (request, response) => {
    Person.find({}).then((people) => {
        response.json(people);
    })
})

app.get('/api/persons/:id', (request, response) => {
    Person.findById(request.params.id).then((person) => {
        response.json(person);
    })
})
//#endregion

//#region POST requests
app.post('/api/persons', (request, response) => {
    let body = request.body;

    if (!body.name || !body.number) {
        return response.status(400)
            .json({ error: 'Both Name and number are required' });
    }

    const person = new Person({
        name: body.name,
        number: body.number
    })
    
    person.save().then((newPerson) => {
        console.log(`added ${body.name} number ${body.number} to phonebook`)
        response.json(newPerson);
    })
})

// currently not used
// const checkIfExists = (name) => {
//     return Person.find({ name: name }).then((person) => {
//         if (person) return true;
//         else return false;
//     })
// }
//#endregion

//#region DELETE requests
app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id);
    persons = persons.filter(p => p.id !== id);

    response.status(204).end(`Person with id ${id} was deleted if it existed`);
})
//#endregion

const PORT = process.env.PORT || 3001;
app.listen(PORT);
console.log(`Server is listening on port ${PORT}`);