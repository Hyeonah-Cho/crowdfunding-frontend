import useFundraisers from "../hooks/use-fundraisers";
import FundraiserCard from "../components/FundraiserCard";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

function FundraisersPage() {
  const { fundraisers, isLoading, error } = useFundraisers();
  const navigateTo = useNavigate();

  if (isLoading) {
    return <p className="text-muted-foreground">Loading...</p>;
  }
  if (error) {
    return <p className="text-destructive">{error.message}</p>;
  }

  // To sort by created date
  const sortedFundraisers = [...fundraisers].sort((a, b) => {
    const aDate = new Date(a.date_created).getTime();
    const bDate = new Date(b.date_created).getTime();
    return bDate - aDate;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-2">
          <Badge variant="outline">Fundraisers</Badge>
          <h1 className="text-3xl font-semibold tracking-tight">Lives</h1>
          <p className="text-muted-foreground">
            Every Life begins with a story, and your support.
          </p>
        </div>

        <Button onClick={() => navigateTo("/fundraiser/create")}>
          Create a Fundraiser
        </Button>
      </div>

      {/* Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sortedFundraisers.map((fundraiserData) => (
          // Grab `fundraisers` only in the return value from `useFundraisers()` and map it
          <FundraiserCard
            key={fundraiserData.id}
            fundraiserData={fundraiserData}
          />
        ))}
      </div>
    </div>
  );
}

export default FundraisersPage;
