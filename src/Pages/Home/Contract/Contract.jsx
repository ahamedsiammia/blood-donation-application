import React from 'react';
import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa';

const Contract = () => {
    return (
            <section className="py-16 bg-base-200">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-red-500 mb-4">
            Contact With Us
          </h2>
          <p className="text-base-content max-w-2xl mx-auto">
            Have questions or need urgent support? Reach out to us anytime.
            We are here to help save lives together.
          </p>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          
          {/* Contact Info */}
          <div className="space-y-6">
            <div className="flex items-center gap-4 p-6 bg-base-100 rounded-2xl shadow">
              <FaPhoneAlt className="text-3xl text-primary" />
              <div>
                <h4 className="font-semibold text-lg">Phone</h4>
                <p className="text-sm text-base-content">
                  +880 1234 567 890
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-6 bg-base-100 rounded-2xl shadow">
              <FaEnvelope className="text-3xl text-secondary" />
              <div>
                <h4 className="font-semibold text-lg">Email</h4>
                <p className="text-sm text-base-content">
                  support@blooddonation.com
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-6 bg-base-100 rounded-2xl shadow">
              <FaMapMarkerAlt className="text-3xl text-accent" />
              <div>
                <h4 className="font-semibold text-lg">Address</h4>
                <p className="text-sm text-base-content">
                  Dhaka, Bangladesh
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-base-100 rounded-2xl shadow-xl p-8">
            <form className="space-y-4">
              
              <div>
                <label className="label">
                  <span className="label-text font-medium">Your Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="input input-bordered w-full"
                  required
                />
              </div>

              <div>
                <label className="label">
                  <span className="label-text font-medium">Your Email</span>
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="input input-bordered w-full"
                  required
                />
              </div>

              <div>
                <label className="label">
                  <span className="label-text font-medium">Message</span>
                </label>
                <textarea
                  className="textarea textarea-bordered w-full h-32"
                  placeholder="Write your message..."
                  required
                ></textarea>
              </div>

              <button className="btn bg-red-500 text-white w-full">
                Send Message
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
    );
};

export default Contract;