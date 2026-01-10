import { Link } from 'lucide-react';
import { motion } from 'framer-motion';
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
      <motion.div 
        className="absolute inset-0 bg-black/50 flex items-center justify-center text-center"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <div className="max-w-2xl px-4">
          <motion.h1 
            className="text-4xl md:text-5xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            Donate blood, save lives
          </motion.h1>
          <motion.p 
            className="text-lg md:text-xl text-gray-200 mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            Your blood is precious: Donate, save a life, make a difference.
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
           <NavLink to={"/register"}>
             <motion.button 
               className="px-6 py-3 rounded-2xl bg-red-600 text-white font-semibold shadow hover:bg-red-700 transition"
               whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(220, 38, 38, 0.3)" }}
               whileTap={{ scale: 0.95 }}
             > 
               Join as a donor 
             </motion.button>
           </NavLink>
            <NavLink to="/search-request">
              <motion.button 
                className="px-6 py-3 rounded-2xl bg-white text-red-600 font-semibold shadow hover:bg-gray-100 transition"
                whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)" }}
                whileTap={{ scale: 0.95 }}
              >
                Search Donors
              </motion.button>
            </NavLink>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Banner;