const axios = require('axios');

const baseUrl = '/api/persons'

const getAll = () => {
    var all = axios.get(baseUrl)
    return all.then(response => response.data)
}

const addPerson = (person) => {
    return axios
        .post(baseUrl, person);
}

const deletePerson = (id) => {
    var deleted = axios
        .delete(baseUrl + "/" + id)
    return deleted.then(response => {
        return response.data
    })
}

const updatePerson = (person) => {
    return axios.put(baseUrl + "/" + person.id, person)
}

export default { getAll, addPerson, deletePerson, updatePerson }