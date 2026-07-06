import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/userSlice";
import { FaUserCircle, FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const { isAuthenticated, user } = useSelector((state) => state.user);

  const handleLogout = async () => {
    await dispatch(logout());
    navigate("/");
    setOpen(false);
  };

  return (
    <header className="relative z-50 lg:px-16 px-4 bg-white flex flex-col md:flex-row md:items-center py-3 shadow-md shadow-green-800/15">

      {/* Top row */}
      <div className="flex items-center w-full">
        <div className="flex-1">
          <Link to="/" className="text-3xl font-semibold tracking-wider">
            <span className="text-yellow-700">X</span>
            <span className="text-cyan-700">p</span>
            <span className="text-yellow-700">l</span>
            <span className="text-cyan-700">o</span>
            <span className="text-yellow-700">r</span>
            <span className="text-cyan-700">e</span>
            <span className="text-yellow-700">.</span>
            <span className="text-cyan-700">.</span>
            <span className="text-yellow-700">.</span>
          </Link>
        </div>

        <button
          className="md:hidden text-2xl text-cyan-800"
          onClick={() => setOpen(!open)}
        >
          {open ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Desktop nav */}
      <nav className="hidden md:flex gap-6 text-cyan-800 font-medium">
        <Link to="/">Home</Link>
        <Link to="/aboutus">About</Link>
        <Link to="/booking">Bookings</Link>
        <Link to="/contact">Contact</Link>
      </nav>

      {/* Desktop auth */}
      <div className="hidden md:flex items-center gap-4 ml-6">
        {!isAuthenticated ? (
          <>
            <Link to="/login">
              <button className="w-28 bg-yellow-700 text-white px-4 py-2 rounded">
                Login
              </button>
            </Link>
            <Link to="/signup">
              <button className="w-28 bg-cyan-700 text-white px-4 py-2 rounded">
                Sign Up
              </button>
            </Link>
          </>
        ) : (
          <>
            <div className="flex items-center gap-2 text-cyan-800 font-semibold">
              <FaUserCircle className="text-3xl text-stone-400" />
              <span className="capitalize md:w-24 lg:w-40 text-center">{user?.userName || "user"}</span>
              <span className="capitalize">{user?.role || "role"}</span>
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-4 py-2 rounded"
            >
              Logout
            </button>
          </>
        )}
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden w-full bg-white shadow-md mt-3">
          <nav className="flex flex-col gap-4 p-5 text-cyan-800 font-medium">
            <Link onClick={() => setOpen(false)} to="/">Home</Link>
            <Link onClick={() => setOpen(false)} to="/aboutus">About Us</Link>
            <Link onClick={() => setOpen(false)} to="/booking">Bookings</Link>
            <Link onClick={() => setOpen(false)} to="/contact">Contact</Link>

            <div className="pt-4 border-t">
              {!isAuthenticated ? (
                <div className="flex flex-col gap-3">
                  <Link to="/login">
                    <button className="w-full bg-yellow-700 text-white py-2 rounded">
                      Login
                    </button>
                  </Link>
                  <Link to="/signup">
                    <button className="w-full bg-cyan-700 text-white py-2 rounded">
                      Sign Up
                    </button>
                  </Link>
                </div>
              ) : (
                <button
                  onClick={handleLogout}
                  className="w-full bg-red-600 text-white py-2 rounded"
                >
                  Logout
                </button>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;

