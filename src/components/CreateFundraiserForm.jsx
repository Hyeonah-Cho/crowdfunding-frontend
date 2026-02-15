import postCreateFundraiser from "../api/post-createFundraiser.js";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../hooks/use-auth.js";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function CreateFundraiserForm() {
  const navigateTo = useNavigate();
  const { auth } = useAuth();
  const [fundraiserData, setFundraiserData] = useState({
    title: "",
    description: "",
    goal: "",
    image: "",
  });

  const handleChange = (event) => {
    const { id, value } = event.target;

    setFundraiserData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      fundraiserData.title &&
      fundraiserData.description &&
      fundraiserData.goal &&
      fundraiserData.image
    ) {
      postCreateFundraiser(fundraiserData, auth.token).then((response) => {
        navigateTo(`/fundraiser/${response.id}`);
      });
    }
  };

  return (
    <Card className="rounded-lg">
      <CardHeader>
        <CardTitle className="text-xl">Create a Life</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              required
              type="text"
              id="title"
              placeholder="Give this Life a name"
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              required
              id="description"
              placeholder="What happened, and what care is needed?"
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="goal">Goal (AUD)</Label>
            <Input
              required
              type="number"
              id="goal"
              min="1"
              placeholder="Enter "
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="image">Image</Label>
            <Input
              required
              type="url"
              id="image"
              placeholder="Enter link to image"
              onChange={handleChange}
            />
          </div>
          <Button type="submit" onClick={handleSubmit}>
            Submit
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

export default CreateFundraiserForm;
