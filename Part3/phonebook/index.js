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
    Person.find({})
        .then((people) => {
            const info_page = `
            <div>Phonebook has info for ${people.length} people</div>
            <div>${new Date().toUTCString()}</div>
            `
            response.send(info_page)
        });
});

app.get('/api/persons', (request, response) => {
    Person.find({}).then((people) => {
        response.json(people);
    })
})

app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id)
        .then((person) => {
            response.json(person);
        })
        .catch((error) => next(error));
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
//#endregion

//#region DELETE requests
app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndRemove(request.params.id)
        .then((person) => {
            response.status(204).end();
        })
        .catch((error) => next(error));
})
//#endregion

//#region PUT requests
app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body;

    const person = {
        name: body.name,
        number: body.number
    }

    Person.findByIdAndUpdate(request.params.id, person, { new: true })
        .then((person) => {
            response.json(person);
        })
        .catch((error) => next(error));
});
//#endregion

const errorHandler = (error, request, response, next) => {
    console.log(error.message);

    if (error.name == 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    }

    next(error);
}

app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT);
console.log(`Server is listening on port ${PORT}`);