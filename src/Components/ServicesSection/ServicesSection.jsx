import React from 'react';
import { 
  FaHeartbeat, 
  FaHandsHelping, 
  FaSearch, 
  FaUsers, 
  FaShieldAlt, 
  FaClock 
} from 'react-icons/fa';
import { Link } from 'react-router';

const services = [
  {
    icon: <FaHeartbeat className="text-4xl text-error" />,
    title: "Quick Blood Request",
    description: "Post urgent blood needs in minutes and connect with nearby donors instantly.",
    color: "text-error",
    bgColor: "bg-error/10"
  },
  {
    icon: <FaHandsHelping className="text-4xl text-primary" />,
    title: "Become a Donor",
    description: "Register as a donor and save lives by offering your blood when someone needs it.",
    color: "text-primary",
    bgColor: "bg-primary/10"
  },
  {
    icon: <FaSearch className="text-4xl text-secondary" />,
    title: "Smart Donor Search",
    description: "Find compatible donors in your area quickly using blood group, district & upazila.",
    color: "text-secondary",
    bgColor: "bg-secondary/10"
  },
  {
    icon: <FaUsers className="text-4xl text-info" />,
    title: "Community Support",
    description: "Join our growing community of donors, volunteers and people helping each other.",
    color: "text-info",
    bgColor: "bg-info/10"
  },
  {
    icon: <FaShieldAlt className="text-4xl text-success" />,
    title: "Safe & Verified",
    description: "We prioritize donor and recipient safety with proper status management.",
    color: "text-success",
    bgColor: "bg-success/10"
  },
  {
    icon: <FaClock className="text-4xl text-warning" />,
    title: "24/7 Availability",
    description: "Emergency blood requests can be created and responded to any time.",
    color: "text-warning",
    bgColor: "bg-warning/10"
  }
];

const ServicesSection = () => {
  return (
    <section className="py-16  md:py-24 bg-base-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            How We <span className="text-red-600">Help</span> Save Lives
          </h2>
          <p className="text-base-content/70 max-w-2xl mx-auto text-lg">
            Our platform makes blood donation simple, fast, and accessible for everyone in need.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {services.map((service, index) => (
            <div 
              key={index}
              className={`
                card bg-base-100 shadow-xl hover:shadow-2xl 
                transition-all duration-300 hover:-translate-y-1
                border border-base-300/50
                ${service.bgColor} bg-opacity-40
                overflow-hidden
              `}
            >
              <div className="card-body items-center text-center p-6 md:p-8">
                
                <div className={`
                  w-20 h-20 rounded-full flex items-center justify-center mb-4
                  ${service.bgColor} transition-transform duration-300
                  hover:scale-110
                `}>
                  {service.icon}
                </div>
                
                <h3 className={`text-xl font-bold mb-2 ${service.color}`}>
                  {service.title}
                </h3>
                
                <p className="text-sm text-base-content/70 mb-4">
                  {service.description}
                </p>

                {index === 0 && (
                  <Link 
                    to="/dashboard/Add-request"
                    className="btn bg-red-600 btn-sm mt-2"
                  >
                    Create Request
                  </Link>
                )}
                
                {index === 1 && (
                  <Link
                    to="/register"
                    className="btn btn-outline bg-red-600 btn-sm mt-2"
                  >
                    Join as Donor
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ServicesSection;
