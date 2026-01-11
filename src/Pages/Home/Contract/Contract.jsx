import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa';

const Contract = () => {
    const contactItems = [
        { icon: <FaPhoneAlt className="text-2xl sm:text-3xl text-primary" />, title: "Phone", info: "+880 1956618840" },
        { icon: <FaEnvelope className="text-2xl sm:text-3xl text-secondary" />, title: "Email", info: "support@blooddonation.com" },
        { icon: <FaMapMarkerAlt className="text-2xl sm:text-3xl text-accent" />, title: "Address", info: "Dhaka, Bangladesh" },
    ];

    const formFields = [
        { label: "Your Name", type: "text", placeholder: "Enter your name" },
        { label: "Your Email", type: "email", placeholder: "Enter your email" },
    ];

    return (
        <section className="py-12 md:py-20 bg-base-200">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-8 md:mb-12">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-red-500 mb-3">
                        Contact With Us
                    </h2>
                    <p className="text-base-content max-w-xl mx-auto text-sm sm:text-base md:text-lg">
                        Have questions or need urgent support? Reach out to us anytime.
                        We are here to help save lives together.
                    </p>
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
                    {/* Contact Info */}
                    <div className="space-y-3 sm:space-y-4">
                        {contactItems.map((item, idx) => (
                            <div
                                key={idx}
                                className="flex items-center gap-3 sm:gap-4 p-4 sm:p-5 bg-base-100 rounded-2xl shadow min-h-[80px]"
                            >
                                <div>{item.icon}</div>
                                <div>
                                    <h4 className="font-semibold text-base sm:text-lg">{item.title}</h4>
                                    <p className="text-sm sm:text-base">{item.info}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Contact Form */}
                    <div className="bg-base-100 rounded-2xl shadow-lg p-4 sm:p-6 md:p-8">
                        <form className="space-y-3 sm:space-y-4">
                            {formFields.map((field, i) => (
                                <div key={i}>
                                    <label className="label">
                                        <span className="label-text font-medium">{field.label}</span>
                                    </label>
                                    <input
                                        type={field.type}
                                        placeholder={field.placeholder}
                                        className="input input-bordered w-full"
                                        required
                                    />
                                </div>
                            ))}

                            <div>
                                <label className="label">
                                    <span className="label-text font-medium">Message</span>
                                </label>
                                <textarea
                                    className="textarea textarea-bordered w-full h-24 sm:h-28"
                                    placeholder="Write your message..."
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                className="btn bg-red-500 text-white w-full mt-2"
                            >
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
};

export default Contract;
