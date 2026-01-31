async function getFundraiser(fundraiserId) {
  const url = `${import.meta.env.VITE_API_URL}/fundraisers/${fundraiserId}`;
  const response = await fetch(url, { method: "GET" });

  if (!response.ok) {
    // You may create this as a separate function to reuse under /src/lib intead of copying and pasting the same code over and over again
    const fallbackError = `Error fetching fundraiser with id ${fundraiserId}`;

    const data = await response.json().catch(() => {
      throw new Error(fallbackError);
    });

    const errorMessage = data?.detail ?? fallbackError;
    throw new Error(errorMessage);
  }

  return await response.json();
}

export default getFundraiser;
