import React, { useState } from "react";
import { Link } from "react-router-dom";

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mx-2">
      <div className=" flex flex-row justify-between items-center sm:block ">
        <Link to="/">
          <div className="mt-4 sm:text-center">
            <span className="text-black font-semibold font-ballo-tamma text-3xl sm:text-4xl  sm:text-center  ">
              file
            </span>
            <span className="text-filepass-blue font-ballo-tamma font-semibold text-3xl sm:text-4xl sm:text-center ">
              Pass
            </span>
          </div>
        </Link>
        <button
          className="block sm:hidden focus:outline-none m-6"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div
            className={`w-6 h-1 bg-filepass-blue my-1 transition-transform duration-300 ${
              isOpen ? "rotate-45 translateY(3px)" : ""
            }`}
          ></div>
          <div
            className={`w-6 h-1 bg-filepass-blue my-1 transition-transform duration-300 ${
              isOpen ? "opacity-0" : ""
            }`}
          ></div>
          <div
            className={`w-6 h-1 bg-filepass-blue my-1 transition-transform duration-300 ${
              isOpen ? "-rotate-45 translateY(-3px)" : ""
            } `}
          ></div>
        </button>
      </div>
      <h2 className="text-2xl font-bold mt-16 text-center">Share files</h2>
      <h2 className="text-2xl font-bold  text-center">
        securely and conveniently
      </h2>
    </div>
  );
}

export default Header;
