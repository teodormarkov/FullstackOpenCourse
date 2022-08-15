import { useState, useEffect } from 'react'
import Note from './components/Note'
import noteServices from './services/notes'
import axios from 'axios'

const App = () => {
  const [notes, setNotes] = useState([]);
  const [showAll, setShowAll] = useState(true);
  const [newNote, setNewNote] = useState(
    'a new note...'
  );

  useEffect(() => {
    noteServices.getAll().then(initialNotes => {
      setNotes(initialNotes);
    })
  }, [])

  const toggleImportanceOf = id => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }

    noteServices.update(id, changedNote)
      .then(updatedNote => {
        setNotes(notes.map(note => note.id !== id ? note : updatedNote))
      })
      .catch(err => {
        alert(`the note ${note.content} was already deleted from server`)
        setNotes(notes.filter(note => note.id !== id))
      })
  }

  const notesToShow = showAll ? notes : notes.filter(note => note.important)

  const addNote = (event) => {
    event.preventDefault();
    let noteObject = {
      content: newNote,
      date: new Date().toISOString,
      important: Math.random() < 0.5,
      id: notes.length + 1
    };

    noteServices.create(noteObject)
      .then(newNote => {
        setNotes(notes.concat(newNote))
        setNewNote('a new note...')
      })
  }
  const handleNoteChange = (event) => {
    setNewNote(event.target.value);
  }

  return (
    <div>
      <h1>Notes</h1>
      <button type="button" onClick={() => setShowAll(!showAll)}>
        show {showAll ? 'important' : 'all'}
      </button>
      <ul>
        {notesToShow.map(note =>
          <Note key={note.id} note={note} toggleImportance={toggleImportanceOf} />
        )}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default App 