const mongoose = require("mongoose");

const dotenv = require("dotenv");
dotenv.config();

// const password = process.env.dbPassword;
// if (!password) {
//   console.log("Password not found in env");
//   return;
// }
const url = process.env.TEST_MONGODB_URI;
if (!url) {
  console.log("Password not found in env");
  return;
}
mongoose.set("strictQuery", false);

mongoose.connect(url);

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
});

const Note = mongoose.model("Note", noteSchema);

const note = new Note({
  content: "HTML is easy",
  important: true,
});

note.save().then((result) => {
  console.log("note saved!");
  mongoose.connection.close();
});

// Note.find({ important: true }).then((results) => {
//   results.forEach((note) => {
//     console.log(note);
//   });
//   mongoose.connection.close();
// });
