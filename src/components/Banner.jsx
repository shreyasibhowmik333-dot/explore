import React from 'react'
import "../App.css"

const Banner = () => {
  return (
    <div className="hero-img">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col h-full justify-end">
        <div className="pb-20">
          
          <h1 className="
            text-white font-semibold relative z-10
            text-3xl sm:text-4xl md:text-5xl lg:text-7xl
            leading-tight
          ">
            Discover what’s waiting beyond the familiar...
          </h1>

          <h2 className="
            text-white font-medium relative z-10
            pt-4 sm:pt-6 md:pt-8
            text-base sm:text-lg md:text-xl
            max-w-4xl 
          ">
            Discover the world's most beautiful places with seamless booking and unforgettable experiences. Adventure awaits!
          </h2>
        </div>
      </div>
    </div>
  )
}

export default Banner




