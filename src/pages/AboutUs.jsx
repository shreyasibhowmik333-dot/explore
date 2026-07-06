import React from 'react';
import aboutus1 from "../assets/journey.png";
import aboutus2 from "../assets/Culture.webp";
import { GrLocation } from "react-icons/gr";
import { MdOutlineFlight } from "react-icons/md";
import { GiWorld } from "react-icons/gi";
import { IoIosSettings } from "react-icons/io";
import { IoDocumentsSharp } from "react-icons/io5";
import { AiFillInsurance } from "react-icons/ai";
import team_img1 from "../assets/team1.webp";
import team_img2 from "../assets/team2.webp";
import team_img3 from "../assets/team3.webp";
import team_img4 from "../assets/team4.webp";
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

const AboutUs = () => {
    return (
        <>
        <Navbar />
            <div className="container mx-auto px-4">
                <div>
                    <div className='about-h1 text-4xl sm:text-5xl lg:text-6xl font-medium text-center mt-10 max-w-2xl m-auto leading-snug sm:leading-20 tracking-wide'>
                        <span className='text-yellow-700'> Adventure awaits,</span> <span className='text-cyan-700'>Passion drives us</span>
                    </div>
                </div>

                <div className='text-center mt-10 text-2xl sm:text-3xl text-yellow-700 font-medium p-2 w-40 bg-amber-50 rounded-xl m-auto'>Our Story</div>
                <div className='text-center max-w-xl m-auto mt-3 text-lg sm:text-2xl'>
                    A cool travel agency and tour guide service started in 2010, dedicated to making connections, sharing our travel know-how, and snagging some awards along the way.
                </div>

                {/* First Section: Journey */}
                <div className='mt-20 flex flex-col lg:flex-row gap-5 items-center'>
                    <div className='journey-img w-full lg:w-1/2'>
                        <img className='rounded w-full h-auto' src={aboutus1} alt="" />
                    </div>

                    <div className='w-full lg:w-1/2'>
                        <p className='w-48 bg-amber-50 p-2 rounded-full font-medium text-xl text-center mb-5'>Our Travel Story</p>
                        <h4 className='text-3xl sm:text-4xl lg:text-5xl mt-5'>Create awesome travel memories!</h4>

                        <div className='mt-10 flex flex-col sm:flex-row gap-5'>
                            <div className='text-3xl'><GrLocation /></div>
                            <div>
                                <h5 className='font-medium text-xl sm:text-2xl'>Tailored Adventures Just for You</h5>
                                <p>Every trip is designed just for you, with the places you want to go and the fun stuff you want to do, making sure it’s a trip to remember!</p>
                            </div>
                        </div>

                        <div className='mt-10 flex flex-col sm:flex-row gap-5'>
                            <div className='text-3xl'><MdOutlineFlight /></div>
                            <div>
                                <h5 className='font-medium text-xl sm:text-2xl'>Personal Documentation</h5>
                                <p>We've got your back with complete travel insurance so you can relax and enjoy your trip!</p>
                            </div>
                        </div>

                        <div className='mt-10 flex flex-col sm:flex-row gap-5'>
                            <div className='text-3xl'><GiWorld /></div>
                            <div>
                                <h5 className='font-medium text-xl sm:text-2xl'>Creating Memories That Last a Lifetime</h5>
                                <p>It's not just a trip; we make awesome memories that stick with you long after you're back home.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Second Section: Culture */}
                <div className='mt-20 flex flex-col lg:flex-row gap-5 items-center mb-10'>
                    <div className='w-full lg:w-1/2 order-2 lg:order-1'>
                        <p className='w-32 bg-amber-50 p-2 rounded-full font-medium text-xl text-center mb-5'>Our Culture</p>
                        <h4 className='text-3xl sm:text-4xl lg:text-5xl mt-5'>Create cultural travel memories!</h4>

                        <div className='mt-10 flex flex-col sm:flex-row gap-5'>
                            <div className='text-3xl'><IoIosSettings /></div>
                            <div>
                                <h5 className='font-medium text-xl sm:text-2xl'>High-Quality Equipment</h5>
                                <p>Get ready for adventure with our complete range of equipment—whether it's diving, hiking, or outdoor camping, we've got you covered!</p>
                            </div>
                        </div>

                        <div className='mt-10 flex flex-col sm:flex-row gap-5'>
                            <div className='text-3xl'><IoDocumentsSharp /></div>
                            <div>
                                <h5 className='font-medium text-xl sm:text-2xl'>Personal Documentation</h5>
                                <p>Preserve your cherished memories with our talented team of photographers.</p>
                            </div>
                        </div>

                        <div className='mt-10 flex flex-col sm:flex-row gap-5'>
                            <div className='text-3xl'><AiFillInsurance /></div>
                            <div>
                                <h5 className='font-medium text-xl sm:text-2xl'>Comprehensive Insurance</h5>
                                <p>We've got your back with complete travel insurance so you can relax and enjoy your trip!</p>
                            </div>
                        </div>
                    </div>

                    <div className='w-full lg:w-1/2 culture-img order-1 lg:order-2'>
                        <img className='rounded w-full h-auto' src={aboutus2} alt="" />
                    </div>
                </div>

                {/* Team Section */}
                <div className='mt-20 mb-20'>
                    <p className='w-48 bg-amber-50 p-2 rounded-full font-medium text-xl text-center m-auto'>Meet The Team</p>
                    <h4 className='text-center mt-4 text-3xl sm:text-4xl lg:text-5xl'>Multiple personalities, No egos.</h4>

                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mt-5'>
                        {[team_img1, team_img2, team_img3, team_img4].map((img, idx) => (
                            <div key={idx}>
                                <img className='rounded-xl w-full h-auto' src={img} alt={`Team ${idx}`} />
                                <h5 className='text-xl font-medium text-center mt-3'>
                                    {["Monika Dawson", "John Lee", "Richa Lee", "Richard Jackson"][idx]}
                                </h5>
                                <p className='text-center'>Explorer</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default AboutUs;
