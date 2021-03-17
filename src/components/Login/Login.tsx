import { SyntheticEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { Routes } from '~/constants';
import login from '~/services/login';
import ErrorBlock from '../ErrorBlock';
import { validateUsername, validatePassword } from './validation';

import './login-style.scss';

const Login = () => {
  const { push } = useHistory();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<string>();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setErrorMessage(null);

    try {
      await login(username, password);
      setLoading(false);
      push(Routes.PasswordHealth);
    } catch (error) {
      setLoading(false);
      setErrorMessage(error.message);
    }
  };

  let usernameValid, usernameErrorMessage;
  // Validate inputted username
  if (username !== '') {
    const { valid, error } = validateUsername(username);
    usernameValid = valid;
    usernameErrorMessage = error;
    // Blank username is not valid
  } else {
    const usernameValid = false;
    const usernameErrorMessage = '';
  }

  let passwordValid, passwordErrorMessage;
  // Validate inputted password
  if (password !== '') {
    const { valid, error } = validatePassword(password);
    passwordValid = valid;
    passwordErrorMessage = error;
    // Blank password is not valid
  } else {
    passwordValid = false;
    passwordErrorMessage = '';
  }

  return (
    <div className="login-page">
      <form className="login-form" onSubmit={handleSubmit}>
        <h1 className="text-center">Password Health</h1>
        <input
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          placeholder="Username"
          type="text"
          className="input mt-52px"
        />
        <span className="mt-5px">{usernameErrorMessage}</span>
        <input
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Password"
          type="password"
          className="input mt-24px"
        />
        <span className="mt-5px">{passwordErrorMessage}</span>
        <ErrorBlock error={errorMessage} />
        <button
          type="submit"
          className="button mt-24px"
          disabled={!usernameValid || !passwordValid || loading}
        >
          Login
        </button>
        <div className="loader-container">
          <ClipLoader loading={loading} />
        </div>
      </form>
    </div>
  );
};

export default Login;
