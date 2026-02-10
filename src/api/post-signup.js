import { requestJson } from "../lib/api";

async function postSignup(username, password, email) {
  const url = `${import.meta.env.VITE_API_URL}/users/`; // This should match the backend URL pattern for the particular API action - refer to the backend Readme.md

  return await requestJson(
    url,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password, email }),
    },
    "Error trying to sign up",
  ); // 👈
}

export default postSignup;
