import { useState } from "react";
import { useParams } from "react-router-dom";
import useFundraiser from "../hooks/use-fundraiser";
import PledgeForm from "../components/PledgeForm";
import { ApiError } from "../lib/api";
import { useAuth } from "../hooks/use-auth.js";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

function FundraiserPage() {
  // Here we use a hook that comes for free in react router called `useParams` to get the id from the URL so that we can pass it to our useFundraiser hook.
  const { id } = useParams();
  // useFundraiser returns three pieces of info, so we need to grab them all here
  const { fundraiser, isLoading, error } = useFundraiser(id);
  const [supportOpen, setSupportOpen] = useState(false);

  function formatCurrency(amount) {
    return new Intl.NumberFormat("en-AU", {
      style: "currency",
      currency: "AUD",
    }).format(Number(amount));
  }

  const { auth } = useAuth();
  const navigateTo = useNavigate();

  const handleSupportClick = () => {
    if (!auth?.token) {
      navigateTo("/login", { state: { from: `/fundraiser/${id}` } });
      return;
    }
    setSupportOpen(true);
  };

  // Debugging
  // console.log(isLoading);

  if (isLoading) return <p className="text-muted-foreground">Loading...</p>;

  if (error) {
    if (error instanceof ApiError && error.status === 404) {
      return <p className="text-destructive">Couldn't find the fundraiser.</p>;
    }
    return <p className="text-destructive">{error.message}</p>;
  }

  const pledges = fundraiser?.pledges ?? [];

  const pledgedTotal = pledges.reduce(
    (sum, p) => sum + Number(p.amount ?? 0),
    0,
  );

  const goal = Number(fundraiser?.goal ?? 0);
  const remaining = Math.max(goal - pledgedTotal, 0);
  const percent =
    goal > 0 ? Math.min(Math.round((pledgedTotal / goal) * 100), 100) : 0;

  const supporters = [...pledges].sort((a, b) => (b.id ?? 0) - (a.id ?? 0));

  const handleSupportSuccess = () => {
    setSupportOpen(false);
    toast("Thank you for your support!");
    window.location.reload();
  };

  return (
    <div className="space-y-8">
      {/* Title */}
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">
          {fundraiser.title}
        </h1>
        <p className="text-sm text-muted-foreground">
          Created {new Date(fundraiser.date_created).toLocaleString("en-AU")}
          {" · "}
          {fundraiser.is_open ? "Open" : "Closed"}
        </p>
      </div>

      {/* Image + Stats */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Image (big, under title) */}
        <div className="lg:col-span-2 overflow-hidden rounded-lg border bg-card">
          <div className="h-72 w-full sm:h-96">
            <img
              src={fundraiser.image}
              alt={fundraiser.title}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
        </div>

        {/* Stats (right side) */}
        <Card className="rounded-lg">
          <CardHeader>
            <CardTitle className="text-base">Goal & progress</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Goal</p>
              <p className="text-xl font-semibold">{formatCurrency(goal)}</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-baseline justify-between">
                <p className="text-sm text-muted-foreground">Raised</p>
                <p className="text-sm font-medium">{percent}%</p>
              </div>
              <Progress value={percent} />
              <div className="flex justify-between text-sm">
                <span>{formatCurrency(pledgedTotal)} raised</span>
                <span className="text-muted-foreground">
                  {formatCurrency(remaining)} left
                </span>
              </div>
            </div>

            <div className="pt-2">
              <p className="text-xs text-muted-foreground">
                Updates are based on total pledges.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Description + Support */}
      <Card className="rounded-lg">
        <CardHeader>
          <CardTitle className="text-base">Description</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <p className="whitespace-pre-wrap text-sm text-foreground/90">
            {fundraiser.description}
          </p>

          <div className="space-y-3">
            <Dialog open={supportOpen} onOpenChange={setSupportOpen}>
              <Button
                onClick={handleSupportClick}
                disabled={!fundraiser.is_open}
              >
                Support
              </Button>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Support this Life</DialogTitle>
                </DialogHeader>
                <PledgeForm
                  fundraiserId={id}
                  onSuccess={handleSupportSuccess}
                />
              </DialogContent>
            </Dialog>

            <p className="text-xs text-muted-foreground">
              Your support helps cover treatment and recovery.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Supporters */}
      <div className="space-y-3">
        <div className="flex items-end justify-between">
          <h2 className="text-lg font-semibold tracking-tight">Supporters</h2>
          <p className="text-sm text-muted-foreground">
            {supporters.length} total
          </p>
        </div>

        <div className="space-y-3">
          {supporters.map((p) => (
            <Card key={p.id} className="rounded-2xl">
              <CardContent className="p-4 space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="text-sm font-medium">
                    {p.anonymous ? "Anonymous supporter" : p.supporter_username}
                  </p>
                  <p className="text-sm font-semibold">
                    {formatCurrency(p.amount)}
                  </p>
                </div>
                {p.comment ? (
                  <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                    {p.comment}
                  </p>
                ) : null}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FundraiserPage;
