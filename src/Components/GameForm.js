import React, { useState } from 'react';

function GameForm({ onSubmit }) {
  // Initial form state setup
  const [formData, setFormData] = useState({
    name: '',
    rating: '',
    review: '',
    image: '', // Placeholder or default image URL can go here
    tags: []
  });

  // Update form data as input fields change
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // Handle form submit
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Call the passed onSubmit prop, which is expected to be the POST request logic
      await onSubmit(formData);
      // Clear the form data after successful submission
      setFormData({
        name: '',
        rating: '',
        review: '',
        image: '',
        tags: []
      });
    } catch (error) {
      console.error("Error submitting the form: ", error);
    }
  };

  // Form JSX
  return (
    <form onSubmit={handleSubmit} style={{margin: '20px'}}>
      <div>
        <label htmlFor="name">Game Name:</label>
        <input
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="rating">Rating (1-10):</label>
        <input
          id="rating"
          name="rating"
          type="number"
          min="1"
          max="10"
          value={formData.rating}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="review">Review:</label>
        <textarea
          id="review"
          name="review"
          value={formData.review}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="image">Image URL:</label>
        <input
          id="image"
          name="image"
          type="text"
          value={formData.image}
          onChange={handleChange}
        />
      </div>
      {/* Form field to add tags can be added here */}
      <button type="submit" style={{marginTop: '10px'}}>Add Game</button>
    </form>
  );
}

export default GameForm;