import { motion } from 'framer-motion';
import { FaShieldAlt, FaClock, FaGlobe, FaUserMd, FaHeart, FaAward } from 'react-icons/fa';

const Features = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2
            }
        }
    };

    const featureVariants = {
        hidden: { 
            opacity: 0, 
            y: 60,
            scale: 0.8
        },
        visible: { 
            opacity: 1, 
            y: 0,
            scale: 1,
            transition: {
                duration: 0.7,
                ease: "easeOut"
            }
        }
    };

    const iconVariants = {
        hidden: { scale: 0, rotate: -180 },
        visible: { 
            scale: 1, 
            rotate: 0,
            transition: {
                type: "spring",
                stiffness: 200,
                damping: 15
            }
        }
    };

    const features = [
        {
            icon: FaShieldAlt,
            title: "Secure & Safe",
            description: "All donor information is encrypted and protected with advanced security measures.",
            color: "text-blue-500",
            bgColor: "bg-blue-50",
            delay: 0.1
        },
        {
            icon: FaClock,
            title: "24/7 Available",
            description: "Round-the-clock service for emergency blood requests and donor matching.",
            color: "text-green-500",
            bgColor: "bg-green-50",
            delay: 0.2
        },
        {
            icon: FaGlobe,
            title: "Global Network",
            description: "Connect with donors worldwide through our extensive network platform.",
            color: "text-purple-500",
            bgColor: "bg-purple-50",
            delay: 0.3
        },
        {
            icon: FaUserMd,
            title: "Medical Support",
            description: "Professional medical guidance and support throughout the donation process.",
            color: "text-red-500",
            bgColor: "bg-red-50",
            delay: 0.4
        },
        {
            icon: FaHeart,
            title: "Life Saving",
            description: "Every donation has the potential to save up to three lives in emergency situations.",
            color: "text-pink-500",
            bgColor: "bg-pink-50",
            delay: 0.5
        },
        {
            icon: FaAward,
            title: "Recognition",
            description: "Get recognized for your contributions and track your donation impact.",
            color: "text-yellow-500",
            bgColor: "bg-yellow-50",
            delay: 0.6
        }
    ];

    return (
        <section className="py-20 bg-gradient-to-br from-base-100 to-base-200">
            <div className="max-w-7xl mx-auto px-4">
                
                {/* Section Header */}
                <motion.div 
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="inline-block"
                    >

                    </motion.div>
                    
                    <motion.h2 
                        className="text-5xl font-bold text-gray-800 mb-6"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                    >
                        Why Choose Our 
                        <span className="text-red-500 block">Blood Donation Platform</span>
                    </motion.h2>
                    
                    <motion.p 
                        className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                    >
                        Experience the most advanced and user-friendly blood donation platform 
                        designed to save lives and connect communities worldwide.
                    </motion.p>
                </motion.div>

                {/* Features Grid */}
                <motion.div 
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    {features.map((feature, index) => {
                        const IconComponent = feature.icon;
                        return (
                            <motion.div
                                key={index}
                                variants={featureVariants}
                                whileHover={{ 
                                    y: -15, 
                                    scale: 1.03,
                                    boxShadow: "0 25px 50px rgba(0, 0, 0, 0.15)"
                                }}
                                className="group relative"
                            >
                                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 h-full">
                                    
                                    {/* Animated Background Gradient */}
                                    <motion.div
                                        className="absolute inset-0 bg-gradient-to-br from-red-50 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                        initial={false}
                                    />
                                    
                                    {/* Icon Container */}
                                    <motion.div 
                                        className={`relative w-16 h-16 ${feature.bgColor} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                                        variants={iconVariants}
                                        whileHover={{ rotate: 360 }}
                                        transition={{ duration: 0.6 }}
                                    >
                                        <IconComponent className={`text-2xl ${feature.color}`} />
                                    </motion.div>

                                    {/* Content */}
                                    <div className="relative">
                                        <motion.h3 
                                            className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-red-600 transition-colors duration-300"
                                            initial={{ opacity: 0, x: -20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.6, delay: feature.delay }}
                                        >
                                            {feature.title}
                                        </motion.h3>
                                        
                                        <motion.p 
                                            className="text-gray-600 leading-relaxed"
                                            initial={{ opacity: 0, x: -20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.6, delay: feature.delay + 0.1 }}
                                        >
                                            {feature.description}
                                        </motion.p>
                                    </div>

                                    {/* Decorative Element */}
                                    <motion.div
                                        className="absolute top-4 right-4 w-2 h-2 bg-red-400 rounded-full opacity-0 group-hover:opacity-100"
                                        initial={{ scale: 0 }}
                                        whileInView={{ scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.4, delay: feature.delay + 0.2 }}
                                    />
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>

                {/* Call to Action */}
                <motion.div 
                    className="text-center mt-16"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                >

                </motion.div>
            </div>
        </section>
    );
};

export default Features;