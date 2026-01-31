import { useState, useEffect } from "react";
import getFundraiser from "../api/get-fundraiser";

// See if there is a way to make this as a reusable function as this is almost the same as what's in use-funraisers.js, and it will be used for other pages as well. -> Have a look at other mobile app code. I did create isLoading as reusable.
export default function useFundraiser(fundraiserId) {
  const [fundraiser, setFundraiser] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    // Here we pass the fundraiserId to the getFundraiser function.
    getFundraiser(fundraiserId)
      .then((fundraiser) => {
        setFundraiser(fundraiser);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });

    // This time we pass the fundraiserId to the dependency array so that the hook will re-run if the fundraiserId changes.
  }, [fundraiserId]);

  return { fundraiser, isLoading, error };
}
