import { useState } from "react";
import PropTypes from "prop-types";
const LoginForm = ({ userLoginData }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = (e) => {
    e.preventDefault();
    userLoginData({
      username: username,
      password: password,
    });
    setUsername("");
    setPassword("");
  };

  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
};
LoginForm.propTypes = {
  userLoginData: PropTypes.func.isRequired,
};
export default LoginForm;
