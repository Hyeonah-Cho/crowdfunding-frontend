import { useParams } from "react-router-dom";
import useFundraiser from "../hooks/use-fundraiser";
import PledgeForm from "../components/PledgeForm";
import { ApiError } from "../lib/api";

function FundraiserPage() {
  // Here we use a hook that comes for free in react router called `useParams` to get the id from the URL so that we can pass it to our useFundraiser hook.
  const { id } = useParams();
  // useFundraiser returns three pieces of info, so we need to grab them all here
  const { fundraiser, isLoading, error } = useFundraiser(id);

  function formatCurrency(amount) {
    return new Intl.NumberFormat("en-AU", {
      style: "currency",
      currency: "AUD",
    }).format(amount);
  }

  // Debugging
  // console.log(isLoading);

  if (isLoading) return <p>loading...</p>;

  if (error) {
    if (error instanceof ApiError && error.status === 404) {
      return <p>Something went wrong. Couldn't find the fundraiser.</p>;
    }
    return <p>{error.message}</p>;
  }

  return (
    <div>
      <h2>{fundraiser.title}</h2>
      <h3>Created at: {fundraiser.date_created}</h3>
      <h3>{`Status: ${fundraiser.is_open}`}</h3>
      <h3>Pledges:</h3>
      <PledgeForm fundraiserId={id} />
      <ul>
        {fundraiser.pledges.map((pledgeData, key) => {
          return (
            <li key={key}>
              {formatCurrency(pledgeData.amount)} from{" "}
              {pledgeData.anonymous
                ? "Anonymous supporter"
                : pledgeData.supporter_username}{" "}
              | Comment: {pledgeData.comment}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default FundraiserPage;
