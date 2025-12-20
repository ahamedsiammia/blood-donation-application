import { useEffect, useState } from "react";
import { FaHeartbeat, FaTint, FaHandsHelping } from "react-icons/fa";
import { Link } from "react-router";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetch("/Blog.json")
      .then(res => res.json())
      .then(data =>{ setBlogs(data)
         console.log(data)}); 
  }, []);

  const icons = [
    <FaHeartbeat className="text-red-500" size={30} />,
    <FaTint className="text-rose-500" size={30} />,
    <FaHandsHelping className="text-green-500" size={30} />,
  ];

  return (
    <section className="py-16 bg-base-200">
      <div className="max-w-6xl mx-auto px-4">

        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-red-600">
            Awareness Blogs
          </h2>
          <p className="text-gray-600 mt-3 max-w-xl mx-auto">
            Learn more about blood donation, eligibility, and the role of volunteers.
          </p>
        </div>

        {/* Blog Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog, index) => (
            <div
              key={blog.id}
              className="card bg-base-100 shadow-lg hover:shadow-xl transition duration-300"
            >
              <div className="card-body">

                {/* Icon */}
                <div className="w-14 h-14 rounded-full bg-base-200 flex items-center justify-center mb-4">
                  {icons[index]}
                </div>

                {/* Title */}
                <h3 className="text-xl font-semibold">
                  {blog.title}
                </h3>

                {/* Short content */}
                <p className="text-gray-600">
                  {blog.content.slice(0, 120)}...
                </p>

                {/* Button */}
                <div className="card-actions justify-end mt-4">
                  <Link
                    to={`/blogdetails/${blog.id}`}
                    className="btn btn-sm btn-outline btn-error"
                  >
                    Learn More
                  </Link>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Blog;
