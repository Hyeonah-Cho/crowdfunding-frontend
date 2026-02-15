import { useEffect, useState } from "react";
import postSignup from "../api/post-signup.js";
import postLogin from "../api/post-login.js";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/use-auth.js";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// useState registers a value that React needs to track, and provides a variable to read that value and a function to request an update to it.

// useEffect runs after a render has finished, reads values stored via useState to compare or compute them, and updates other state if needed. The array at the end of useEffect specifies which values this effect should watch, and the effect runs when any of those values change.

function SignupForm() {
  const location = useLocation();
  const from = location.state?.from || "/";
  const navigateTo = useNavigate();
  const { setAuth } = useAuth();
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
          navigateTo(from, { replace: true });
        });
    }
  };

  return (
    <Card className="rounded-lg">
      <CardHeader>
        <CardTitle className="text-xl">Create an account</CardTitle>
      </CardHeader>

      <CardContent className="space-y-5">
        <form className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input required type="text" id="username" onChange={handleChange} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input required type="email" id="email" onChange={handleChange} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              required
              type="password"
              id="password"
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm password</Label>
            <Input
              required
              type="password"
              id="confirmPassword"
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
          <Button
            disabled={!passwordsMatch}
            type="button"
            onClick={handleSubmit}
          >
            Sign Up
          </Button>
          {/* type here can also be type="submit" but it will also allow an Enter action whereaas "button" allows users to click to trigger the button tag. */}
        </form>
      </CardContent>
    </Card>
  );
}

export default SignupForm;
