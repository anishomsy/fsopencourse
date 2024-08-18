import { useState } from "react";
import Note from "./components/Note";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [showAll, setShowAll] = useState(true);

  function addNote(e) {
    e.preventDefault();
    const newNoteObject = {
      content: newNote,
      important: Math.random() < 0.5,
      id: String(notes.length + 1),
    };
    setNotes(notes.concat(newNoteObject));
    setNewNote("");
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
          return <Note key={note.id} note={note} />;
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
