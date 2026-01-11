import React from 'react';
import { 
  FaHeartbeat, 
  FaUsers, 
  FaTint, 
  FaHandHoldingHeart 
} from 'react-icons/fa';

const stats = [
  {
    icon: <FaUsers className="text-3xl sm:text-4xl text-primary" />,
    number: "12,450+",
    label: "Registered Donors",
    description: "Active heroes ready to save lives"
  },
  {
    icon: <FaTint className="text-3xl sm:text-4xl text-error" />,
    number: "28,730+",
    label: "Lives Saved",
    description: "Successful donations completed"
  },
  {
    icon: <FaHeartbeat className="text-3xl sm:text-4xl text-secondary" />,
    number: "4,820+",
    label: "Requests Fulfilled",
    description: "Urgent needs met across the country"
  },
  {
    icon: <FaHandHoldingHeart className="text-3xl sm:text-4xl text-info" />,
    number: "1,200+",
    label: "Active Volunteers",
    description: "Dedicated people managing requests"
  }
];

const StatisticsSection = () => {
  return (
    <section className="py-8 md:py-16 bg-gradient-to-b from-base-200 to-base-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-6 md:mb-12">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2">
            Our <span className="text-red-600">Impact</span> So Far
          </h2>
          <p className="text-base-content/70 max-w-2xl mx-auto text-xs sm:text-sm md:text-base lg:text-lg">
            Every drop counts. Together we're building a stronger, more connected 
            community of life-savers across Bangladesh.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="
                card bg-base-100 shadow-md sm:shadow-lg border border-base-300/20
                hover:shadow-xl transition-all duration-300
                hover:-translate-y-0.5 group
                text-center p-3 sm:p-5 md:p-6
              "
            >
              <div className="flex flex-col items-center">
                <div className="
                  w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20
                  rounded-full flex items-center justify-center mb-3 sm:mb-4
                  bg-gradient-to-br from-base-200 to-base-300/50
                  group-hover:scale-105 transition-transform duration-300
                ">
                  {stat.icon}
                </div>

                <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-1 sm:mb-2 bg-gradient-to-r from-red-500 to-secondary bg-clip-text text-transparent">
                  {stat.number}
                </h3>

                <h4 className="text-base sm:text-lg md:text-xl font-bold mb-1 sm:mb-2">
                  {stat.label}
                </h4>

                <p className="text-base-content/70 text-xs sm:text-sm md:text-sm">
                  {stat.description}
                </p>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default StatisticsSection;
