import { FaHeartbeat, FaHandsHelping, FaUsers } from "react-icons/fa";

const About = () => {
  return (
    <section className="py-12 md:py-20 bg-base-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            About <span className="text-red-500">Us</span>
          </h2>
          <p className="text-base-content/70 max-w-2xl mx-auto text-sm sm:text-base md:text-lg">
            We are committed to saving lives by connecting blood donors with those in need —
            quickly, safely, and reliably.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">

          {/* Text Content */}
          <div className="space-y-5">
            <h3 className="text-2xl font-semibold">
              Who We Are
            </h3>
            <p className="text-base-content/80 leading-relaxed">
              Our blood donation platform is built to help patients find blood donors
              during emergencies and encourage voluntary blood donation across the country.
              We believe no life should be lost due to lack of blood.
            </p>

            <p className="text-base-content/80 leading-relaxed">
              With the help of donors, volunteers, and administrators, we ensure fast response,
              secure data handling, and real-time communication between donors and receivers.
            </p>
          </div>

          {/* Image */}
          <div className="flex justify-center">
            <img
              src="https://i.pinimg.com/1200x/db/cd/1d/dbcd1dd88f1f3b4a2f391921c82a77e2.jpg"
              alt="Blood Donation"
              className="rounded-2xl shadow-lg max-h-96 object-cover"
            />
          </div>
        </div>

        {/* Mission / Vision / Community - with animation */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-14">

          {/* Mission Card */}
          <div className="group bg-base-100 rounded-2xl p-6 shadow-md text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-2 hover:border-red-200 border border-transparent">
            <div className="transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
              <FaHeartbeat className="text-4xl text-red-500 mx-auto mb-4" />
            </div>
            <h4 className="text-xl font-semibold mb-2">Our Mission</h4>
            <p className="text-sm text-base-content/70">
              To ensure timely access to safe blood for everyone through technology and community support.
            </p>
          </div>

          {/* Vision Card */}
          <div className="group bg-base-100 rounded-2xl p-6 shadow-md text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-2 hover:border-red-200 border border-transparent">
            <div className="transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6">
              <FaUsers className="text-4xl text-red-500 mx-auto mb-4" />
            </div>
            <h4 className="text-xl font-semibold mb-2">Our Vision</h4>
            <p className="text-sm text-base-content/70">
              A future where voluntary blood donation is a habit and no patient suffers due to blood shortage.
            </p>
          </div>

          {/* Community Card */}
          <div className="group bg-base-100 rounded-2xl p-6 shadow-md text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-2 hover:border-red-200 border border-transparent">
            <div className="transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
              <FaHandsHelping className="text-4xl text-red-500 mx-auto mb-4" />
            </div>
            <h4 className="text-xl font-semibold mb-2">Our Community</h4>
            <p className="text-sm text-base-content/70">
              Donors, volunteers, and organizations working together to save lives every day.
            </p>
          </div>

        </div>

        {/* Call to Action */}
        <div className="text-center mt-14">
          <h3 className="text-2xl sm:text-3xl font-bold mb-4">
            Join Our Life-Saving Community
          </h3>
          <p className="text-base-content/70 max-w-2xl mx-auto mb-6">
            Become a donor or volunteer today and help save lives. Every drop counts!
          </p>
          <a
            href="/register"
            className="btn bg-red-500 text-white px-6 py-3 hover:bg-red-600 transition-colors duration-300"
          >
            Join Now
          </a>
        </div>

      </div>
    </section>
  );
};

export default About;