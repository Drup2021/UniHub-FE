function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-900 via-purple-900 to-gray-900">
      {/* Hero Section */}
      <div className="relative flex-1">
        {/* Dark Navbar */}

        {/* Centered Hero Text with Button */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-white text-3xl sm:text-4xl md:text-5xl font-bold animate-fade-slide">
            Students change the world
          </h1>
          <h3 className="text-white text-lg sm:text-xl md:text-2xl font-bold mt-4 animate-fade-slide max-w-2xl">
            Empowering students through unity and strength, helping them build a
            future full of possibilities.
          </h3>

          {/* Single Centered Button */}
          <a
            href="/signup"
            className="mt-6 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-lg font-semibold rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all transform hover:scale-105"
          >
            Get Started
          </a>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
