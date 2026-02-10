import useFundraisers from "../hooks/use-fundraisers";
import FundraiserCard from "../components/FundraiserCard";
import "./HomePage.css";
import { useNavigate } from "react-router-dom";

function HomePage() {
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
      <section className="home-hero">
        <h1>Together, we can care for a life</h1>
        <p>
          The <span className="italic">soothingest</span> nest where healing
          begins.
        </p>
        <div>
          <button type="button" onClick={() => navigateTo("/fundraisers")}>
            See Lives in Need
          </button>
          <button
            type="button"
            onClick={() => navigateTo("/fundraiser/create")}
          >
            Create a Fundraiser
          </button>
        </div>
      </section>

      <section className="home-content">
        <p>
          Each Life is a fundraiser created to help an animal receive the care
          it needs.
        </p>
        <div className="fundraiser-list">
          {fundraisers.map((fundraiserData, key) => {
            // Grab `fundraisers` only in the return value from `useFundraisers()` and map it
            return <FundraiserCard key={key} fundraiserData={fundraiserData} />;
          })}
        </div>
      </section>
    </div>
  );
}

export default HomePage;
