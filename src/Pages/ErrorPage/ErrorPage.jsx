import { FaExclamationTriangle, FaHome } from "react-icons/fa";
import { Link } from "react-router";

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 via-white to-rose-100 px-4">
      <div className="text-center max-w-md">

        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 rounded-full bg-red-100 flex items-center justify-center">
            <FaExclamationTriangle className="text-red-600" size={48} />
          </div>
        </div>

        {/* Error Code */}
        <h1 className="text-6xl font-extrabold text-red-600 mb-4">
          404
        </h1>

        {/* Title */}
        <h2 className="text-2xl font-semibold mb-3">
          Page Not Found
        </h2>

        {/* Description */}
        <p className="text-gray-600 mb-8">
          Sorry, the page you are looking for does not exist or may have been moved.
        </p>

        {/* Button */}
        <Link to="/" className="btn btn-error gap-2">
          <FaHome />
          Back to Home
        </Link>

      </div>
    </div>
  );
};

export default ErrorPage;
