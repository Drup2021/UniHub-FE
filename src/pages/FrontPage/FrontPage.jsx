import React from 'react';
import { useNavigate } from 'react-router-dom';
import img3 from './img3.jpg'; // Import the image

const FrontPage = () => {
  const navigate = useNavigate();

  const handleJoinUsClick = () => {
    navigate('/login'); // Redirect to the login page
  };

  return (
    <>
      {/* Main Container with background image */}
      <div
        style={{ perspective: '1000px' }}
        className="min-h-screen flex flex-col justify-center items-center text-white relative overflow-hidden"
      >
        {/* Background Image */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${img3})` }}
        >
          {/* Dark overlay for better text visibility */}
          <div className="absolute inset-0 bg-black opacity-70"></div>
        </div>

        {/* Content with subtle 3D hover effect */}
        <div
          className="relative z-10 text-center transform transition-transform duration-700 hover-3d"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Main Heading with 3D Animation */}
          <h1 className="text-9xl font-bold mb-9 animate-fade-in-down text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 shadow-2xl transform-3d">
            Welcome To <span className="text-purple-300">UniHub</span>
          </h1>

          {/* Subheading with Glow Effect */}
          <p className="text-xl animate-fade-in-up tracking-wide text-purple-200 glow mb-12">
            Your one-stop platform for college resources, events, and connections.
          </p>

          {/* Join Us Button with 3D Tilt Effect */}
          <button
            onClick={handleJoinUsClick}
            className="mt-6 bg-gradient-to-r from-purple-500 to-pink-600 text-white px-8 py-3 rounded-full font-semibold text-lg hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-700 transform hover:scale-110 hover-tilt transition-all duration-300 shadow-lg"
          >
            Join Us
          </button>
        </div>

        {/* Footer */}
        <div className="absolute bottom-4 text-sm text-purple-300">
          <p>© 2023 UniHub. All rights reserved.</p>
        </div>
      </div>

      {/* Custom CSS for animations and 3D effects */}
      <style jsx>{`
        /* Slow pulse animation */
        @keyframes pulse {
          0%,
          100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.5;
          }
        }
        .animate-pulse-slow {
          animation: pulse 3s infinite;
        }

        /* Fade-in down animation */
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-down {
          animation: fadeInDown 1s ease-out;
        }

        /* Fade-in up animation */
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fadeInUp 1s ease-out;
        }

        /* 3D hover effect on content container */
        .hover-3d:hover {
          transform: rotateY(6deg);
        }

        /* 3D tilt effect for the button */
        .hover-tilt:hover {
          transform: scale(1.1) rotateZ(2deg);
        }

        /* Glow effect for text */
        .glow {
          text-shadow: 0 0 10px rgba(192, 132, 252, 0.8), 0 0 20px rgba(192, 132, 252, 0.6);
        }

        /* 3D Animation for the heading */
        @keyframes float-3d {
          0% {
            transform: translateZ(0) rotateX(0) rotateY(0);
          }
          50% {
            transform: translateZ(50px) rotateX(10deg) rotateY(10deg);
          }
          100% {
            transform: translateZ(0) rotateX(0) rotateY(0);
          }
        }
        .transform-3d {
          animation: float-3d 5s ease-in-out infinite;
          transform-style: preserve-3d;
        }
      `}</style>
    </>
  );
};

export default FrontPage;