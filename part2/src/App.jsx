import { useEffect, useRef, useState } from "react";
import LoginForm from "./components/Login";
import { Note, NoteForm, Notification } from "./components/Note";
import Togglable from "./components/Togglable";
import loginService from "./services/login";
import noteService from "./services/notes";
const App = () => {
  const [notes, setNotes] = useState([]);
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [user, setUser] = useState(null);
  const noteFormRef = useRef();

  useEffect(() => {
    noteService.getAll().then((data) => setNotes(data));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedNoteappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      noteService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (userLoginData) => {
    try {
      const user = await loginService.login(userLoginData);
      window.localStorage.setItem("loggedNoteappUser", JSON.stringify(user));
      noteService.setToken(user.token);
      setUser(user);
    } catch (error) {
      setErrorMessage("Wrong credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

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

  function addNote(newNoteObject) {
    noteFormRef.current.toggleVisibility();
    noteService
      .create(newNoteObject)
      .then((data) => {
        setNotes(notes.concat(data));
      })
      .catch((error) => console.log(error.response.data.error));
  }

  const loginForm = () => {
    return (
      <Togglable buttonLabel="login">
        <LoginForm userLoginData={handleLogin} />
      </Togglable>
    );
  };

  const notesToShow = showAll
    ? notes
    : notes.filter((note) => note.important === true);

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      {user === null ? (
        loginForm()
      ) : (
        <div>
          <p>{user.name} logged-in</p>
          <Togglable buttonLabel="new note" ref={noteFormRef}>
            <NoteForm createNote={addNote} />
          </Togglable>
        </div>
      )}
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
      <Togglable buttonLabel="new note" ref={noteFormRef}>
        <NoteForm createNote={addNote} />
      </Togglable>
    </div>
  );
};

export default App;
