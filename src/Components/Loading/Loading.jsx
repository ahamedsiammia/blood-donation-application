import React from "react";
import { GiBrokenHeartZone } from "react-icons/gi";

const Loading = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-base-200">
      
      {/* Blood Drop */}
      <div className="relative">
        <div className="w-26 h-26 bg-red-600 rounded-full animate-ping absolute opacity-75"></div>
        <div className="w-26 h-26 bg-red-600 rounded-full flex items-center justify-center">
          <GiBrokenHeartZone color="white" size={40} />
        </div>
      </div>

      {/* Spinner */}
      <span className="loading loading-spinner loading-lg text-red-600 mt-6"></span>

      {/* Text */}
      <p className="mt-4 text-2xl font-semibold text-red-700">
        Finding blood donors...
      </p>
      <p className="text-lg text-gray-500">
        Please wait a moment
      </p>
    </div>
  );
};

export default Loading;
