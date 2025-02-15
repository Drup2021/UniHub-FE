import React, { useState } from "react";
import { motion } from "framer-motion";

const EventForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    url: "",
    tags: [],
  });

  const tagOptions = ["Title", "Food", "Tech"];

  // Inline style objects
  const styles = {
    wrapper: {
      backgroundColor: "#0a0a0a",
      color: "#fff",
      fontFamily: "'Comic Neue', cursive",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      margin: 0,
    },
    pageContainer: {
      display: "flex",
      width: "80%",
      maxWidth: "900px",
      background: "#121212",
      borderRadius: "15px",
      overflow: "hidden",
      boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.5)",
    },
    sidebar: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      padding: "30px",
      background: "#1a1a1a",
      borderRight: "1px solid #333",
    },
    viewEventsBtn: {
      background: "transparent",
      border: "2px solid #A075e6",
      color: "#fff",
      padding: "10px 20px",
      cursor: "pointer",
      borderRadius: "8px",
      marginBottom: "20px",
      fontSize: "14px",
      fontWeight: "bold",
      transition: "all 0.3s ease",
    },
    pageTitle: {
      fontSize: "26px",
      fontWeight: "bold",
      color: "#f4f4f4",
      marginBottom: "20px",
    },
    formContainer: {
      flex: 2,
      background: "#1e1e1e",
      padding: "2rem",
      borderRadius: "10px",
      textAlign: "center",
    },
    inputField: {
      width: "100%",
      padding: "12px",
      marginBottom: "15px",
      background: "#2a2a2a",
      border: "1px solid #444",
      borderRadius: "8px",
      color: "#fff",
      fontSize: "16px",
      transition: "all 0.3s ease",
    },
    tagSection: {
      marginBottom: "20px",
    },
    tagLabel: {
      display: "block",
      marginBottom: "10px",
      fontWeight: "bold",
      color: "#A075e6",
    },
    tagButtons: {
      display: "flex",
      justifyContent: "center",
      gap: "10px",
    },
    tagBtn: {
      background: "#333",
      border: "none",
      padding: "12px 20px",
      borderRadius: "8px",
      cursor: "pointer",
      color: "#fff",
      fontWeight: "bold",
      transition: "all 0.3s ease",
    },
    tagBtnActive: {
      background: "#A075e6",
      color: "#000",
      transform: "translateY(-2px)",
      boxShadow: "0px 4px 15px rgba(255, 152, 0, 0.4)",
    },
    submitBtn: {
      width: "100%",
      padding: "12px",
      background: "#A075e6",
      border: "none",
      color: "#000",
      fontSize: "16px",
      fontWeight: "bold",
      cursor: "pointer",
      borderRadius: "8px",
      transition: "all 0.3s ease",
    },
  };

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Tag Selection (Toggle functionality)
  const handleTagSelection = (tag) => {
    setFormData((prev) => {
      const updatedTags = prev.tags.includes(tag)
        ? prev.tags.filter((t) => t !== tag)
        : [...prev.tags, tag];
      return { ...prev, tags: updatedTags };
    });
  };

  // Handle Form Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Data:", formData);
    alert(`Event Submitted!\nTags: ${formData.tags.join(", ")}`);
  };

  // Simple hover effects using event handlers (since inline styles can’t use :hover)
  const handleMouseOver = (e, hoverStyles) => {
    Object.assign(e.currentTarget.style, hoverStyles);
  };

  const handleMouseOut = (e, defaultStyles) => {
    Object.assign(e.currentTarget.style, defaultStyles);
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.pageContainer}>
        {/* Left Side */}
        <div style={styles.sidebar}>
          <button
            style={styles.viewEventsBtn}
            onMouseOver={(e) =>
              handleMouseOver(e, {
                background: "#A075e6",
                color: "#000",
                transform: "translateY(-2px)",
                boxShadow: "0px 4px 15px rgba(255, 152, 0, 0.4)",
              })
            }
            onMouseOut={(e) =>
              handleMouseOut(e, {
                background: "transparent",
                color: "#fff",
                transform: "translateY(0)",
                boxShadow: "none",
              })
            }
          >
            View Events
          </button>
          <h2 style={styles.pageTitle}>Create Your Event</h2>
        </div>

        {/* Right Side - Event Form */}
        <motion.div
          style={styles.formContainer}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <form onSubmit={handleSubmit}>
            {/* Event Title */}
            <motion.input
              type="text"
              name="title"
              placeholder="Enter event title"
              value={formData.title}
              onChange={handleChange}
              style={styles.inputField}
              whileFocus={{ scale: 1.05 }}
            />

            {/* Event Description */}
            <motion.textarea
              name="description"
              placeholder="Enter event description"
              value={formData.description}
              onChange={handleChange}
              style={styles.inputField}
              whileFocus={{ scale: 1.05 }}
            />

            {/* Event Date */}
            <motion.input
              type="text"
              name="date"
              placeholder="Enter event date (YYYY-MM-DD to YYYY-MM-DD)"
              value={formData.date}
              onChange={handleChange}
              style={styles.inputField}
              whileFocus={{ scale: 1.05 }}
            />

            {/* Event URL */}
            <motion.input
              type="text"
              name="url"
              placeholder="Enter event URL"
              value={formData.url}
              onChange={handleChange}
              style={styles.inputField}
              whileFocus={{ scale: 1.05 }}
            />

            {/* Dynamic Tags Selection */}
            <div style={styles.tagSection}>
              <label style={styles.tagLabel}>SELECT TAGS</label>
              <div style={styles.tagButtons}>
                {tagOptions.map((tag) => {
                  // Merge default and active styles if tag is selected
                  const btnStyle = formData.tags.includes(tag)
                    ? { ...styles.tagBtn, ...styles.tagBtnActive }
                    : styles.tagBtn;
                  return (
                    <motion.button
                      key={tag}
                      style={btnStyle}
                      onClick={(e) => {
                        e.preventDefault();
                        handleTagSelection(tag);
                      }}
                      whileHover={{ scale: 1.1 }}
                      onMouseOver={(e) => {
                        if (!formData.tags.includes(tag))
                          handleMouseOver(e, {
                            background: "#A075e6",
                            color: "#000",
                            transform: "translateY(-2px)",
                            boxShadow:
                              "0px 4px 15px rgba(255, 152, 0, 0.4)",
                          });
                      }}
                      onMouseOut={(e) => {
                        if (!formData.tags.includes(tag))
                          handleMouseOut(e, {
                            background: "#333",
                            color: "#fff",
                            transform: "translateY(0)",
                            boxShadow: "none",
                          });
                      }}
                    >
                      {tag}
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              style={styles.submitBtn}
              onMouseOver={(e) =>
                handleMouseOver(e, {
                  background: "#5b21b6",
                  boxShadow: "0px 4px 15px rgba(255, 152, 0, 0.4)",
                })
              }
              onMouseOut={(e) =>
                handleMouseOut(e, {
                  background: "#A075e6",
                  boxShadow: "none",
                })
              }
            >
              Submit Event
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default EventForm;
