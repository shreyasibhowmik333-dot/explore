import React from 'react'
import Navbar from '../components/Navbar'
import { MdOutlineMail } from "react-icons/md"
import { HiOutlineLocationMarker } from "react-icons/hi"
import { MdPhone } from "react-icons/md";
import Footer from '../components/Footer'

const Contact = () => {
  return (
    <>
      <Navbar />

      <div className="text-center mt-20 text-3xl text-yellow-700 font-medium p-2 w-40 bg-amber-50 rounded-xl mx-auto">
        Our story
      </div>

      <div className="about-h1 text-6xl font-medium text-center mt-5 max-w-2xl mx-auto leading-20 tracking-wide">
        <span className="text-yellow-700"> Get in</span>{" "}
        <span className="text-cyan-700">touch</span>
      </div>

      <div className="container mx-auto px-4">

        {/* cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
          <div className="p-10 shadow-md">
            <div className="contact-bg bg-yellow-50 flex items-center justify-center text-3xl">
              <MdOutlineMail />
            </div>
            <h5 className="text-3xl mt-10">Email</h5>
            <p className="mt-3">Our friendly team is here to help.</p>
            <p className="font-semibold mt-5 text-lg">hi@xplore.com</p>
          </div>

          <div className="p-10 shadow-md">
            <div className="contact-bg bg-yellow-50 flex items-center justify-center text-3xl">
              <HiOutlineLocationMarker />
            </div>
            <h5 className="text-3xl mt-10">Office</h5>
            <p className="mt-3">Come say hello at our office HQ.</p>
            <p className="font-semibold mt-5 text-lg">
              100 Smith Street Collingwood VIC 3066 AU
            </p>
          </div>

          <div className="p-10 shadow-md">
            <div className="contact-bg bg-yellow-50 flex items-center justify-center text-3xl">
              <MdPhone />
            </div>
            <h5 className="text-3xl mt-10">Phone</h5>
            <p className="mt-3">Mon-Fri from 8am to 5pm.</p>
            <p className="font-semibold mt-5 text-lg">+1 (555) 000-0000</p>
          </div>
        </section>

        {/* message */}
        <section
          id="message"
          className="mt-20 flex flex-col lg:flex-row gap-5 mb-10"
        >
          <div className="w-full lg:w-1/2">
            <h5 className="text-4xl">Let’s level up your brand, together</h5>
            <p className="mt-5 text-xl">
              You can reach us anytime via{" "}
              <span className="font-semibold">hi@xplore.com</span>
            </p>
          </div>

          <div className="w-full lg:w-1/2">
            <form className="p-5 shadow-md bg-yellow-50">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-slate-900 font-medium mb-2 block">
                    First name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Name"
                    className="w-full py-3 px-4 bg-white border border-gray-300 text-sm rounded-md outline-0"
                  />
                </div>

                <div>
                  <label className="text-sm text-slate-900 font-medium mb-2 block">
                    Last name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Subject"
                    className="w-full py-3 px-4 bg-white border border-gray-300 text-sm rounded-md outline-0"
                  />
                </div>

                <div>
                  <label className="text-sm text-slate-900 font-medium mb-2 block">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="Enter Email"
                    className="w-full py-3 px-4 bg-white border border-gray-300 text-sm rounded-md outline-0"
                  />
                </div>

                <div>
                  <label className="text-sm text-slate-900 font-medium mb-2 block">
                    Phone No.
                  </label>
                  <input
                    type="number"
                    placeholder="Enter Phone No."
                    className="w-full py-3 px-4 bg-white border border-gray-300 text-sm rounded-md outline-0"
                  />
                </div>

                <div className="col-span-full">
                  <label className="text-sm text-slate-900 font-medium mb-2 block">
                    Message
                  </label>
                  <textarea
                    rows={6}
                    placeholder="Enter Message"
                    className="w-full px-4 pt-3 bg-white border border-gray-300 text-sm rounded-md outline-0"
                  />
                </div>
              </div>

              <button
                type="button"
                className="text-white bg-yellow-700 hover:bg-yellow-800 font-medium tracking-wide text-xl px-4 py-3 w-full rounded-md mt-6"
              >
                Send message
              </button>
            </form>
          </div>
        </section>
      </div>

      <Footer />
    </>
  )
}

export default Contact
