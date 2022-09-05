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
    name: {
        type: String,
        required: true,
        minLength: 3
    },
    number: {
        type: String,
        validate: {
            validator: function (value) {
                return /\d{2,3}-\d{1,}/.test(value);
            },
            message: 'Please enter a number with format (2 or 3 digits, \'-\', rest of the digits)'
        },
        minLength: [9, "8 digits minimum"],
        required: [true, 'User phone number required'],
    }
});

schema.set('toJSON', {
    transform: (doc, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
})

module.exports = mongoose.model('Person', schema);