async function postSignup(username, password, email) {
  const url = `${import.meta.env.VITE_API_URL}/users/`; // This should match the backend URL pattern for the particular API action - refer to the backend Readme.md
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // We need to tell the server that we are sending JSON data so we set the Content-Type header to application/json -> this is in Insomnia in the Header section for users POST endpoint
    },
    body: JSON.stringify({
      username: username,
      password: password,
      email: email,
    }),
  });

  if (!response.ok) {
    const fallbackError = `Error trying to sign up`;

    const data = await response.json().catch(() => {
      throw new Error(fallbackError);
    });

    const errorMessage = data?.detail ?? fallbackError;
    throw new Error(errorMessage);
  }

  return await response.json();
}

export default postSignup;
