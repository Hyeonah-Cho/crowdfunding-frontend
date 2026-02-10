import postCreateFundraiser from "../api/post-createFundraiser.js";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../hooks/use-auth.js";

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
    <form>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          required
          type="text"
          id="title"
          placeholder="Enter title"
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <textarea
          required
          id="description"
          placeholder="Enter description"
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="goal">Goal:</label>
        <input
          required
          type="number"
          id="goal"
          placeholder="Enter goal"
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="image">Image:</label>
        <input
          required
          type="url"
          id="image"
          placeholder="Enter link to image"
          onChange={handleChange}
        />
      </div>
      <button type="button" onClick={handleSubmit}>
        Submit
      </button>
      <style>
        {`
    input:invalid, textarea:invalid{
      border: 1px solid #ff6b6b;
      background-color: #fff5f5;
    }
  `}
      </style>
    </form>
  );
}

export default CreateFundraiserForm;
