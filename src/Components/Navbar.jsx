import React, { useState } from "react";
import Container from "../Layouts/Container";
import Flex from "../Layouts/Flex";
import List from "../Layouts/List";
import logo from "../assets/logo.svg";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { removeAuth } from "../Redux/slices/authSlice";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const auth = useSelector((state) => state.authSlice.auth);
  const dispatch = useDispatch();

  // Dropdown toggle
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  // Logout handler
  const handleLogout = () => {
    dispatch(removeAuth());
    setDropdownOpen(false); // Close dropdown
  };

  // Navigation links
  const navList = [
    { name: "Home", link: "/" },
    { name: "Course Form", link: "/courseForm" },
  ];

  return (
    <nav className="px-6 py-4 bg-white shadow-lg border-b border-gray-200">
      <Container>
        <Flex className="items-center justify-between">
          {/* Logo */}
          <div>
            <Link to="/">
              <img src={logo} alt="Logo" className="h-10" />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <List className="hidden md:flex flex-1 justify-center space-x-8 text-black">
            {navList.map(({ name, link }) => (
              <li
                key={name}
                className="text-lg font-medium hover:text-blue-600 transition-colors duration-300"
              >
                <Link to={link}>{name}</Link>
              </li>
            ))}
          </List>

          {/* Avatar and Dropdown */}
          <div className="relative">
            <FaUserCircle
              size={30}
              className="text-gray-700 cursor-pointer hover:text-blue-500"
              onClick={toggleDropdown}
            />
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 bg-white rounded-lg shadow-lg">
                {auth ? (
                  <button
                    className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                ) : (
                  <>
                    <Link to="/signUp">
                      <button className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100">
                        Sign Up
                      </button>
                    </Link>
                    <Link to="/signIn">
                      <button className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100">
                        Login
                      </button>
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>
        </Flex>

        {/* Mobile Navigation */}
        <div className="md:hidden mt-4">
          {dropdownOpen && (
            <div className="mt-2 bg-white rounded-lg shadow-lg">
              {navList.map(({ name, link }) => (
                <Link
                  to={link}
                  key={name}
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  {name}
                </Link>
              ))}
            </div>
          )}
        </div>
      </Container>
    </nav>
  );
};

export default Navbar;
