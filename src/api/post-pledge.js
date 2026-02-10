async function postPledge({ amount, comment, anonymous, fundraiser }, token) {
  const url = `${import.meta.env.VITE_API_URL}/pledges/`;

  const response = await fetch(url, {
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
  });

  if (!response.ok) {
    const fallbackError = `Error trying to create a pledge`;

    const data = await response.json().catch(() => {
      throw new Error(fallbackError);
    });

    const errorMessage = data?.detail ?? fallbackError;
    throw new Error(errorMessage);
  }

  return await response.json();
}

export default postPledge;
