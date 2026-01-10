// src/components/Home/NewsletterSection.jsx
import React, { useState } from 'react';
import { FaEnvelope, FaPaperPlane } from 'react-icons/fa';

const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); 

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!email.trim()) return;
    
    setStatus('loading');
    

    setTimeout(() => {
      if (Math.random() > 0.2) {
        setStatus('success');
        setEmail('');
      } else {
        setStatus('error');
      }
    }, 1200);
  };

  return (
    <section className="py-16 md:py-20 text-red-600">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="card bg-base-100 shadow-2xl border border-base-300/20 overflow-hidden rounded-2xl">
            <div className="card-body p-8 md:p-12 lg:p-16 text-center">
              {/* Icon */}
              <div className="mx-auto mb-6">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                  <FaEnvelope className="text-4xl " />
                </div>
              </div>

              {/* Heading */}
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                Stay Updated with Us
              </h2>

              <p className="text-base-content/70 text-lg md:text-xl mb-8 max-w-2xl mx-auto">
                Subscribe to our newsletter and get the latest blood donation requests, 
                success stories, and urgent alerts directly in your inbox.
              </p>

              {/* Form */}
              <form 
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto"
              >
                <div className="relative flex-1">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="input input-bordered input-lg w-full pr-12 focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                    disabled={status === 'loading' || status === 'success'}
                  />

                </div>

                <button
                  type="submit"
                  className={`
                    btn bg-red-600 btn-lg gap-2 min-w-[160px]
                    ${status === 'loading' ? 'loading' : ''}
                    ${status === 'success' ? 'btn-success' : ''}
                    ${status === 'error' ? 'btn-error' : ''}
                  `}
                  disabled={status === 'loading' || status === 'success'}
                >
                  {status === 'loading' && <span className="loading loading-spinner"></span>}
                  {status === 'idle' && (
                    <>
                      <FaPaperPlane /> Subscribe
                    </>
                  )}
                  {status === 'success' && "Subscribed!"}
                  {status === 'error' && "Try Again"}
                </button>
              </form>

              {/* Status Messages */}
              {status === 'success' && (
                <div className="alert alert-success mt-6 max-w-xl mx-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Thank you! You've been subscribed successfully.</span>
                </div>
              )}

              {status === 'error' && (
                <div className="alert alert-error mt-6 max-w-xl mx-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Something went wrong. Please try again.</span>
                </div>
              )}

              {/* Privacy note */}
              <p className="text-sm text-base-content/60 mt-8">
                We respect your privacy. You can unsubscribe at any time.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;