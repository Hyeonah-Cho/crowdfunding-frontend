import useFundraisers from "../hooks/use-fundraisers";
import FundraiserCard from "../components/FundraiserCard";
import "./HomePage.css";

function HomePage() {
  const { fundraisers, isLoading, error } = useFundraisers();

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
        <p>A soothing nest for animals in need.</p>
      </section>

      <section className="home-content">
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
