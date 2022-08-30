const mongoose = require('mongoose');

const url = process.env.MONGODB_URI;

console.log('connecting to ', url);

mongoose.connect(url)
    .then(r => {
        console.log('connected to MongoDB');
    })
    .catch(err => {
        console.log('failed to connect to MongoDB: ', err.message);
    })

const schema = new mongoose.Schema({
    name: String,
    number: String
});

schema.set('toJSON', {
    transform: (doc, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
})

module.exports = mongoose.model('Person', schema);