import React from "react";
import { Helmet } from "react-helmet-async";
import { NavLink } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div>
      <Helmet>
        <title>404 Not Found</title>
      </Helmet>
      <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center bg-gray-50">
        <h1 className="font-bold text-green-600 text-7xl">404</h1>

        <h2 className="mt-4 text-2xl font-semibold text-gray-800">
          Page Not Found
        </h2>

        <p className="max-w-md mt-2 text-gray-600">
          Sorry, the page you are looking for doesn’t exist or has been moved.
        </p>

        <NavLink
          to="/"
          className="inline-block px-6 py-3 mt-6 text-white transition bg-green-500 rounded-lg hover:bg-green-600"
        >
          Go Back Home
        </NavLink>
      </div>
    </div>
  );
};

export default ErrorPage;
