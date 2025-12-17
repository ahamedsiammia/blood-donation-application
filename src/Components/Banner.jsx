import { Link } from 'lucide-react';
import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { NavLink } from 'react-router';

const Banner = () => {
  return (
    <div className="relative">
      <Carousel
        autoPlay
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        interval={4000}
      >
        <div>
          <img
            src="https://i.pinimg.com/1200x/ca/55/0c/ca550cc93e5f09dd7b8fe16ba54104f5.jpg"
            alt="Donate Blood"
            className="h-[500px] object-cover"
          />
        </div>
        <div>
          <img
            src="https://i.pinimg.com/1200x/dc/bc/d2/dcbcd2cb9d71be3761101737d02c2616.jpg"
            alt="Save Lives"
            className="h-[500px] object-cover"
          />
        </div>
        <div>
          <img
            src="https://i.pinimg.com/1200x/f2/d0/8b/f2d08bfaaa08d87775b014d13a16ba14.jpg"
            alt="Blood Donation"
            className="h-[500px] object-cover"
          />
        </div>
      </Carousel>

      {/* Overlay Content */}
      <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-center">
        <div className="max-w-2xl px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Donate blood, save lives
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-6">
            Your blood is precious: Donate, save a life, make a difference.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
           <NavLink to={"/Register"}><button className="px-6 py-3 rounded-2xl bg-red-600 text-white font-semibold shadow hover:bg-red-700 transition"> Join as a donor </button></NavLink>
            <button className="px-6 py-3 rounded-2xl bg-white text-red-600 font-semibold shadow hover:bg-gray-100 transition">
              Search Donors
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;