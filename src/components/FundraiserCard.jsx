import { Link } from "react-router-dom";

function FundraiserCard({ fundraiserData }) {
  // Relative path example: "fundraiser/2" -> resolved based on the current route
  // Absolute path example: "/fundraiser/2" -> always resolved from the root
  const fundraiserLink = `/fundraiser/${fundraiserData.id}`;

  return (
    <Link
      to={fundraiserLink}
      className="group block overflow-hidden rounded-lg border bg-card transition hover:shadow-md"
    >
      {/* Image wrapper */}
      <div className="h-72 w-full overflow-hidden">
        <img
          src={fundraiserData.image}
          alt={fundraiserData.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Title */}
      <div className="p-4">
        <h3 className="text-base font-medium leading-snug">
          {fundraiserData.title}
        </h3>
      </div>
    </Link>
  );
}

export default FundraiserCard;
