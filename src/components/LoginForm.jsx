import { useState } from "react";
import postLogin from "../api/post-login.js";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/use-auth.js";

function LoginForm() {
  const location = useLocation();
  const from = location.state?.from || "/"; // Send the user to Home
  const navigateTo = useNavigate(); // To redirect the users after logging in. The URL where I want to redirect the users to can be set up using the variable navigateTo at the bottom after a login action.
  const { auth, setAuth } = useAuth();
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const handleChange = (event) => {
    // console.log(event); // -> Try this and check the console in the browser to check the form of the parameter and what datas we can grab via the event methods e.g., target, whcih grabs username input. There are many other events and methods that can be used. Check - MDN

    const { id, value } = event.target;
    // Here, paremeter "event" is the values in onChange in the <input> tag and we're applying .target to the values.

    setCredentials((prevCredentials) => ({
      ...prevCredentials, // The spread operator (...) in JavaScript is used to expand elements of an iterable (like an array or string) or properties of an object into individual items.
      [id]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Default is reloading the page
    if (credentials.username && credentials.password) {
      postLogin(credentials.username, credentials.password).then((response) => {
        // console.log(response);
        window.localStorage.setItem("token", response.token); // Saved in Browser > Inspect > Application > Storage > Local storage -- You can choose the stoage timeframe, but the default is "forever" in the local until the user logs out. This is the difference from session.
        setAuth({
          token: response.token,
        });
        navigateTo(from, { replace: true });
      });
    }
  };
  return (
    <form>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          placeholder="Enter username"
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          placeholder="Password"
          onChange={handleChange}
        />
      </div>
      <button type="submit" onClick={handleSubmit}>
        Sing In
      </button>
      <button type="button" onClick={() => navigateTo("/signup")}>
        Sign Up
      </button>
      {/* type here can also be type="button" but it will only allow a click action whereaas "submit" allows users to hit Enter to trigger the button tag. */}
    </form>
  );
}

export default LoginForm;
