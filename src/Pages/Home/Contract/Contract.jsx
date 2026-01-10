import { motion } from 'framer-motion';
import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa';

const Contract = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { 
            opacity: 0, 
            x: -50,
            scale: 0.9
        },
        visible: { 
            opacity: 1, 
            x: 0,
            scale: 1,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    };

    const formVariants = {
        hidden: { 
            opacity: 0, 
            x: 50,
            scale: 0.9
        },
        visible: { 
            opacity: 1, 
            x: 0,
            scale: 1,
            transition: {
                duration: 0.8,
                ease: "easeOut"
            }
        }
    };

    return (
            <section className="py-20 bg-base-200">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Section Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.h2 
            className="text-4xl font-bold text-red-500 mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Contact With Us
          </motion.h2>
          <motion.p 
            className="text-base-content max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Have questions or need urgent support? Reach out to us anytime.
            We are here to help save lives together.
          </motion.p>
        </motion.div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          
          {/* Contact Info */}
          <motion.div 
            className="space-y-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div 
              className="flex items-center gap-4 p-6 bg-base-100 rounded-2xl shadow"
              variants={itemVariants}
              whileHover={{ 
                scale: 1.02, 
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
                x: 10
              }}
            >
              <motion.div
                whileHover={{ rotate: 360, scale: 1.2 }}
                transition={{ duration: 0.6 }}
              >
                <FaPhoneAlt className="text-3xl text-primary" />
              </motion.div>
              <div>
                <h4 className="font-semibold text-lg">Phone</h4>
                <p className="text-sm text-base-content">
                  +880 1234 567 890
                </p>
              </div>
            </motion.div>

            <motion.div 
              className="flex items-center gap-4 p-6 bg-base-100 rounded-2xl shadow"
              variants={itemVariants}
              whileHover={{ 
                scale: 1.02, 
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
                x: 10
              }}
            >
              <motion.div
                whileHover={{ rotate: 360, scale: 1.2 }}
                transition={{ duration: 0.6 }}
              >
                <FaEnvelope className="text-3xl text-secondary" />
              </motion.div>
              <div>
                <h4 className="font-semibold text-lg">Email</h4>
                <p className="text-sm text-base-content">
                  support@blooddonation.com
                </p>
              </div>
            </motion.div>

            <motion.div 
              className="flex items-center gap-4 p-6 bg-base-100 rounded-2xl shadow"
              variants={itemVariants}
              whileHover={{ 
                scale: 1.02, 
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
                x: 10
              }}
            >
              <motion.div
                whileHover={{ rotate: 360, scale: 1.2 }}
                transition={{ duration: 0.6 }}
              >
                <FaMapMarkerAlt className="text-3xl text-accent" />
              </motion.div>
              <div>
                <h4 className="font-semibold text-lg">Address</h4>
                <p className="text-sm text-base-content">
                  Dhaka, Bangladesh
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            className="bg-base-100 rounded-2xl shadow-xl p-8"
            variants={formVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <form className="space-y-4">
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <label className="label">
                  <span className="label-text font-medium">Your Name</span>
                </label>
                <motion.input
                  type="text"
                  placeholder="Enter your name"
                  className="input input-bordered w-full"
                  required
                  whileFocus={{ scale: 1.02, borderColor: "#ef4444" }}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <label className="label">
                  <span className="label-text font-medium">Your Email</span>
                </label>
                <motion.input
                  type="email"
                  placeholder="Enter your email"
                  className="input input-bordered w-full"
                  required
                  whileFocus={{ scale: 1.02, borderColor: "#ef4444" }}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <label className="label">
                  <span className="label-text font-medium">Message</span>
                </label>
                <motion.textarea
                  className="textarea textarea-bordered w-full h-32"
                  placeholder="Write your message..."
                  required
                  whileFocus={{ scale: 1.02, borderColor: "#ef4444" }}
                ></motion.textarea>
              </motion.div>

              <motion.button 
                className="btn bg-red-500 text-white w-full"
                whileHover={{ 
                  scale: 1.05, 
                  backgroundColor: "#dc2626",
                  boxShadow: "0 10px 25px rgba(220, 38, 38, 0.3)"
                }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                Send Message
              </motion.button>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
    );
};

export default Contract;