import React, { useState, useEffect } from 'react';
import './Events.css';

const events = [
    { img: "./metallum.jpg", title: "Metallum", desc: "Metallum is the annual tech fest of the Society of Student Metallurgists, IIEST Shibpur", date: "2025-02-13 to 2025-02-15", url: "https://metallum.co.in/" },
    { img: "./revelation.jpg", title: "Revelation", desc: "Revelation is the annual tech fest of ASCE, IIEST Shibpur, featuring competitions", date: "2025-03-23 to 2025-03-25", url: "https://unstop.com/college-fests/revelation-24-indian-institute-of-engineering-science-and-technology-iiest-shibpur-234957" },
    { img: "./metallum.jpg", title: "Metallum", desc: "Metallum is the annual tech fest of the Society of Student Metallurgists, IIEST Shibpur", date: "2025-02-13 to 2025-02-15", url: "https://metallum.co.in/" },
    { img: "./revelation.jpg", title: "Revelation", desc: "Revelation is the annual tech fest of ASCE, IIEST Shibpur, featuring competitions", date: "2025-03-23 to 2025-03-25", url: "https://unstop.com/college-fests/revelation-24-indian-institute-of-engineering-science-and-technology-iiest-shibpur-234957" },
    { img: "./wolfame2.jpg", title: "Wolfame", desc: "Wolfame is the annual sports and cultural fest of Wolfenden Hall, IIEST Shibpur", date: "2025-03-17 to 2025-03-19", url: "https://wolfame.in/" },

    { img: "./wolfame2.jpg", title: "Wolfame", desc: "Wolfame is the annual sports and cultural fest of Wolfenden Hall, IIEST Shibpur", date: "2025-03-17 to 2025-03-19", url: "https://wolfame.in/" },
];

const shareContent = (eventTitle, eventDate, eventDesc, eventUrl) => {
    const message = `Hello, 

I wanted to share details about *${eventTitle}* happening at *our college* on *${eventDate}*.

*Event Details:*
${eventDesc}

For more information, visit: ${eventUrl}.
Looking forward to your thoughts. Let me know if you're interested!`;

    if (navigator.share) {
        navigator.share({ text: message }).catch(console.error);
    } else {
        alert(message);
    }
};

const EventsComponent = ({ events }) => {
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const lazyEvents = document.querySelectorAll(".event");
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const eventDiv = entry.target;
                    eventDiv.style.opacity = "1"; // Fade in the entire div
                    eventDiv.style.transform = "translateY(0)"; // Slide up effect
                    obs.unobserve(eventDiv); // Stop observing once loaded
                }
            });
        }, { threshold: 0.5 }); // Trigger when 50% of the div is visible

        lazyEvents.forEach(event => observer.observe(event));

        return () => observer.disconnect();
    }, []);

    const handleSearch = (e) => {
        setSearchQuery(e.target.value.toLowerCase());
    };

    return (
        <div>
            <div className="search-container">
                <input 
                    type="text" 
                    id="search-bar" 
                    placeholder="Search for an event..." 
                    onChange={handleSearch} 
                />
            </div>
            
            <div className="events">
                {events
                    .filter(event => event.title.toLowerCase().includes(searchQuery))
                    .map((event, idx) => (
                        <div 
                            className="event" 
                            key={idx} 
                            style={{ opacity: 0, transform: 'translateY(20px)', transition: 'opacity 0.5s ease, transform 0.5s ease' }} // Initial hidden state
                        >
                            <img src={event.img} alt={event.title} />
                            <h3 className="college-name">{event.title}</h3>
                            <p className="event-date">{event.date}</p>
                            <p className="event-des">{event.desc}</p>
                            <div className="event-buttons">
                                <a href={`/contact/${event.title}&${event.date}`}>
                                    <button>Register</button>
                                </a>
                                <button onClick={() => window.open(event.url, '_blank')}>Details</button>
                                <button onClick={() => shareContent(event.title, event.date, event.desc, event.url)}>Share</button>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
};

const CollegeEventDisplay = () => {
    return <EventsComponent events={events} />;
};

export default CollegeEventDisplay;