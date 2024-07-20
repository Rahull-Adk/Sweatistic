import React from "react";

const Navbar = () => {
  return (
    <nav className="flex justify-between">
      <div className="bg-gray-800 text-white text-4xl p-4">Sweatastic</div>
      <div>
        <ul className="flex gap-x-10 m-4">
          <li>
            <a href="">Home</a>
          </li>
          <li>
            <a href="">Register</a>
          </li>
          <li>
            <a href="">Login</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
