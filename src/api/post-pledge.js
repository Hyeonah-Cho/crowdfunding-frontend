import { requestJson } from "../lib/api";

async function postPledge({ amount, comment, anonymous, fundraiser }, token) {
  const url = `${import.meta.env.VITE_API_URL}/pledges/`;

  return await requestJson(
    url,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify({
        amount: Number(amount),
        comment: comment ?? "",
        anonymous: Boolean(anonymous),
        fundraiser: Number(fundraiser),
      }),
    },
    "Error trying to create a pledge",
  );
}

export default postPledge;
