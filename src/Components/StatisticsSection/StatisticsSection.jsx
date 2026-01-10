import React from 'react';
import { 
  FaHeartbeat, 
  FaUsers, 
  FaTint, 
  FaHandHoldingHeart 
} from 'react-icons/fa';

const stats = [
  {
    icon: <FaUsers className="text-5xl text-primary" />,
    number: "12,450+",
    label: "Registered Donors",
    description: "Active heroes ready to save lives"
  },
  {
    icon: <FaTint className="text-5xl text-error" />,
    number: "28,730+",
    label: "Lives Saved",
    description: "Successful donations completed"
  },
  {
    icon: <FaHeartbeat className="text-5xl text-secondary" />,
    number: "4,820+",
    label: "Requests Fulfilled",
    description: "Urgent needs met across the country"
  },
  {
    icon: <FaHandHoldingHeart className="text-5xl text-info" />,
    number: "1,200+",
    label: "Active Volunteers",
    description: "Dedicated people managing requests"
  }
];

const StatisticsSection = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-base-200 to-base-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Our <span className="text-primary">Impact</span> So Far
          </h2>
          <p className="text-base-content/70 max-w-3xl mx-auto text-lg md:text-xl">
            Every drop counts. Together we're building a stronger, more connected 
            community of life-savers across Bangladesh.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className={`
                card bg-base-100 shadow-xl border border-base-300/30
                hover:shadow-2xl transition-all duration-300
                hover:-translate-y-2 group
                text-center p-6 md:p-8
              `}
            >
              <div className="flex flex-col items-center">
                <div className={`
                  w-20 h-20 md:w-24 md:h-24 
                  rounded-full flex items-center justify-center mb-5
                  bg-gradient-to-br from-base-200 to-base-300/60
                  group-hover:scale-110 transition-transform duration-300
                `}>
                  {stat.icon}
                </div>

                <h3 className="text-4xl md:text-5xl font-extrabold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  {stat.number}
                </h3>

                <h4 className="text-xl md:text-2xl font-bold mb-2">
                  {stat.label}
                </h4>

                <p className="text-base-content/70 text-sm md:text-base">
                  {stat.description}
                </p>
              </div>

              {/* Subtle decorative line */}
              <div className="mt-6 h-1 w-16 mx-auto rounded-full bg-gradient-to-r from-primary/40 to-secondary/40 group-hover:from-primary group-hover:to-secondary transition-all duration-500"></div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default StatisticsSection;