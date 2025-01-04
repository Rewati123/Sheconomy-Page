import React from 'react';

const EmpoweringWomen = () => {
  return (
    <section className="bg-[#D41461] py-16 relative">
      <div className="container mx-auto px-4">
        {/* Heading and Description */}
        <div className="flex flex-col items-center text-center mb-36">
          <h2 className="text-white text-2xl sm:text-3xl md:text-4xl font-semibold mb-6">
            Empowering Women Entrepreneurs with <br /> Certificates and Community
          </h2>
          <p className="text-white text-sm sm:text-base md:text-lg lg:text-xl font-normal max-w-3xl">
            Our platform not only connects women entrepreneurs but also equips them with valuable certifications and a thriving community to help them succeed. Together, we're building a foundation for growth, learning, and mutual support.
          </p>
        </div>

        {/* Card Section */}
        <div className="relative ">
          <div className="bg-white w-full max-w-4xl mx-auto rounded-lg shadow-lg absolute left-1/2 transform -translate-x-1/2 -translate-y-1/4 md:-translate-y-1/3">
            <div className="flex flex-col md:flex-row items-start justify-center py-8 md:py-12 px-4 sm:px-8">
              {/* Left Section */}
              <div className="w-full md:w-1/2 mb-6 md:mb-0 md:pr-8">
                <h3 className="text-black font-semibold text-lg sm:text-xl mb-4">
                  The Essence of Community
                </h3>
                <ul className="text-left text-xs sm:text-sm md:text-base space-y-4">
                  <li>
                    <span className="font-semibold">Collaborative Growth:</span> Join a network of like-minded women entrepreneurs who share ideas, insights, and experiences to grow together.
                  </li>
                  <li>
                    <span className="font-semibold">Inspiring Support:</span> Become a part of a diverse group that uplifts, motivates, and celebrates every milestone, big or small.
                  </li>
                </ul>
              </div>

              {/* Divider Line */}
              <div className="hidden md:block border-l-2 border-[#D41461] h-48 mx-4"></div>

              {/* Right Section */}
              <div className="w-full md:w-1/2 md:pl-8">
                <h3 className="text-black font-semibold text-lg sm:text-xl mb-4">
                  Certification Programs
                </h3>
                <ul className="text-left text-xs sm:text-sm md:text-base space-y-4">
                  <li>
                    <span className="font-semibold">Skill Development:</span> Earn recognized certifications that enhance your professional skills and add credibility to your business.
                  </li>
                  <li>
                    <span className="font-semibold">Explore Opportunities:</span> Open doors to partnerships, experiences, and new markets with certifications that showcase your expertise.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EmpoweringWomen;
