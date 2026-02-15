import useFundraisers from "../hooks/use-fundraisers";
import FundraiserCard from "../components/FundraiserCard";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

function HomePage() {
  const { fundraisers, isLoading, error } = useFundraisers();
  const navigateTo = useNavigate();

  if (isLoading) return <p className="text-muted-foreground">Loading...</p>;
  if (error) return <p className="text-destructive">{error.message}</p>;

  // To sort by created date
  const sorted = [...fundraisers].sort((a, b) => {
    const aDate = a.date_created ? new Date(a.date_created).getTime() : 0;
    const bDate = b.date_created ? new Date(b.date_created).getTime() : 0;
    if (aDate && bDate) return bDate - aDate;
    return (b.id ?? 0) - (a.id ?? 0);
  });

  const featured = sorted.slice(0, 2);
  const rest = sorted.slice(2);

  return (
    <div>
      {/* HERO - Take up the space */}
      <section className="min-h-[calc(100vh-4rem)] flex items-center">
        <div className="mx-auto w-full max-w-3xl px-4 text-center space-y-5">
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            Together, we can care for a Life
          </h1>

          <p className="text-muted-foreground text-lg">
            The <span className="italic">soothingest</span> nest where healing
            begins.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Button onClick={() => navigateTo("/fundraisers")}>
              See Lives in Need
            </Button>
            <Button
              variant="outline"
              onClick={() => navigateTo("/fundraiser/create")}
            >
              Create a Fundraiser
            </Button>
          </div>
        </div>
      </section>

      {/* LIST HEADER */}
      <section className="mx-auto w-full max-w-6xl px-4 pb-10">
        <div className="flex items-end justify-between gap-4 pb-25">
          <div className="space-y-2">
            <div className="inline-flex rounded-full border px-3 py-1 text-xs text-muted-foreground">
              Latest Fundraisers
            </div>
            <h2 className="text-3xl mt-5 font-semibold tracking-tight">
              Each fundraiser helps an animal receive the care it needs.
            </h2>
          </div>

          <Button
            variant="ghost"
            className="gap-2"
            onClick={() => navigateTo("/fundraisers")}
          >
            View all <span aria-hidden="true">→</span>
          </Button>
        </div>

        {/* FEATURED 2 */}
        <div className="grid gap-10 lg:grid-cols-2">
          {/* Featured Left - Text -> Image */}
          {featured[0] ? (
            <article className="space-y-3">
              <div className="space-y-2">
                <p className="text-xs text-muted-foreground">
                  Listed on{" "}
                  {featured[0].date_created
                    ? new Date(featured[0].date_created).toLocaleDateString()
                    : ""}
                </p>
                <h3 className="text-2xl font-semibold leading-tight">
                  {featured[0].title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {(featured[0].description ?? "").slice(0, 120)}
                  {(featured[0].description ?? "").length > 120 ? "…" : ""}
                </p>
              </div>

              <button
                type="button"
                onClick={() => navigateTo(`/fundraiser/${featured[0].id}`)}
                className="w-full overflow-hidden rounded-xl border bg-card text-left"
              >
                <div className="aspect-[16/10] w-full overflow-hidden">
                  <img
                    src={featured[0].image}
                    alt={featured[0].title}
                    className="h-full w-full object-cover transition-transform duration-300 hover:scale-[1.02]"
                    loading="lazy"
                  />
                </div>
              </button>
            </article>
          ) : null}

          {/* Featured Right - Image -> Text  */}
          {featured[1] ? (
            <article className="space-y-3">
              <button
                type="button"
                onClick={() => navigateTo(`/fundraiser/${featured[1].id}`)}
                className="w-full overflow-hidden rounded-xl border bg-card text-left"
              >
                <div className="aspect-[16/10] w-full overflow-hidden">
                  <img
                    src={featured[1].image}
                    alt={featured[1].title}
                    className="h-full w-full object-cover transition-transform duration-300 hover:scale-[1.02]"
                    loading="lazy"
                  />
                </div>
              </button>

              <div className="space-y-2">
                <p className="text-xs text-muted-foreground">
                  Listed on{" "}
                  {featured[1].date_created
                    ? new Date(featured[1].date_created).toLocaleDateString()
                    : ""}
                </p>
                <h3 className="text-2xl font-semibold leading-tight">
                  {featured[1].title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {(featured[1].description ?? "").slice(0, 120)}
                  {(featured[1].description ?? "").length > 120 ? "…" : ""}
                </p>
              </div>
            </article>
          ) : null}
        </div>

        {/* REST GRID - 3 columns only with title */}
        {rest.length > 0 ? (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((f) => (
              <FundraiserCard
                key={f.id ?? `${f.title}-${Math.random()}`}
                fundraiserData={f}
              />
            ))}
          </div>
        ) : null}
      </section>
    </div>
  );
}

export default HomePage;
