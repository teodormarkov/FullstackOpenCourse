const mongoose = require('mongoose');
let phonename;
let phonenumber;

if (process.argv.length < 3) {
    console.log('Please provide a password');
    process.exit(1);
} else if (process.argv.length > 3 && process.argv.length < 5) {
    console.log('You are trying to create a new number but you forgot to specify either name or phonenumber');
} else if (process.argv.length > 4) {
    phonename = process.argv[3];
    phonenumber = process.argv[4];

}

const password = process.argv[2];

const url = `mongodb+srv://tmarkov:${password}@cluster0.kgd6brs.mongodb.net/Phonebook?retryWrites=true&w=majority`

const scheme = new mongoose.Schema({
    name: String,
    number: String
});

const Person = mongoose.model('Person', scheme);

mongoose.connect(url)
    .then((result) => {
        if (!phonenumber) {
            console.log('phonebook:')
            Person.find({}).then((r) => {
                r.forEach(p => { console.log(p.name + ' ' + p.number) })
                mongoose.connection.close();
            })
        } else {
            const person = new Person({
                name: phonename,
                number: phonenumber
            })
            person.save().then(() => {
                console.log(`added ${phonename} number ${phonenumber} to phonebook`)
                mongoose.connection.close();
            })
        }
    })
    .catch((err) => {
        console.log(err);
    })