/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";

// Update these imports with your actual image paths
import metallum from "@/assets/metallum.jpg";
import revelation from "@/assets/revelation.jpg";
import wolfame from "@/assets/wolfame2.jpg";

// Random image URLs from Picsum
const randomImages = [
  "https://picsum.photos/400/300?random=1",
  "https://picsum.photos/400/300?random=2",
  "https://picsum.photos/400/300?random=3",
  "https://picsum.photos/400/300?random=4",
  "https://picsum.photos/400/300?random=5",
  "https://picsum.photos/400/300?random=6",
  "https://picsum.photos/400/300?random=7",
  "https://picsum.photos/400/300?random=8",
  "https://picsum.photos/400/300?random=9",
  "https://picsum.photos/400/300?random=10",
];

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
  // Add more events with random images
  {
    id: 4,
    img: randomImages[0],
    title: "Tech Expo 2025",
    desc: "A showcase of the latest technological innovations and advancements.",
    date: "2025-04-10 to 2025-04-12",
    url: "https://example.com/tech-expo",
  },
  {
    id: 5,
    img: randomImages[1],
    title: "Cultural Fest 2025",
    desc: "Celebrate diversity with music, dance, and art from around the world.",
    date: "2025-05-05 to 2025-05-07",
    url: "https://example.com/cultural-fest",
  },
  {
    id: 6,
    img: randomImages[2],
    title: "Startup Summit",
    desc: "A platform for budding entrepreneurs to pitch their ideas and network.",
    date: "2025-06-15 to 2025-06-17",
    url: "https://example.com/startup-summit",
  },
  {
    id: 7,
    img: randomImages[3],
    title: "Hackathon 2025",
    desc: "A 48-hour coding marathon to solve real-world problems.",
    date: "2025-07-20 to 2025-07-22",
    url: "https://example.com/hackathon",
  },
  {
    id: 8,
    img: randomImages[4],
    title: "Art & Design Fair",
    desc: "Explore the world of art and design with exhibitions and workshops.",
    date: "2025-08-10 to 2025-08-12",
    url: "https://example.com/art-design-fair",
  },
  {
    id: 9,
    img: randomImages[5],
    title: "Music Festival",
    desc: "A three-day celebration of music with performances by top artists.",
    date: "2025-09-01 to 2025-09-03",
    url: "https://example.com/music-festival",
  },
  {
    id: 10,
    img: randomImages[6],
    title: "Science Fair",
    desc: "Discover groundbreaking scientific research and innovations.",
    date: "2025-10-15 to 2025-10-17",
    url: "https://example.com/science-fair",
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
  <div className="event group relative bg-back rounded-lg overflow-hidden transition-transform duration-300 transform opacity-0 translate-y-5 border-2 border-bord shadow-lg hover:shadow-xl">
    <img
      src={event.img}
      alt={event.title}
      className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
    />
    <div className="p-4">
      <h3 className="text-xl font-bold text-pri mb-1 hover:text-purple-400 uppercase tracking-wide">
        {event.title}
      </h3>
      <p className="text-sec text-sm font-medium mb-2">{event.date}</p>
      <p className="mt-2 text-sec text-sm leading-relaxed">{event.desc}</p>
    </div>
    <div className="absolute inset-0 flex items-end justify-center bg-back/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      <div className="flex space-x-2 pb-4 w-full px-4 justify-center">
        <a>
          <button className="px-4 py-2 bg-back rounded-full text-pri hover:bg-bord transition-colors duration-300 uppercase font-bold text-sm tracking-wide border-2 border-bord">
            Register
          </button>
        </a>
        <button
          onClick={() => window.open(event.url, "_blank")}
          className="px-4 py-2 bg-back rounded-full text-pri hover:bg-bord transition-colors duration-300 uppercase font-bold text-sm tracking-wide border-2 border-bord"
        >
          Details
        </button>
        <button
          onClick={() =>
            shareEventDetails(event.title, event.date, event.desc, event.url)
          }
          className="px-4 py-2 bg-back rounded-full text-pri hover:bg-bord transition-colors duration-300 uppercase font-bold text-sm tracking-wide border-2 border-bord"
        >
          Share
        </button>
      </div>
    </div>
  </div>
);

const EventsGallery = () => {
  const [search, setSearch] = useState("");

  const filteredEvents = eventsData.filter((event) =>
    event.title.toLowerCase().includes(search.toLowerCase())
  );

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
      { threshold: 0.1 }
    );

    lazyEvents.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [filteredEvents]);

  return (
    <div className="min-h-screen py-1 bg-back text-pri font-sans">
      <div className="sticky top-20 z-30 bg-back py-4 px-4 border-b-2 border-bord">
        <div className="max-w-4xl mx-auto">
          <input
            type="text"
            placeholder="Search events..."
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-3 rounded-full bg-back placeholder-sec focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300 h-12 text-pri border-2 border-bord"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-8 max-w-7xl mx-auto">
        {filteredEvents.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>

      {filteredEvents.length === 0 && (
        <div className="text-center py-20">
          <p className="text-sec text-xl font-bold uppercase">
            No events found matching your search
          </p>
        </div>
      )}
    </div>
  );
};

export default EventsGallery;