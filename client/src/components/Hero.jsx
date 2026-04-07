import React from 'react'
import Herovideo from '../assets/Herovideo.mp4'

const Hero = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden">

      {/* VIDEO */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-cover saturate-0"
      >
        <source src={Herovideo} type="video/mp4" />
      </video>

      {/* DARK OVERLAY (for readability) */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* TEXT CONTENT */}
      <div className="absolute inset-0 flex flex-col justify-center items-start px-6 lg:px-20 text-amber-50">

        <span className="font-light text-lg sm:text-xl md:text-2xl">
          Welcome to
        </span>

        <h1 className="font-bold text-3xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight">
          RUNWAY DREAMS
        </h1>

      </div>

    </div>
  )
}

export default Hero