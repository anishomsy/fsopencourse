const dotenv = require("dotenv");
dotenv.config();

const password = process.env.dbPassword;
if (!password) {
  console.log("Password not found in env");
  return;
}

console.log(password);
