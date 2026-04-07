import React from 'react'
import AboutModel from '../assets/AboutModel.jpg'
import { Link } from "react-router-dom"


const AboutSection = () => {
  return (
    <div className="bg-[#f5f5f5] min-h-screen px-6 md:px-16 py-10 md:py-16 flex flex-col md:flex-row gap-10">

      {/* LEFT CONTENT */}
      <div className="flex-1">
        <h1 className="text-2xl md:text-4xl font-semibold mb-4 md:mb-6 leading-snug">
          Welcome to Runway Dreams - Modeling Agency
        </h1>

        <p className="text-gray-600 mb-4 leading-relaxed text-sm md:text-base">
  Runway Dreams is a growing and trusted modeling agency that welcomes both freshers and experienced models. We provide a wide range of opportunities including male modeling, female modeling, kids modeling, and plus-size modeling. Our services also include portfolio creation, advertisements, fashion events, and collaborations in the fashion and entertainment industry.
</p>

<p className="text-gray-600 mb-6 leading-relaxed text-sm md:text-base">
  At Runway Dreams, we believe talent comes in all forms. Whether you are just starting your journey or already have experience, we are here to guide and support you. Our goal is to create a professional and comfortable environment where every model gets the right platform to grow, learn, and shine in the industry.
</p>
        <Link to={"/models"}>
        <button className="bg-black text-white px-5 py-2.5 md:px-6 md:py-3 rounded-full hover:bg-gray-800 transition text-sm md:text-base">
          View Models
        </button>
        </Link>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex-1 flex justify-center items-center relative mt-6 md:mt-0">

        {/* DOTS */}
        <div className="absolute top-0 right-5 md:right-10 grid grid-cols-6 gap-2 opacity-40">
          {[...Array(36)].map((_, i) => (
            <div key={i} className="w-1 h-1 bg-black rounded-full"></div>
          ))}
        </div>

        {/* IMAGE BOX */}
        <div className="relative w-[250px] md:w-[350px]">

          {/* BACKGROUND SHADOW BOX */}
          <div className="absolute -bottom-4 -right-4 md:-bottom-5 md:-right-5 w-full h-full bg-black"></div>

          <img
            src={AboutModel}
            alt="model"
            className="relative w-full h-full object-cover"
          />
        </div>

      </div>

    </div>
  )
}

export default AboutSection