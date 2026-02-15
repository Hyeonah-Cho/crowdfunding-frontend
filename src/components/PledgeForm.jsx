import postPledge from "../api/post-pledge.js";
import { useState } from "react";
import { useAuth } from "../hooks/use-auth.js";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

function PledgeForm({ fundraiserId, onSuccess }) {
  const { auth } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [pledgeData, setPledgeData] = useState({
    amount: "",
    comment: "",
    anonymous: false,
  });

  const handleChange = (event) => {
    const { id, value, type, checked } = event.target;

    setPledgeData((prev) => ({
      ...prev,
      [id]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!pledgeData.amount) return;

    const payload = {
      ...pledgeData,
      amount: Number(pledgeData.amount),
      fundraiser: Number(fundraiserId),
    };

    setIsSubmitting(true);
    try {
      await postPledge(payload, auth.token);
      // Reset the pledge form
      setPledgeData({ amount: "", comment: "", anonymous: false });
      if (onSuccess) onSuccess();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="amount">Amount (AUD)</Label>
        <Input
          required
          type="number"
          id="amount"
          min="1"
          value={pledgeData.amount}
          placeholder="Enter amount"
          onChange={handleChange}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="comment">Comment</Label>
        <Textarea
          id="comment"
          value={pledgeData.comment}
          placeholder="Leave a short message"
          onChange={handleChange}
        />
      </div>

      <div className="flex items-center gap-2">
        <Checkbox
          id="anonymous"
          checked={pledgeData.anonymous}
          onCheckedChange={(checked) =>
            setPledgeData((prev) => ({ ...prev, anonymous: Boolean(checked) }))
          }
        />
        <Label htmlFor="anonymous">Support anonymously</Label>
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? "Submitting..." : "Submit"}
      </Button>
    </form>
  );
}

export default PledgeForm;
