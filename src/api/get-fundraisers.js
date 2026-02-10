import { requestJson } from "../lib/api";

async function getFundraisers() {
  // To make the code `await` instead of running top to bottom i.e. throwing errors even before all the data has been fetched, we need to declare our function as `async`
  // First we create the URL for the request by using the Vite environment variable and the API endpoint.
  const url = `${import.meta.env.VITE_API_URL}/fundraisers`;

  return await requestJson(
    url,
    { method: "GET" },
    "Error fetching fundraisers",
  ); // 👈
}

export default getFundraisers;
