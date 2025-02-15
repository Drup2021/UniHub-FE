import { useNavigate } from "react-router-dom";
import img3 from "./img3.jpg";
import { motion } from "motion/react";

const FrontPage = () => {
  const navigate = useNavigate();

  const handleJoinUsClick = () => {
    navigate("/signup");
  };

  return (
    <>
      {/* Main Container with Background Image */}
      <div className="min-h-screen flex flex-col justify-center items-center text-white relative overflow-hidden font-sans">
        {/* Background Image */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${img3})` }}
        >
          {/* Dark overlay for better text visibility */}
          <div className="absolute inset-0 bg-black opacity-70"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-4">
          {/* Main Heading */}
          <h1 className="text-8xl  font-bold mb-6 text-pri  ">
            Welcome To <span className="text-txt">UniHub</span>
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-purple-200 mb-4 hover:text-purple-400 transition-colors duration-200">
            Your one-stop platform for college resources, events, and
            connections.
          </p>

          {/* Join Us Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
            onClick={handleJoinUsClick}
            className="mt-4 bg-purple-600 text-white px-6 md:px-8 py-3 rounded-full font-semibold text-lg md:text-xl hover:bg-purple-700 transition-colors duration-200 shadow-md"
          >
            Join Us
          </motion.button>
        </div>

        {/* Footer */}
        <div className="absolute bottom-4 text-xs md:text-sm text-purple-300 text-center">
          <p>© 2025 UniHub. All rights reserved.</p>
        </div>
      </div>
    </>
  );
};

export default FrontPage;
