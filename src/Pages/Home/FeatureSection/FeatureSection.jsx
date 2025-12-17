import React from 'react';
import { FaHandHoldingHeart, FaHeartbeat, FaUsers } from 'react-icons/fa';

const FeatureSection = () => {
    return (
         <section className="py-16 bg-base-100">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-primary mb-4">
            Why Choose Our Blood Donation Platform?
          </h2>
          <p className="text-base-content max-w-2xl mx-auto">
            We connect donors, volunteers, and patients through a transparent
            and life-saving blood donation system.
          </p>
        </div>

        {/* Featured Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Card 1 */}
          <div className="card bg-base-200 shadow-xl hover:shadow-2xl transition">
            <div className="card-body items-center text-center">
              <FaHandHoldingHeart className="text-5xl text-primary mb-4" />
              <h3 className="card-title text-xl font-semibold">
                Save Lives Easily
              </h3>
              <p className="text-sm text-base-content">
                Request or donate blood in just a few clicks and help patients
                get life-saving support instantly.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="card bg-base-200 shadow-xl hover:shadow-2xl transition">
            <div className="card-body items-center text-center">
              <FaUsers className="text-5xl text-secondary mb-4" />
              <h3 className="card-title text-xl font-semibold">
                Trusted Community
              </h3>
              <p className="text-sm text-base-content">
                Join a verified network of donors, volunteers, and organizations
                working together for humanity.
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="card bg-base-200 shadow-xl hover:shadow-2xl transition">
            <div className="card-body items-center text-center">
              <FaHeartbeat className="text-5xl text-accent mb-4" />
              <h3 className="card-title text-xl font-semibold">
                Emergency Ready
              </h3>
              <p className="text-sm text-base-content">
                Quickly find donors during emergencies with real-time blood
                request tracking and updates.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
    );
};

export default FeatureSection;