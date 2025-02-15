/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";

import metallum from "@/assets/metallum.jpg";
import revelation from "@/assets/revelation.jpg";
import wolfame from "@/assets/wolfame2.jpg";

const eventsData = [
  {
    id: 1,
    img: metallum,
    title: "Metallum",
    desc: "Metallum is the annual tech fest of the Society of Student Metallurgists, IIEST Shibpur",
    date: "2025-02-13 to 2025-02-15",
    url: "https://metallum.co.in/",
  },
  {
    id: 2,
    img: revelation,
    title: "Revelation",
    desc: "Revelation is the annual tech fest of ASCE, IIEST Shibpur, featuring competitions",
    date: "2025-03-23 to 2025-03-25",
    url: "https://unstop.com/college-fests/revelation-24-indian-institute-of-engineering-science-and-technology-iiest-shibpur-234957",
  },
  {
    id: 3,
    img: wolfame,
    title: "Wolfame",
    desc: "Wolfame is the annual sports and cultural fest of Wolfenden Hall, IIEST Shibpur",
    date: "2025-03-17 to 2025-03-19",
    url: "https://wolfame.in/",
  },
];

const shareEventDetails = (title, date, desc, url) => {
  const message = `Hello,

I wanted to share details about *${title}* happening on *${date}*.

*Event Details:*
${desc}

For more information, visit: ${url}.

Looking forward to your thoughts. Let me know if you're interested!`;

  if (navigator.share) {
    navigator.share({ text: message }).catch(console.error);
  } else {
    alert(message);
  }
};

const EventCard = ({ event }) => (
  <div className="event group relative bg-gray-800 rounded-lg overflow-hidden transition-transform duration-300 transform opacity-0 translate-y-5">
    {/* Event Image */}
    <img
      src={event.img}
      alt={event.title}
      className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
    />
    {/* Event Details */}
    <div className="p-4">
      <h3 className="text-xl font-bold text-white mb-1 group-hover:text-purple-400">
        {event.title}
      </h3>
      <p className="text-gray-300 text-sm">{event.date}</p>
      <p className="mt-2 text-gray-400 text-sm">{event.desc}</p>
    </div>
    {/* Overlay Buttons */}
    <div className="absolute inset-0 flex items-end justify-center bg-gradient-to-t from-black via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      <div className="flex space-x-2 pb-4">
        <a href={`/contact/${event.title}&${event.date}`}>
          <button className="px-4 py-2 bg-blue-600 rounded-full text-white hover:bg-blue-700 transition-colors duration-300">
            Register
          </button>
        </a>
        <button
          onClick={() => window.open(event.url, "_blank")}
          className="px-4 py-2 bg-green-600 rounded-full text-white hover:bg-green-700 transition-colors duration-300"
        >
          Details
        </button>
        <button
          onClick={() =>
            shareEventDetails(event.title, event.date, event.desc, event.url)
          }
          className="px-4 py-2 bg-purple-600 rounded-full text-white hover:bg-purple-700 transition-colors duration-300"
        >
          Share
        </button>
      </div>
    </div>
  </div>
);

const EventsGallery = () => {
  const [search, setSearch] = useState("");

  // Filter events based on search query
  const filteredEvents = eventsData.filter((event) =>
    event.title.toLowerCase().includes(search.toLowerCase())
  );

  // Re-run the observer setup every time the filtered events change.
  useEffect(() => {
    const lazyEvents = document.querySelectorAll(".event");
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove("opacity-0", "translate-y-5");
            entry.target.classList.add("opacity-100", "translate-y-0");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    lazyEvents.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [filteredEvents]);

  return (
    <div className="min-h-screen py-1 bg-black text-gray-200 font-sans">
      {/* Search Bar */}
      <div className="sticky top-0 z-30 bg-black py-2 px-4">
        <input
          type="text"
          placeholder="Search events..."
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-md p-3 rounded-full bg-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300 h-12"
        />
      </div>
      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-4">
        {filteredEvents.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
};

export default EventsGallery;
