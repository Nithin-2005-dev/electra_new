"use client";
import React from "react";
import Slider from "react-slick";
import { CldImage } from "next-cloudinary";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { alumni } from "../app/utils/alumni";
import { ChevronLeft, ChevronRight } from "lucide-react";

function NextArrow({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="absolute -right-8 top-1/2 -translate-y-1/2 z-30 
                 bg-cyan-400/10 hover:bg-cyan-400/20 border border-cyan-300/30 
                 rounded-full p-2 backdrop-blur-sm transition-all duration-300
                 hover:scale-110 hover:shadow-[0_0_10px_rgba(0,255,255,0.4)]"
    >
      <ChevronRight className="w-6 h-6 text-cyan-200" />
    </button>
  );
}

function PrevArrow({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="absolute -left-8 top-1/2 -translate-y-1/2 z-30 
                 bg-cyan-400/10 hover:bg-cyan-400/20 border border-cyan-300/30 
                 rounded-full p-2 backdrop-blur-sm transition-all duration-300
                 hover:scale-110 hover:shadow-[0_0_10px_rgba(0,255,255,0.4)]"
    >
      <ChevronLeft className="w-6 h-6 text-cyan-200" />
    </button>
  );
}

export default function AlumniShowcase() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "0",
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    swipe: true,
    swipeToSlide: true,
    touchMove: true,
    draggable: true,
    responsive: [
      { breakpoint: 1200, settings: { slidesToShow: 3, centerMode: true } },
      { breakpoint: 900, settings: { slidesToShow: 2, centerMode: true } },
      { breakpoint: 640, settings: { slidesToShow: 1, centerMode: false } },
    ],
  };

  return (
    <section className="relative py-20 min-h-[70vh] bg-transparent overflow-hidden select-none">
      {/* Soft Background Glows */}
      <div className="absolute inset-0 z-0">
        <div className="absolute w-[350px] h-[350px] bg-cyan-400/10 blur-[180px] top-[10%] left-[5%]" />
        <div className="absolute w-[280px] h-[280px] bg-sky-500/10 blur-[150px] bottom-[10%] right-[5%]" />
      </div>

      <div className="max-w-[1150px] mx-auto px-4 text-center relative z-10">
        <h2 className="text-[#dffbff] text-4xl md:text-5xl font-extrabold tracking-wide uppercase mb-20 drop-shadow-[0_0_15px_rgba(20,247,255,.25)]">
          Our Alumni
        </h2>

        <div className="relative flex justify-center z-20">
          <div className="w-full">
            <Slider {...settings}>
              {alumni.map((alum, i) => (
                <div key={i} className="px-3 flex justify-center">
                  <div
                    className={`flex flex-col items-center justify-start
                      border border-cyan-300/25 rounded-3xl
                      min-h-[400px] w-[90%] sm:w-[80%] md:w-[320px] lg:w-[340px]
                      shadow-[0_0_35px_rgba(0,255,255,0.08)]
                      relative transition-all duration-500 ease-out
                      hover:scale-[1.05] hover:shadow-[0_0_50px_rgba(0,255,255,0.2)]
                      bg-gradient-to-br from-[#101626]/80 via-[#0d1829]/50 to-[#0d1829]/20
                      backdrop-blur-[10px]
                    `}
                  >
                    {/* Profile Image */}
                    <div
                      className={`absolute left-1/2 -translate-x-1/2 -top-[70px] translate-y-1/3
                        shadow-[0_0_35px_rgba(0,255,255,0.25)]
                        rounded-3xl bg-gradient-to-tr from-cyan-400/60 via-sky-500/30 to-transparent
                        p-[2px]
                      `}
                      style={{ width: "150px", height: "150px" }}
                    >
                      <div className="w-[150px] h-[150px] rounded-3xl overflow-hidden bg-[#14172a] flex items-center justify-center">
                        <CldImage
                          fill
                          alt={alum.name}
                          src={alum.imagePublicId}
                          className="object-cover rounded-3xl"
                          sizes="150px"
                          quality="auto"
                          format="auto"
                        />
                      </div>
                    </div>

                    {/* Text */}
                    <div className="pt-[100px] pb-8 px-6 flex flex-col w-full relative translate-y-1/12">
                      <h3 className="mt-10 text-2xl font-bold text-cyan-100 text-center drop-shadow-[0_0_10px_rgba(0,255,255,0.2)] leading-snug">
                        {alum.name}
                      </h3>
                      <p className="mt-3 text-slate-300 font-medium text-base text-center leading-snug">
                        {alum.jobTitle}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .slick-slide > div {
          display: flex !important;
          justify-content: center;
          align-items: center;
        }
        .slick-list {
          padding: 20px 0 !important;
        }
        .slick-dots {
          bottom: -35px;
        }
        .slick-dots li button:before {
          color: #14f7ff !important;
          opacity: 0.5;
          transition: all 0.3s ease;
        }
        .slick-dots li.slick-active button:before {
          opacity: 1 !important;
          color: #00ffff !important;
        }
      `}</style>
    </section>
  );
}
