import axios from 'axios';

const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    var all = axios.get(baseUrl)
    return all.then(response => response.data)
}

const addPerson = (person) => {
    var newperson = axios
        .post(baseUrl, person)
    return newperson.then(response =>
        response.data)
}

const deletePerson = (id) => {
    var deleted = axios
        .delete(baseUrl + "/" + id)
    return deleted.then(response => {
        return response.data
    })
}

const updatePerson = (person) => {
    let update = axios.put(baseUrl + "/" + person.id, person)
    return update.then(response => response.data);
}

export default { getAll, addPerson, deletePerson, updatePerson }