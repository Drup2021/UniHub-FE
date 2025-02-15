import React, { useState, useEffect } from 'react';
import data from './data.json';
import { FaArrowLeft, FaArrowRight, FaComments, FaCalendarAlt, FaUser, FaStar, FaEnvelope } from 'react-icons/fa';

// Import images
import event1 from '../assets/event-1.jpg';
import event2 from '../assets/event-2.jpg';
import event3 from '../assets/event-3.jpg';
import teamMember1 from '../assets/team-member-1.jpeg';
import teamMember2 from '../assets/team-member-2.jpeg';
import teamMember3 from '../assets/team-member-3.jpeg';
import teamMember4 from '../assets/team-member-4.jpeg';
import teamMember5 from '../assets/team-member-5.jpeg';

// Map image names to imported images
const imageMap = {
  'event-1.jpg': event1,
  'event-2.jpg': event2,
  'event-3.jpg': event3,
  'team-member-1.jpg': teamMember1,
  'team-member-2.jpg': teamMember2,
  'team-member-3.jpg': teamMember3,
  'team-member-4.jpg': teamMember4,
  'team-member-5.jpg': teamMember5,
};

const HomePage = () => {
  const { events, forumPosts, testimonials, team } = data;
  const [currentEventIndex, setCurrentEventIndex] = useState(0);

  // Auto-slide events every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentEventIndex((prevIndex) => (prevIndex + 1) % events.length);
    }, 4000); // 4 seconds
    return () => clearInterval(interval);
  }, [events.length]);

  // Manual navigation for events
  const goToNextEvent = () => {
    setCurrentEventIndex((prevIndex) => (prevIndex + 1) % events.length);
  };

  const goToPreviousEvent = () => {
    setCurrentEventIndex((prevIndex) =>
      prevIndex === 0 ? events.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen font-sans">
      {/* Header Section */}
      <header className="h-screen flex items-center justify-center text-center relative overflow-hidden bg-gradient-to-br from-gray-900 to-purple-900">
        <div className="relative z-10">
          <h1 className="text-6xl font-bold mb-5 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
            Welcome to UniHub
          </h1>
          <p className="text-2xl text-purple-300 mb-3">
            A one-stop solution to all student problems
          </p>
          <p className="text-xl text-white mb-8">Built By Students For Students</p>
          <button className="px-8 py-3 text-lg font-bold text-white bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-lg hover:scale-105 transition-transform">
            Register
          </button>
        </div>
        {/* Floating Circles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-purple-400 opacity-10"
              style={{
                width: `${20 + i * 5}px`,
                height: `${20 + i * 5}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `float ${10 + i * 2}s infinite ease-in-out`,
              }}
            ></div>
          ))}
        </div>
      </header>

      {/* Chatbot Section */}
      <section className="py-20 px-10 bg-gray-800">
        <div className="flex items-center gap-8 max-w-6xl mx-auto">
          <img
            src="https://via.placeholder.com/150" // Placeholder image
            alt="Chatbot"
            className="w-40 h-40 rounded-full border-4 border-purple-400 object-cover"
          />
          <div>
            <h2 className="text-3xl font-bold text-purple-400 mb-4">
              Meet BLAKE - Your FRIENDLY NEIGHBOURHOOD chatbot
            </h2>
            <p className="text-lg mb-6">
              Meet Blake, your AI study buddy. Ask me anything!
            </p>
            <button className="px-6 py-2 text-lg font-bold text-white bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center gap-2 hover:scale-105 transition-transform">
              <FaComments /> Chat Now
            </button>
          </div>
        </div>
      </section>

      {/* Forum Section */}
      <section className="py-20 px-10 bg-gray-800">
        <h2 className="text-3xl font-bold text-purple-400 mb-8 text-center">
          Latest Forum Posts
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {forumPosts.map((post) => (
            <div
              key={post.id}
              className="bg-gray-700 p-6 rounded-lg shadow-lg hover:scale-105 transition-transform"
            >
              <h3 className="text-2xl font-bold mb-4">{post.title}</h3>
              <p className="text-purple-300 flex items-center gap-2 mb-4">
                <FaUser /> By {post.author}
              </p>
              <p className="text-lg mb-6">{post.content}</p>
              <button className="px-6 py-2 text-lg font-bold text-white bg-gradient-to-r from-purple-500 to-pink-500 rounded-full">
                Read More
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Events Section */}
      <section className="py-20 px-10 bg-gray-800">
        <h2 className="text-3xl font-bold text-purple-400 mb-8 text-center">
          Upcoming Events
        </h2>
        <div className="relative overflow-hidden h-[500px] max-w-6xl mx-auto">
          <div
            className="flex transition-transform duration-500"
            style={{
              width: `${events.length * 100}%`,
              transform: `translateX(-${currentEventIndex * 100}%)`,
            }}
          >
            {events.map((event) => (
              <div
                key={event.id}
                className="w-full flex-shrink-0 bg-gray-700 p-8 rounded-lg shadow-lg text-center"
              >
                <div className="w-full h-64 overflow-hidden rounded-lg mb-6">
                  <img
                    src={imageMap[event.image]}
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-2xl font-bold mb-4">{event.title}</h3>
                <p className="text-purple-300 flex items-center justify-center gap-2 mb-4">
                  <FaCalendarAlt /> {event.date}
                </p>
                <p className="text-lg mb-6">{event.description}</p>
                <button className="px-6 py-2 text-lg font-bold text-white bg-gradient-to-r from-purple-500 to-pink-500 rounded-full">
                  Learn More
                </button>
              </div>
            ))}
          </div>
          <button
            onClick={goToPreviousEvent}
            className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-purple-400 bg-opacity-80 p-3 rounded-full text-white hover:scale-110 transition-transform"
          >
            <FaArrowLeft />
          </button>
          <button
            onClick={goToNextEvent}
            className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-purple-400 bg-opacity-80 p-3 rounded-full text-white hover:scale-110 transition-transform"
          >
            <FaArrowRight />
          </button>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-10 bg-gray-800">
        <h2 className="text-3xl font-bold text-purple-400 mb-8 text-center">
          What Our Members Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-gray-700 p-6 rounded-lg shadow-lg text-center hover:scale-105 transition-transform"
            >
              <p className="text-lg italic mb-6">"{testimonial.comment}"</p>
              <p className="text-purple-300 flex items-center justify-center gap-2">
                <FaStar /> - {testimonial.name}
              </p>
              <button className="px-6 py-2 mt-6 text-lg font-bold text-white bg-gradient-to-r from-purple-500 to-pink-500 rounded-full">
                View Profile
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-10 bg-gray-800">
        <h2 className="text-3xl font-bold text-purple-400 mb-8 text-center">
          Meet Our Team
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {team.map((member) => (
            <div
              key={member.id}
              className="bg-gray-700 p-6 rounded-lg shadow-lg text-center hover:scale-105 transition-transform"
            >
              <div className="w-32 h-32 rounded-full border-4 border-purple-400 overflow-hidden mx-auto mb-6">
                <img
                  src={imageMap[member.image]}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-2xl font-bold mb-2">{member.name}</h3>
              <p className="text-purple-300 mb-6">{member.role}</p>
              <button className="px-6 py-2 text-lg font-bold text-white bg-gradient-to-r from-purple-500 to-pink-500 rounded-full">
                Contact
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Footer Section */}
      <footer className="py-20 px-10 bg-gray-800 text-center">
        <h2 className="text-3xl font-bold text-purple-400 mb-4">Contact Us</h2>
        <p className="text-lg">
          Have questions or feedback? Reach out to us at{' '}
          <a
            href="mailto:info@example.com"
            className="text-purple-300 hover:underline"
          >
            <FaEnvelope className="inline" /> info@example.com
          </a>
          . We'd love to hear from you!
        </p>
      </footer>
    </div>
  );
};

export default HomePage; 