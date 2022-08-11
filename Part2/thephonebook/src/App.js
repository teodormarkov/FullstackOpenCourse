import { useState } from 'react'
import Filter from './components/Filter'
import AddForm from './components/AddForm'
import Contacts from './components/Contacts'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')

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