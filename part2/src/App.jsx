import { useState } from "react";
import Note, { Notification } from "./components/Note";
import { useEffect } from "react";
import noteService from "./services/notes";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    noteService.getAll().then((data) => setNotes(data));
  }, []);

  function toggleImportanceOf(id) {
    const note = notes.find((n) => {
      return n.id === id;
    });
    const changedNote = { ...note, important: !note.important };
    noteService
      .update(id, changedNote)
      .then((data) => {
        setNotes(
          notes.map((n) => {
            return n.id !== id ? n : data;
          }),
        );
      })
      .catch((error) => {
        setErrorMessage(`the note ${note.content} was deleted from the server`);
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
        // alert(`the note ${note.content} was deleted from the server`);
        setNotes(notes.filter((n) => n.id !== id));
      });
  }

  function addNote(e) {
    e.preventDefault();

    const newNoteObject = {
      content: newNote,
      important: Math.random() < 0.5,
    };
    noteService.create(newNoteObject).then((data) => {
      setNotes(notes.concat(data));
      setNewNote("");
    });
  }

  function handleNoteChange(e) {
    setNewNote(e.target.value);
  }

  const notesToShow = showAll
    ? notes
    : notes.filter((note) => note.important === true);

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      <div>
        <button
          onClick={() => {
            setShowAll(!showAll);
          }}
        >
          Show {showAll ? "important" : "all"}
        </button>
      </div>
      <ul>
        {notesToShow.map((note) => {
          return (
            <Note
              key={note.id}
              toggleImportance={() => {
                toggleImportanceOf(note.id);
              }}
              note={note}
            />
          );
        })}
        {/* {notes.map((note) => ( */}
        {/*   <Note key={note.id} note={note} /> */}
        {/* ))} */}
      </ul>
      <form onSubmit={addNote}>
        <input type="text" value={newNote} onChange={handleNoteChange} />
        <button type="submit">add note</button>
      </form>
    </div>
  );
};

export default App;
