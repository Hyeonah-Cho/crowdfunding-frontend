async function postLogin(username, password) {
  const url = `${import.meta.env.VITE_API_URL}/api-token-auth/`; // This should match the backend URL pattern for the particular API action - refer to the backend Readme.md
  const response = await fetch(url, {
    method: "POST", // DELETE will be for logout
    headers: {
      "Content-Type": "application/json", // We need to tell the server that we are sending JSON data so we set the Content-Type header to application/json -> this is in Insomnia in the Header section for login POST endpoint
    },
    body: JSON.stringify({
      username: username,
      password: password,
    }),
  });

  if (!response.ok) {
    const fallbackError = `Error trying to login`; // This can be quotes or double quotes but if I want to use any variable like `Error trying to login: ${statusCode}` -> backticks are a must. Also backticks for multiple lines of the message.

    const data = await response.json().catch(() => {
      throw new Error(fallbackError);
    });

    const errorMessage = data?.detail ?? fallbackError;
    throw new Error(errorMessage);
  }

  return await response.json();
}

export default postLogin;
