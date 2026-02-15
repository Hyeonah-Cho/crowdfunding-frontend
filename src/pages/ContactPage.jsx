// src/pages/ContactPage.jsx
import { useState } from "react";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";

function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (event) => {
    const { id, value } = event.target;
    setForm((prev) => ({ ...prev, [id]: value }));
  };

  const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrorMsg("");

    if (!form.name || !form.email || !form.message) {
      setErrorMsg("Please fill in name, email, and message.");
      return;
    }

    if (!isValidEmail(form.email)) {
      setErrorMsg("Please enter a valid email address.");
      return;
    }

    setIsSubmitting(true);

    // Placeholder behavior only:
    // Later I could replace this with a real API call, e.g.,
    // await fetch("/api/contact", { method: "POST", body: JSON.stringify(form) })

    setTimeout(() => {
      setIsSubmitting(false);
      toast("Message sent (demo). We'll add real email delivery later.");
      setForm({ name: "", email: "", subject: "", message: "" });
    }, 600);
  };

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <Badge variant="outline">Contact</Badge>
        <h1 className="text-3xl font-semibold tracking-tight">Get in touch</h1>
        <p className="text-muted-foreground">
          This form is a demo for now. It does not send a real email yet.
        </p>
      </div>

      <Card className="rounded-lg">
        <CardHeader>
          <CardTitle className="text-base">Send a message</CardTitle>
        </CardHeader>

        <CardContent className="space-y-5">
          {errorMsg ? (
            <Alert>
              <AlertDescription>{errorMsg}</AlertDescription>
            </Alert>
          ) : null}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" value={form.name} onChange={handleChange} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject">Subject (optional)</Label>
              <Input
                id="subject"
                value={form.subject}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                value={form.message}
                onChange={handleChange}
                placeholder="How can we help?"
              />
            </div>

            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Sending..." : "Submit"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default ContactPage;
