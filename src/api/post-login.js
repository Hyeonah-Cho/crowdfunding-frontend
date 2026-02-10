import { requestJson } from "../lib/api";

async function postLogin(username, password) {
  const url = `${import.meta.env.VITE_API_URL}/api-token-auth/`; // This should match the backend URL pattern for the particular API action - refer to the backend Readme.md

  return await requestJson(
    url,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" }, // We need to tell the server that we are sending JSON data so we set the Content-Type header to application/json -> this is in Insomnia in the Header section for login POST endpoint
      body: JSON.stringify({ username, password }),
    },
    "Error trying to sign in",
  );
}

export default postLogin;
