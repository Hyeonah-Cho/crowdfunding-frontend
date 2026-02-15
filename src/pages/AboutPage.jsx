// src/pages/AboutPage.jsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

function AboutPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <Badge variant="outline">About</Badge>
        <h1 className="text-3xl font-semibold tracking-tight">Soothingnest</h1>
        <p className="text-muted-foreground">
          Where support becomes a soothing nest for healing.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="rounded-lg lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Mission</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-foreground/90">
            <p>
              Soothingnest helps people raise funds for an animal's treatment
              and recovery.
            </p>
            <p>
              Our priority is transparency. We are developing a payment
              structure where funds will be sent directly to selected clinics.
              If a Life exceeds the required clinic fee, the remaining funds are
              planned to be allocated to designated animal shelters. A verified
              list of partner shelters will be introduced as part of this
              expansion.
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-lg">
          <CardHeader>
            <CardTitle className="text-base">What is a “Life”?</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            A Life is a fundraiser page with a goal, an image, and a story.
            Supporters can pledge an amount and leave a message.
          </CardContent>
        </Card>
      </div>

      <Card className="rounded-lg">
        <CardHeader>
          <CardTitle className="text-base">How it works</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-3 text-sm">
          <div className="space-y-1">
            <p className="font-medium">1. Create</p>
            <p className="text-muted-foreground">
              Share a clear story, select a registered clinic, and set a
              treatment goal.
            </p>
          </div>
          <div className="space-y-1">
            <p className="font-medium">2. Support</p>
            <p className="text-muted-foreground">
              Supporters pledge an amount, with the option to remain anonymous.
            </p>
          </div>
          <div className="space-y-1">
            <p className="font-medium">3. Transparency</p>
            <p className="text-muted-foreground">
              Funds go directly to the chosen clinic. Progress reflects real
              pledges toward the treatment goal.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-lg">
        <CardHeader>
          <CardTitle className="text-base">Roadmap</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>Planned improvements:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Animal categories and filtering</li>
            <li>Better supporter experience (no reload after pledge)</li>
            <li>Verification options (e.g., vet references)</li>
            <li>Contact form backend integration</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}

export default AboutPage;
