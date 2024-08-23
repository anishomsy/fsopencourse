export default function Note({ note, toggleImportance }) {
  const label = note.important ? "make not important" : "make important";
  return (
    <li className="note">
      {note.content}
      <button onClick={toggleImportance}>{label}</button>
    </li>
  );
}

export function Notification({ message }) {
  if (message === null) {
    return null;
  }

  return <div className="error">{message}</div>;
}
