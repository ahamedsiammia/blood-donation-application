import React from 'react';
import { Link, useLoaderData } from 'react-router';

const blogdetails = () => {
    const blogs = useLoaderData()
    console.log(blogs);
    return (
        <div className="min-h-screen  font-sans">
      {/* Main Container */}
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        
        {/* Header Image Section */}
        <div className="relative w-full h-[400px] rounded-xl overflow-hidden shadow-2xl mb-12">
          <img 
            src={blogs.image} 
            alt="Blood Donation Illustration" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent flex items-center p-8">
            <div className="bg-white/90 p-4 rounded-lg shadow-lg">
              <span className="text-red-600 font-bold text-xl uppercase tracking-widest">Donate Life</span>
            </div>
          </div>
        </div>

        {/* Title Section */}
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-rose-600 mb-4 leading-tight">
            {blogs.title}
          </h1>
          <div className="h-1.5 w-32 bg-rose-500 mx-auto rounded-full"></div>
        </header>

        {/* Content Section */}
        <article className="space-y-8 text-gray-400 leading-relaxed text-lg">
          
          <section>
            <p>
              <span className="font-bold text-gray-400">Introduction:</span> Welcome to our blood donation website! 
              At the heart of our mission lies a simple yet profound act: donating blood. In this blog post, 
              we'll delve into the importance of blood donation, exploring its impact on individuals, 
              communities, and beyond.
            </p>
          </section>

          <section className="bg-white p-6 rounded-lg border-l-4 border-rose-500 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-400 mb-2">Why Donate Blood?</h2>
            <p>
              Every two seconds, someone in the world needs blood. From emergency surgeries to ongoing 
              treatments for conditions like cancer and anemia, blood transfusions save millions of lives 
              each year. Yet, despite its critical role, blood shortages are a reality in many parts of the world.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{blogs.author}</h2>
            <p>
             {blogs.content}
            </p>
          </section>

        </article>


      </div>
    </div>
    );
};

export default blogdetails;