import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <div className="flex flex-1 w-full min-h-screen flex-col items-center justify-center text-center px-4 py-20">
        <Link to="/login">
          <p className="text-base font-semibold">Login</p>
        </Link>
        <Link to="/register">
          <p className="text-base font-semibold">Register</p>
        </Link>
      </div>
    </div>
  );
};

export default Home;
