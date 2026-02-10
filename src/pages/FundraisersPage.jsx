import useFundraisers from "../hooks/use-fundraisers";
import FundraiserCard from "../components/FundraiserCard";
import "./HomePage.css";
import { useNavigate } from "react-router-dom";

function FundraisersPage() {
  const { fundraisers, isLoading, error } = useFundraisers();
  const navigateTo = useNavigate();

  if (isLoading) {
    return <p>loading...</p>;
  }
  if (error) {
    return <p>{error.message}</p>;
  }

  return (
    <div className="home-page">
      <button type="button" onClick={() => navigateTo("/fundraiser/create")}>
        Create a Fundraiser
      </button>
      <p>
        Each Life is a fundraiser created to help an animal receive the care it
        needs.
      </p>
      <div className="fundraiser-list">
        {fundraisers.map((fundraiserData, key) => {
          // Grab `fundraisers` only in the return value from `useFundraisers()` and map it
          return <FundraiserCard key={key} fundraiserData={fundraiserData} />;
        })}
      </div>
    </div>
  );
}

export default FundraisersPage;
