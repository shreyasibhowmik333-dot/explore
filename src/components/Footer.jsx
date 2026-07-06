import React from 'react'
import "../App.css"
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <>
            <div className="container pt-10 pb-3 bg-amber-50 mx-auto px-4">
                <div className="flex flex-col lg:flex-row justify-between gap-10">

                    {/* Logo + text */}
                    <div className="max-w-md">
                        <a href="#" className="text-3xl font-semibold font-sans tracking-wider">
                            <span className="text-yellow-700">X</span>
                            <span className="text-cyan-800">p</span>
                            <span className="text-yellow-700">l</span>
                            <span className="text-cyan-800">o</span>
                            <span className="text-yellow-700">r</span>
                            <span className="text-cyan-800">e</span>
                            <span className="text-yellow-700">.</span>
                            <span className="text-cyan-800">.</span>
                            <span className="text-yellow-700">.</span>
                        </a>
                        <div className="ft-text pt-3 text-sm">
                            We love exploring and are all about giving you an awesome experience that you'll remember forever. Check out our story and what we stand for!
                        </div>
                    </div>
     
                    {/* Discover */}
                    <div className="text-xl font-semibold text-yellow-700">
                        Discover
                        <ul>
                            <Link to="/aboutus"><li className="text-sm font-normal pt-3 text-black hover:text-cyan-700">About Us</li></Link>
                            <Link><li className="text-sm font-normal pt-3 text-black hover:text-cyan-700">Destinations</li></Link>
                            <Link><li className="text-sm font-normal pt-3 text-black hover:text-cyan-700">Tour Package</li></Link>
                            <Link><li className="text-sm font-normal pt-3 text-black hover:text-cyan-700">Blogs</li></Link>
                            <Link><li className="text-sm font-normal pt-3 text-black hover:text-cyan-700">Licanse</li></Link>
                        </ul>
                    </div>

                    {/* Locations */}
                    <div className="text-xl font-semibold text-yellow-700">
                        Locations
                        <ul>
                            <Link><li className="text-sm font-normal pt-3 text-black hover:text-cyan-700">Paris</li></Link>
                            <Link><li className="text-sm font-normal pt-3 text-black hover:text-cyan-700">Bali</li></Link>
                            <Link><li className="text-sm font-normal pt-3 text-black hover:text-cyan-700">Dubai</li></Link>
                            <Link><li className="text-sm font-normal pt-3 text-black hover:text-cyan-700">Maldives</li></Link>
                            <Link><li className="text-sm font-normal pt-3 text-black hover:text-cyan-700">Thailand</li></Link>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="text-xl font-semibold text-yellow-700">
                        Contact US
                        <ul>
                            <Link><li className="text-sm font-normal pt-3 text-black hover:text-cyan-700">xplore@gamil.com</li></Link>
                            <Link><li className="text-sm font-normal pt-3 text-black hover:text-cyan-700">+123 456 789</li></Link>
                            <Link>
                                <li className="text-sm font-normal pt-3 text-black hover:text-cyan-700">
                                    123 Wanderer Street, <br /> Kolkata, West Bengal
                                </li>
                            </Link>
                        </ul>
                    </div>

                </div>
            </div>

            {/* Bottom bar */}
            <div className="bg-yellow-700 pt-3 flex flex-col sm:flex-row items-center justify-between gap-4 p-3">
                <div className="text-white font-medium text-center sm:text-left">
                    © 2026 Xplore travel world. Designed with love for explorers.
                </div>

                <div className="flex gap-5">
                    <div className="social-bg bg-white flex items-center justify-center text-xl text-yellow-700 hover:bg-gray-200 hover:text-cyan-700 hover:font-semibold transition duration-300">
                        <i className="fa-brands fa-facebook-f"></i>
                    </div>
                    <div className="social-bg bg-white flex items-center justify-center text-xl text-yellow-700 hover:bg-gray-200 hover:text-cyan-700 hover:font-semibold transition duration-300">
                        <i className="fa-brands fa-instagram"></i>
                    </div>
                    <div className="social-bg bg-white flex items-center justify-center text-xl text-yellow-700 hover:bg-gray-200 hover:text-cyan-700 hover:font-semibold transition duration-300">
                        <i className="fa-brands fa-x-twitter"></i>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Footer
