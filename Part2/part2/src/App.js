import { useState } from 'react'
import Note from './components/Note'

const App = (props) => {
  const [notes, setNotes] = useState(props.notes);
  const [showAll, setShowAll] = useState(true);
  const [newNote, setNewNote] = useState(
    'a new note...'
  );

  const notesToShow = showAll ? notes : notes.filter(note => note.important)

  const addNote = (event) => {
    event.preventDefault();
    let noteObject = {
      content: newNote,
      date: new Date().toISOString,
      important: Math.random() < 0.5,
      id: notes.length + 1
    };

    let newNotes = notes.concat(noteObject);
    setNotes(newNotes);
    setNewNote('a new note...')
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
          <Note key={note.id} note={note} />
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