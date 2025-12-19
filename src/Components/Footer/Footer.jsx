
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaHeart,
  FaTint,
} from "react-icons/fa";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-base-200 text-base-content">
      {/* Top Section */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* Logo & About */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <FaTint className="text-red-500 text-3xl" />
            <h2 className="text-2xl font-bold">
              Blood<span className="text-red-500">Care</span>
            </h2>
          </div>
          <p className="text-sm leading-relaxed">
            BloodCare is a blood donation platform connecting donors with
            patients in need. Together we save lives and spread hope.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="footer-title">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="link link-hover">Home</Link>
            </li>
            <li>
              <Link to="/donation-request" className="link link-hover">Donation Requests</Link>
            </li>
            <li>
              <Link to="/search-request" className="link link-hover">Search Donors</Link>
            </li>
            <li>
              <Link to="/dashboard" className="link link-hover">Dashboard</Link>
            </li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="footer-title">Support</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="link link-hover">Contact Us</Link>
            </li>
            <li>
              <Link to="/" className="link link-hover">FAQ</Link>
            </li>
            <li>
              <Link to="/" className="link link-hover">Privacy Policy</Link>
            </li>
            <li>
              <Link to="/" className="link link-hover">Terms & Conditions</Link>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="footer-title">Follow Us</h3>
          <div className="flex gap-4 mt-3">

            <a href="https://www.facebook.com/farhan.ahamed.siam.2024" target="_blank" rel="noreferrer" className="btn btn-circle btn-outline">
              <FaFacebookF />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="btn btn-circle btn-outline">
              <FaTwitter />
            </a>
            <a href="https://www.instagram.com/siam.farhanahamed/" target="_blank" rel="noreferrer" className="btn btn-circle btn-outline">
              <FaInstagram />
            </a>
            <a href="https://www.linkedin.com/in/md-siam-b48ab1352/" target="_blank" rel="noreferrer" className="btn btn-circle btn-outline">
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-base-300">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-2 text-sm">
          <p>
            © {new Date().getFullYear()} BloodCare. All rights reserved.
          </p>
          <p className="flex items-center gap-1">
            Made with <FaHeart className="text-red-500" /> to save lives
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;