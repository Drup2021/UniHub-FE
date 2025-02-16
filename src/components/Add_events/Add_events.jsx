import React, { useState } from "react";
import { motion } from "framer-motion";
import "./App.css"; // Import styles

const EventForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    url: "",
    tags: [], // Array to store selected tags
  });

  const [submitted, setSubmitted] = useState(false); // Track form submission

  const tagOptions = ["Title", "Food", "Tech"];

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Tag Selection (Toggle functionality)
  const handleTagSelection = (tag) => {
    setFormData((prev) => {
      const updatedTags = prev.tags.includes(tag)
        ? prev.tags.filter((t) => t !== tag) // Remove tag if already selected
        : [...prev.tags, tag]; // Add tag if not selected

      return { ...prev, tags: updatedTags };
    });
  };

  // Handle Form Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Data:", formData);
    setSubmitted(true);

    // Hide message after 3 seconds
    setTimeout(() => {
      setSubmitted(false);
    }, 3000);
  };

  return (
    <div className="page-container">
      {/* Left Side - View Events Button & Heading */}
      <div className="sidebar">
        <button className="view-events-btn">View Events</button>
        <h2 className="page-title">Create Your Event</h2>
      </div>

      {/* Right Side - Event Form */}
      <motion.div
        className="form-container"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <form className="event-form" onSubmit={handleSubmit}>
          {/* Event Title */}
          <motion.input
            type="text"
            name="title"
            placeholder="Enter event title"
            value={formData.title}
            onChange={handleChange}
            className="input-field"
            whileFocus={{ scale: 1.05 }}
          />

          {/* Event Description */}
          <motion.textarea
            name="description"
            placeholder="Enter event description"
            value={formData.description}
            onChange={handleChange}
            className="input-field"
            whileFocus={{ scale: 1.05 }}
          />

          {/* Event Date */}
          <motion.input
            type="text"
            name="date"
            placeholder="Enter event date (YYYY-MM-DD to YYYY-MM-DD)"
            value={formData.date}
            onChange={handleChange}
            className="input-field"
            whileFocus={{ scale: 1.05 }}
          />

          {/* Event URL */}
          <motion.input
            type="text"
            name="url"
            placeholder="Enter event URL"
            value={formData.url}
            onChange={handleChange}
            className="input-field"
            whileFocus={{ scale: 1.05 }}
          />

          {/* Dynamic Tags Selection */}
          <div className="tag-section">
            <label className="tag-label">SELECT TAGS</label>
            <div className="tag-buttons">
              {tagOptions.map((tag) => (
                <motion.button
                  key={tag}
                  className={`tag-btn ${formData.tags.includes(tag) ? "active" : ""}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleTagSelection(tag);
                  }}
                  whileHover={{ scale: 1.1 }}
                >
                  {tag}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <motion.button type="submit" className="submit-btn">
            Submit Event
          </motion.button>
        </form>

        {/* Success Message */}
        {submitted && (
          <motion.div
            className="success-message"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            ✅ Event Submitted Successfully!
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default EventForm;
