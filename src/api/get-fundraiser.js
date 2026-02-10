import { requestJson } from "../lib/api";

async function getFundraiser(fundraiserId) {
  const url = `${import.meta.env.VITE_API_URL}/fundraisers/${fundraiserId}`;

  return await requestJson(
    url,
    { method: "GET" },
    `Error fetching fundraiser with id ${fundraiserId}`,
  );
}

export default getFundraiser;
