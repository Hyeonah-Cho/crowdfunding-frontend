import postPledge from "../api/post-pledge.js";
import { useState } from "react";
import { useAuth } from "../hooks/use-auth.js";

function PledgeForm({ fundraiserId }) {
  const { auth } = useAuth();
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

    if (!pledgeData.amount || !pledgeData.comment) return;

    const payload = {
      ...pledgeData,
      fundraiser: Number(fundraiserId),
    };

    await postPledge(payload, auth.token);
    window.location.reload();
    // Reset the pledge form
    setPledgeData({ amount: "", comment: "", anonymous: false });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="amount">Amount:</label>
        <input
          required
          type="number"
          id="amount"
          min="1"
          value={pledgeData.amount}
          placeholder="Enter amount"
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="comment">Comment:</label>
        <input
          required
          id="comment"
          value={pledgeData.comment}
          placeholder="Enter comment"
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="anonymous">Anonymous:</label>
        <input
          type="checkbox"
          id="anonymous"
          checked={pledgeData.anonymous}
          onChange={handleChange}
        />
      </div>

      <button type="submit">Submit</button>
      <style>
        {`
    input:invalid {
      border: 1px solid #ff6b6b;
      background-color: #fff5f5;
    }
  `}
      </style>
    </form>
  );
}

export default PledgeForm;
