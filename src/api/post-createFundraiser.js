import { requestJson } from "../lib/api";

async function postCreateFundraiser(
  { title, description, goal, image },
  token,
) {
  const url = `${import.meta.env.VITE_API_URL}/fundraisers/`; // This should match the backend URL pattern for the particular API action - refer to the backend Readme.md

  return await requestJson(
    url,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify({
        title,
        description,
        image,
        goal: Number(goal),
        is_open: true,
      }),
    },
    `Error trying to create a fundraiser`, // This can be quotes or double quotes but if I want to use any variable like `Error trying to login: ${statusCode}` -> backticks are a must. Also backticks for multiple lines of the message.
  );
}

export default postCreateFundraiser;
