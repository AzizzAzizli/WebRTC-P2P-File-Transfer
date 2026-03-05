import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex min-h-[calc(100vh-80px)] w-full items-center justify-center px-4 pb-10 pt-6">
      <div className="relative mx-auto flex w-full max-w-4xl flex-col items-center gap-8 rounded-3xl border border-cyan-500/15 bg-slate-950/80 p-8 shadow-[0_0_50px_rgba(15,23,42,0.9)] backdrop-blur-xl text-center md:p-12">
        {/* 404 Icon */}
        <div className="relative">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 shadow-[0_0_30px_rgba(34,211,238,0.4)] md:h-32 md:w-32">
            <svg
              className="h-12 w-12 text-white md:h-16 md:w-16"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-.98-5.5-2.5M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2z"
              />
            </svg>
          </div>
          <div className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.8)] md:h-8 md:w-8"></div>
        </div>

        {/* Content */}
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-white md:text-6xl">404</h1>
          <h2 className="text-xl font-semibold text-cyan-300 md:text-2xl">
            Page Not Found
          </h2>
          <p className="text-base text-slate-300 md:text-lg max-w-md">
            The page you're looking for doesn't exist or has been moved. Let's
            get you back on track!
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-[0_0_20px_rgba(34,211,238,0.3)] transition-all hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(34,211,238,0.5)] hover:scale-105"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            Go Home
          </Link>


        </div>

        {/* Additional Info */}
        <div className="mt-8 rounded-2xl border border-slate-700/50 bg-slate-900/50 p-4 text-sm text-slate-400 md:p-6">
          <p className="mb-2 font-medium text-cyan-300">What happened?</p>
          <p>
            This could be due to a mistyped URL, an outdated link, or the page
            might have been removed. If you believe this is an error, please
            contact support.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
