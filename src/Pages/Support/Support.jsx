import { FaQuestionCircle, FaEnvelope, FaPhoneAlt } from "react-icons/fa";

const Support = () => {
  return (
    <>


      <section className="py-16 bg-base-200">
        <div className="max-w-6xl mx-auto px-4">

          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Support <span className="text-red-500">Center</span>
            </h2>
            <p className="text-base-content/70 max-w-2xl mx-auto">
              Need help? We’re here to support donors, volunteers, and patients anytime.
            </p>
          </div>

          {/* Support Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            <div className="bg-base-100 rounded-2xl shadow p-6 text-center">
              <FaQuestionCircle className="text-4xl text-red-500 mx-auto mb-4" />
              <h4 className="text-xl font-semibold mb-2">FAQs</h4>
              <p className="text-sm text-base-content/70">
                Find answers to common questions about blood donation and requests.
              </p>
            </div>

            <div className="bg-base-100 rounded-2xl shadow p-6 text-center">
              <FaEnvelope className="text-4xl text-red-500 mx-auto mb-4" />
              <h4 className="text-xl font-semibold mb-2">Email Support</h4>
              <p className="text-sm text-base-content/70">
                support@bloodcare.com  
                <br />
                Response within 24 hours
              </p>
            </div>

            <div className="bg-base-100 rounded-2xl shadow p-6 text-center">
              <FaPhoneAlt className="text-4xl text-red-500 mx-auto mb-4" />
              <h4 className="text-xl font-semibold mb-2">Hotline</h4>
              <p className="text-sm text-base-content/70">
                +880 1956-618-840  
                <br />
                Available 24/7
              </p>
            </div>

          </div>

          {/* Contact Form */}
          <div className="mt-16 bg-base-100 rounded-2xl shadow-lg p-6 md:p-10">
            <h3 className="text-2xl font-bold mb-6 text-center">
              Contact Support
            </h3>

            <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Your Name"
                className="input input-bordered w-full"
                required
              />

              <input
                type="email"
                placeholder="Your Email"
                className="input input-bordered w-full"
                required
              />

              <textarea
                className="textarea textarea-bordered md:col-span-2 h-32"
                placeholder="Describe your issue..."
                required
              ></textarea>

              <button
                type="submit"
                className="btn bg-red-500 text-white md:col-span-2"
              >
                Submit Request
              </button>
            </form>
          </div>

        </div>
      </section>
    </>
  );
};

export default Support;
