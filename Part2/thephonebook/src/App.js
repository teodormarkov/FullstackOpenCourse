import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import AddForm from './components/AddForm'
import Contacts from './components/Contacts'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data);
      })
  }, []);

  const addPerson = (event) => {
    event.preventDefault();
    if (persons.find(p => p.name == newName)) {
      alert(`${newName} is already added to phonebook.`)
    } else if (persons.find(p => p.number == newNumber)) {
      alert(`${newNumber} is already added to phonebook.`)
    } else {
      let newPerson = {
        name: newName,
        number: newNumber,
        id: persons.length + 1
      }
      setPersons(persons.concat(newPerson));
    }
    setNewName('');
    setNewNumber('');
  }

  const filteredPersons =
    search == ''
      ? persons
      : persons.filter(p => p.name.toLowerCase().includes(search.toLowerCase()))

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter value={search} onChange={(event) => { setSearch(event.target.value) }} />

      <h3>Add a new</h3>

      <AddForm onSubmit={addPerson} newName={newName}
        newNumber={newNumber}
        onChangeName={handleNameChange}
        onChangeNumber={handleNumberChange} />

      <h3>Numbers</h3>

      <Contacts contacts={filteredPersons} />
    </div>
  )
}

export default App