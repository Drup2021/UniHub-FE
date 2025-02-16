import React, { useState } from 'react';

const AllInOneComponent = () => {
  const [events, setEvents] = useState([
    { 
      id: 1,
      title: "Metallum", 
      desc: "Metallum is the annual tech fest of the Society of Student Metallurgists, IIEST Shibpur", 
      date: "2025-02-13 to 2025-02-15", 
      url: "https://metallum.co.in/",
      tags: ["Tech", "Engineering", "Annual"]
    },
    { 
      id: 2,
      title: "Revelation", 
      desc: "Revelation is the annual tech fest of ASCE, IIEST Shibpur, featuring competitions", 
      date: "2025-03-23 to 2025-03-25", 
      url: "https://unstop.com/college-fests/revelation-24-indian-institute-of-engineering-science-and-technology-iiest-shibpur-234957",
      tags: ["Innovation", "Competitions"]
    },
    { 
      id: 3,
      title: "Wolfame", 
      desc: "Wolfame is the annual sports and cultural fest of Wolfenden Hall, IIEST Shibpur", 
      date: "2025-03-17 to 2025-03-19", 
      url: "https://wolfame.in/",
      tags: ["Sports", "Culture"]
    },
  ]);

  // Function to delete an event by its id
  const deleteEvent = (id) => {
    setEvents(events.filter(event => event.id !== id));
  };

  return (
    <div>
      {/* Inline CSS */}
      <style>{`
        /* Dark theme background and text color */
        body {
          background-color: #121212;
          color: #e0e0e0;
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 0;
        }
        .header {
          margin-top: 40px;
        }

        /* Container for events using grid */
        .event-container {
          margin-top: 70px;
          display: grid;
          grid-template-columns: repeat(3, 1fr); /* 3 events in one line */
          gap: 20px; /* Space between cards */
          padding: 20px;
          max-width: 1200px; /* Limit container width */
          margin: 0 auto; /* Center the container */
        }

        /* Individual event card */
        .event {
          background-color: #1e1e1e;
          border: 1px solid #333;
          border-radius: 10px;
          padding: 16px;
          box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.3);
          transition: transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        /* Cool gradient overlay on hover */
        .event::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(45deg, #ff4444, #ff99cc);
          opacity: 0;
          transition: opacity 0.3s ease;
          z-index: 1;
        }

        .event:hover::before {
          opacity: 0.2; /* Subtle gradient overlay on hover */
        }

        /* Hover effect for event cards */
        .event:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 20px rgba(255, 68, 68, 0.3), 0 4px 10px rgba(255, 153, 204, 0.3);
        }

        /* Event information styling */
        .event-info {
          margin-bottom: 12px;
          font-size: 16px;
          color: #e0e0e0;
          position: relative;
          z-index: 2;
        }

        /* Tags container */
        .event-tags {
          display: flex;
          flex-direction: row-reverse; /* Display tags from right to left */
          gap: 8px;
          margin: 12px 0;
          position: relative;
          z-index: 2;
        }

        /* Individual tag styling */
        .tag {
          background-color: #0aad36;
          color: white;
          padding: 6px 10px;
          border-radius: 4px;
          font-size: 14px;
          transition: background-color 0.3s ease, transform 0.2s ease;
        }

        /* Hover effect for tags */
        .tag:hover {
          background-color: #2b7c2d;
          transform: scale(1.1);
        }

        /* Delete button styling */
        .delete-button {
          background-color: #ff4444;
          color: white;
          border: none;
          padding: 8px 12px;
          cursor: pointer;
          border-radius: 4px;
          font-size: 14px;
          transition: background-color 0.3s ease, transform 0.2s ease;
          position: relative;
          z-index: 2;
        }

        /* Hover effect for delete button */
        .delete-button:hover {
          background-color: #ff6666;
          transform: scale(1.05);
        }

        /* Pink-white button styling */
        .pink-button {
          background-color: #ff99cc;
          color: #121212;
          border: none;
          padding: 8px 12px;
          cursor: pointer;
          border-radius: 4px;
          font-size: 14px;
          transition: background-color 0.3s ease, transform 0.2s ease;
          position: relative;
          z-index: 2;
        }

        /* Hover effect for pink-white button */
        .pink-button:hover {
          background-color: #ff77aa;
          transform: scale(1.05);
        }

        /* Animation for event cards when they load */
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .event {
          animation: fadeIn 0.5s ease-out;
        }

        /* Back button styling */
        .back {
          margin-left: 30px;
          background-color: #ff4444;
          color: white;
          border: none;
          padding: 10px 15px;
          cursor: pointer;
          border-radius: 4px;
          font-size: 16px;
          transition: background-color 0.3s ease, transform 0.2s ease;
        }

        /* Hover effect for back button */
        .back:hover {
          background-color: #ff6666;
          transform: scale(1.05);
        }

        /* Glowing effect for event cards on hover */
        .event:hover {
          box-shadow: 0 0 15px rgba(255, 68, 68, 0.6), 0 0 25px rgba(255, 153, 204, 0.4);
        }

        /* Subtle pulse animation for tags */
        @keyframes pulse {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
          100% {
            transform: scale(1);
          }
        }

        .tag:hover {
          animation: pulse 1s infinite;
        }

        /* Gradient border effect for event cards */
        .event {
          border: 1px solid transparent;
          background-clip: padding-box;
        }

        .event:hover {
          border: 1px solid transparent;
          background-image: linear-gradient(#1e1e1e, #1e1e1e), linear-gradient(45deg, #ff4444, #ff99cc);
          background-origin: border-box;
          background-clip: padding-box, border-box;
        }
      `}</style>

      <div className="header">
        {/* Back Button */}
        <button className="delete-button back" onClick={() => window.history.back()}>
          ← Back
        </button>
      
        <div className="event-container">
          {events.map((event) => (
            <div key={event.id} className="event">
              <div className="event-info">
                <h3>{event.title}</h3>
                <p>{event.desc}</p>
                <p><strong>Date:</strong> {event.date}</p>
              </div>
              {event.tags.length > 0 && (
                <div className="event-tags">
                  {event.tags.map((tag, idx) => (
                    <span key={idx} className="tag">{tag}</span>
                  ))}
                </div>
              )}
              <button className="delete-button" onClick={() => deleteEvent(event.id)}>
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllInOneComponent;
