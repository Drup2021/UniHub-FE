/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import data from "./data.json";
import {
  ArrowLeft,
  ArrowRight,
  MessageSquare,
  Calendar,
  User,
  Star,
  Mail,
} from "lucide-react";

// Import images for events
import event1 from "../../assets/event-1.jpg";
import event2 from "../../assets/event-2.jpg";
import event3 from "../../assets/event-3.jpg";

// Import images for team members
import teamMember1 from "../../assets/team-member-1.webp";
import teamMember2 from "../../assets/team-member-2.webp";
import teamMember3 from "../../assets/team-member-3.webp";
import teamMember4 from "../../assets/team-member-4.webp";
import teamMember5 from "../../assets/team-member-5.webp";

import mascot from "../../assets/mascot.jpg";

// Map image names to imported event images
const imageMap = {
  "event-1.jpg": event1,
  "event-2.jpg": event2,
  "event-3.jpg": event3,
};

// Array of team member images
const Team = [teamMember1, teamMember2, teamMember3, teamMember4, teamMember5];

const HomePage = () => {
  const { events, forumPosts, testimonials, team } = data;
  const [currentEventIndex, setCurrentEventIndex] = useState(0);

  // Extend forum posts with additional dummy posts
  const dummyForumPosts = [
    ...forumPosts,
    {
      id: "dummy1",
      title: "Dummy Post 1",
      author: "John Doe",
      content: "This is a dummy forum post to show additional content.",
    },
    {
      id: "dummy2",
      title: "Dummy Post 2",
      author: "Jane Doe",
      content: "Another dummy forum post example with some placeholder text.",
    },
    {
      id: "dummy3",
      title: "Dummy Post 3",
      author: "Alex Smith",
      content: "A third dummy post to demonstrate multiple posts.",
    },
  ];

  // Extend testimonials with additional dummy testimonials
  const dummyTestimonials = [
    ...testimonials,
    {
      id: "dummy1",
      comment: "This is an amazing platform!",
      name: "Alice Johnson",
    },
    {
      id: "dummy2",
      comment: "I love the community feel here.",
      name: "Bob Brown",
    },
    {
      id: "dummy3",
      comment: "It really solves a lot of student issues!",
      name: "Charlie Davis",
    },
  ];

  // Define team names to override JSON values
  const teamNames = ["Siddharth", "Drup", "Harsh", "Shruti", "Rishabh"];

  // Auto-slide events every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentEventIndex((prevIndex) => (prevIndex + 1) % events.length);
    }, 4000);
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
      <header className="h-[70vh] flex items-center justify-center text-center relative overflow-hidden bg-gradient-to-br from-gray-900 to-purple-900">
        <div className="relative z-10">
          <h1 className="text-8xl font-bold mb-5 text-fuchsia-300 drop-shadow-lg">
            Welcome to UniHub
          </h1>
          <p className="text-2xl text-purple-300 mb-3">
            A one-stop solution to all student problems
          </p>
          <p className="text-xl text-white mb-8">
            Built By Students For Students
          </p>
          <button className="px-8 py-3 text-lg font-bold text-white bg-gradient-to-r from-purple-700 to-purple-900 rounded-full shadow-lg hover:scale-105 transition-transform">
            Register
          </button>
        </div>
        {/* Floating Circles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-purple-700 opacity-10"
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
            src={mascot}
            alt="Chatbot"
            className="w-40 h-40 rounded-full border-4 border-purple-700 object-cover"
          />
          <div>
            <h2 className="text-3xl font-bold text-purple-400 mb-4">
              Meet BLAKE - Your FRIENDLY NEIGHBOURHOOD chatbot
            </h2>
            <p className="text-lg mb-6">
              Meet Blake, your AI study buddy. Ask me anything!
            </p>
            <button className="px-6 py-2 text-lg font-bold text-white bg-gradient-to-r from-purple-700 to-purple-900 rounded-full flex items-center gap-2 hover:scale-105 transition-transform">
              <MessageSquare /> Chat Now
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
          {dummyForumPosts.map((post) => (
            <div
              key={post.id}
              className="bg-gray-700 p-6 rounded-lg shadow-lg hover:scale-105 transition-transform"
            >
              <h3 className="text-2xl font-bold mb-4">{post.title}</h3>
              <p className="text-purple-300 flex items-center gap-2 mb-4">
                <User /> By {post.author}
              </p>
              <p className="text-lg mb-6">{post.content}</p>
              <button className="px-6 py-2 text-lg font-bold text-white bg-gradient-to-r from-purple-700 to-purple-900 rounded-full">
                Read More
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-10 bg-gray-800">
        <h2 className="text-3xl font-bold text-purple-400 mb-8 text-center">
          What Our Students Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {dummyTestimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-gray-700 p-6 rounded-lg shadow-lg text-center hover:scale-105 transition-transform"
            >
              <p className="text-lg italic mb-6">
                "{testimonial.comment}"
              </p>
              <p className="text-purple-300 flex items-center justify-center gap-2">
                <Star /> - {testimonial.name}
              </p>
              <button className="px-6 py-2 mt-6 text-lg font-bold text-white bg-gradient-to-r from-purple-700 to-purple-900 rounded-full">
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
          {team.map((member, index) => (
            <div
              key={member.id}
              className="bg-gray-700 p-6 rounded-lg shadow-lg text-center hover:scale-105 transition-transform"
            >
              <div className="w-32 h-32 rounded-full border-4 border-purple-700 overflow-hidden mx-auto mb-6">
                <img
                  src={Team[index]}
                  alt={teamNames[index]}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-2xl font-bold mb-2">
                {teamNames[index]}
              </h3>
              <p className="text-purple-300 mb-6">{member.role}</p>
              <button className="px-6 py-2 text-lg font-bold text-white bg-gradient-to-r from-purple-700 to-purple-900 rounded-full">
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
          Have questions or feedback? Reach out to us at{" "}
          <a
            href="mailto:info@example.com"
            className="text-purple-300 hover:underline"
          >
            <Mail className="inline" /> info@example.com
          </a>
          . We'd love to hear from you!
        </p>
      </footer>
    </div>
  );
};

export default HomePage;
