import { Link } from "react-router-dom";
import "./FundraiserCard.css";

function FundraiserCard(props) {
  const { fundraiserData } = props;
  // Relative path example: "fundraiser/2" → resolved based on the current route
  // Absolute path example: "/fundraiser/2" → always resolved from the root
  const fundraiserLink = `/fundraiser/${fundraiserData.id}`;

  return (
    <div className="fundraiser-card">
      <Link to={fundraiserLink}>
        <img src={fundraiserData.image} />
        <h3>{fundraiserData.title}</h3>
      </Link>
    </div>
  );
}

export default FundraiserCard;
