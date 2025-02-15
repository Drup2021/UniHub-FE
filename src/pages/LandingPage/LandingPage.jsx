import React from "react";

function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <div className="relative flex-1">
        {/* Full-page background image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/pexels-felixmittermeier-956999.jpg')" }}
        ></div>

        {/* Dark Navbar */}
        <nav className="absolute top-0 w-full flex justify-between items-center px-8 py-4 bg-black bg-opacity-70">
          <div className="text-white text-xl font-bold">UniHub</div>
          <div className="flex space-x-4">
            <a href="/login" className="text-white hover:text-gray-300">
              Login
            </a>
            <a href="/signup" className="text-white hover:text-gray-300">
              Signup
            </a>
          </div>
        </nav>

        {/* Centered Hero Text with Button */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-white text-5xl font-bold animate-fade-slide">
            Students change the world
          </h1>
          <h3 className="text-white text-2xl font-bold mt-4 animate-fade-slide">
            Empowering students through unity and strength, helping them build a future full of possibilities.
          </h3>

          {/* Single Centered Button */}
          <a href="/signup" className="mt-6 px-6 py-3 bg-white text-black text-lg font-semibold rounded-lg hover:bg-pri transition">
            Get Started
          </a>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;