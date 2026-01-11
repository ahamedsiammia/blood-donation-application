import { FaQuoteLeft, FaStar } from "react-icons/fa";

const testimonials = [
  {
    name: "Rahim Uddin",
    role: "Blood Donor",
    image: "https://i.pravatar.cc/150?img=12",
    rating: 5,
    message:
      "This platform made blood donation extremely easy. I was contacted within minutes and felt proud to help someone in need.",
  },
  {
    name: "Nusrat Jahan",
    role: "Blood Receiver",
    image: "https://i.pravatar.cc/150?img=32",
    rating: 5,
    message:
      "Thanks to this website, I found a donor for my father during an emergency. Truly life-saving service!",
  },
  {
    name: "Imran Hossain",
    role: "Volunteer",
    image: "https://i.pravatar.cc/150?img=45",
    rating: 4,
    message:
      "Managing requests and helping people through this platform has been an amazing experience.",
  },
];

const Testimonials = () => {
  return (
    <section className="py-12 md:py-20 bg-base-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-10 md:mb-14">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3">
            What People <span className="text-red-500">Say</span>
          </h2>
          <p className="text-base-content/70 max-w-2xl mx-auto text-sm sm:text-base md:text-lg">
            Real stories from donors, receivers, and volunteers who are part of our life-saving community.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((item, index) => (
            <div
  key={index}
  className={`
    bg-base-200 rounded-2xl p-6 shadow-md border border-base-300/40
    transition-all duration-300
    hover:shadow-xl hover:-translate-y-2 hover:border-red-300/40
    group
  `}
>
  {/* Quote Icon */}
  <div className="transition-transform duration-300 group-hover:scale-110 group-hover:text-red-500">
    <FaQuoteLeft className="text-2xl text-red-400 mb-3" />
  </div>

  {/* Message */}
  <p className="text-sm sm:text-base text-base-content/80 mb-4 leading-relaxed">
    {item.message}
  </p>

  {/* Rating */}
  <div className="flex gap-1 mb-4">
    {[...Array(item.rating)].map((_, i) => (
      <FaStar
        key={i}
        className="text-yellow-400 text-sm transition-transform duration-300 group-hover:scale-110"
        style={{ animationDelay: `${i * 80}ms` }}
      />
    ))}
  </div>

  {/* User Info */}
  <div className="flex items-center gap-4 transition-transform duration-300 group-hover:translate-x-1">
    <img
      src={item.image}
      alt={item.name}
      className="w-12 h-12 rounded-full object-cover border-2 border-red-400 transition-all duration-300 group-hover:border-red-500 group-hover:scale-110"
    />
    <div>
      <h4 className="font-semibold text-base sm:text-lg group-hover:text-red-600 transition-colors">
        {item.name}
      </h4>
      <p className="text-xs sm:text-sm text-base-content/60">
        {item.role}
      </p>
    </div>
  </div>
</div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Testimonials;
