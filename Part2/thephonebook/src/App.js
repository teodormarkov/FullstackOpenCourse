import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import AddForm from './components/AddForm'
import Contacts from './components/Contacts'
import Message from './components/Message'
import ErrorMessage from './components/ErrorMessage'
import ContactsServices from './services/ContactsServices'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')
  const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    getAllPersons();
  }, []);

  const getAllPersons = () => {
    ContactsServices.getAll().then(contacts => {
      setPersons(contacts);
    })
  }

  const addNumber = (event) => {
    event.preventDefault();
    if (persons.find(p => p.name == newName)) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) updateNumber()
    } else if (persons.find(p => p.number == newNumber)) {
      setErrorMessage(`${newNumber} is already added to phonebook`)
      setTimeout(() => {
        setErrorMessage(null);
      }, 3000)
    } else {
      let newPerson = {
        name: newName,
        number: newNumber,
        id: persons.length + 1
      }
      ContactsServices.addPerson(newPerson)
        .then(person => {
          setPersons(persons.concat(person));
          setMessage(`Added ${newName}`)
          setTimeout(() => {
            setMessage(null);
          }, 3000)
        })
        .catch(error => {
          setErrorMessage(`Addition of ${newName} was not successful`);
          setTimeout(() => {
            setErrorMessage(null);
          }, 3000);
          getAllPersons();
        })
    }
    setNewName('');
    setNewNumber('');
  }

  const updateNumber = () => {
    let oldp = persons.find(p => p.name == newName);
    ContactsServices.updatePerson({ ...oldp, number: newNumber })
      .then((r) => {
        getAllPersons();
        setMessage(`Updated ${oldp.name}'s number`)
        setTimeout(() => {
          setMessage(null);
        }, 3000)
      })
      .catch(error => {
        setErrorMessage(`Information of ${oldp.name} has already been removed from server`)
        setTimeout(() => {
          setErrorMessage(null);
        }, 3000);
        getAllPersons();
      })
  }

  const deleteNumber = (id) => {
    let name = persons.find(p => p.id === id).name;
    if (window.confirm(`Are you sure you want to delete ${name}`)) {
      ContactsServices.deletePerson(id)
        .then((r) => {
          getAllPersons();
          setMessage(`Deleted ${name}`)
          setTimeout(() => {
            setMessage(null);
          }, 3000)
        })
        .catch(error => {
          setErrorMessage(`Information of ${name} has already been removed from server`)
          setTimeout(() => {
            setErrorMessage(null);
          }, 3000)
          getAllPersons();
        })
    }
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

      <Message message={message} />

      <ErrorMessage error={errorMessage} />

      <Filter value={search} onChange={(event) => { setSearch(event.target.value) }} />

      <h3>Add a new</h3>

      <AddForm onSubmit={addNumber} newName={newName}
        newNumber={newNumber}
        onChangeName={handleNameChange}
        onChangeNumber={handleNumberChange} />

      <h3>Numbers</h3>

      <Contacts contacts={filteredPersons} onDeletePerson={deleteNumber} />
    </div>
  )
}

export default App