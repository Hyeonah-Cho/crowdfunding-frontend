import { useEffect, useState } from "react";
import postSignup from "../api/post-signup.js";
import postLogin from "../api/post-login.js";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/use-auth.js";

// useState registers a value that React needs to track, and provides a variable to read that value and a function to request an update to it.

// useEffect runs after a render has finished, reads values stored via useState to compare or compute them, and updates other state if needed. The array at the end of useEffect specifies which values this effect should watch, and the effect runs when any of those values change.

function SignupForm() {
  const navigateTo = useNavigate();
  const { auth, setAuth } = useAuth();
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
  });

  useEffect(() => {
    const pw = credentials.password;
    const cpw = credentials.confirmPassword;

    // Don't flag it yet if one of them is empty
    if (!pw || !cpw) {
      setPasswordsMatch(true);
      return;
    }

    setPasswordsMatch(pw === cpw);
  }, [credentials.password, credentials.confirmPassword]);

  const handleChange = (event) => {
    const { id, value } = event.target;

    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [id]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      credentials.username &&
      credentials.password &&
      credentials.confirmPassword &&
      credentials.email &&
      passwordsMatch
    ) {
      postSignup(credentials.username, credentials.password, credentials.email)
        .then(() => {
          return postLogin(credentials.username, credentials.password);
        })
        .then((loginResponse) => {
          window.localStorage.setItem("token", loginResponse.token);
          setAuth({
            token: loginResponse.token,
          });
          navigateTo("/");
        });
    }
  };

  return (
    <form>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          required
          type="text"
          id="username"
          placeholder="Enter username"
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          required
          type="email"
          id="email"
          placeholder="Enter email"
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          required
          type="password"
          id="password"
          placeholder="Password"
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="confirmPassword">Confirm password:</label>
        <input
          required
          type="password"
          id="confirmPassword"
          placeholder="Confirm Password"
          onChange={handleChange}
        />
      </div>
      {!passwordsMatch && (
        <div style={{ color: "red", fontSize: "0.9rem" }}>
          Passwords don't match
        </div>
      )}
      {/* false && "hello" -> false
          true && "hello" -> "hello" */}
      <button disabled={!passwordsMatch} type="button" onClick={handleSubmit}>
        Sign Up
      </button>
      {/* type here can also be type="submit" but it will also allow an Enter action whereaas "button" allows users to click to trigger the button tag. */}
      <style>
        {`
    input:invalid {
      border: 1px solid #ff6b6b;
      background-color: #fff5f5;
    }
  `}
      </style>
    </form>
  );
}

export default SignupForm;
