"use client";

import React from "react";
import { MdEmail } from "react-icons/md";
import { FaFacebook, FaInstagram, FaLinkedin, FaPhoneAlt } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";

const COLORS = { neon1: "#14f7ff", neon2: "#00b8d9" };

export default function Footer() {
  return (
    <footer className="my-2 relative">
      <style jsx>{`
        /* Static neon line only (no animation) */
        .topNeon{
          position:absolute; left:0; right:0; top:0; height:2px;
          background: linear-gradient(90deg, ${COLORS.neon1}, ${COLORS.neon2});
          box-shadow: 0 0 10px ${COLORS.neon1}, 0 0 20px ${COLORS.neon2};
        }
        /* Theme-consistent icon + link styling (no layout change) */
        .icon{ color:${COLORS.neon1}; filter: drop-shadow(0 0 6px rgba(20,247,255,.35)); }
        .link{ color:#cfeaf2; transition: color .15s ease, text-shadow .15s ease; }
        .link:hover{ color:${COLORS.neon1}; text-shadow:0 0 8px ${COLORS.neon1}; }
        /* In-panel power switch (not global floating) */
        .power{
          position:absolute; right:14px; bottom:14px; z-index:1;
          width:44px; height:44px; border-radius:12px;
          border:1px solid rgba(20,247,255,.35);
          background: rgba(13,17,23,.66);
          color:${COLORS.neon1};
          box-shadow: 0 0 0 1px rgba(255,255,255,.04), 0 12px 28px rgba(0,0,0,.45), inset 0 0 10px rgba(20,247,255,.18);
          display:flex; align-items:center; justify-content:center;
          transition: transform .12s ease, box-shadow .12s ease, border-color .12s ease;
        }
        .power:hover{
          transform: translateY(-2px);
          border-color: rgba(20,247,255,.55);
          box-shadow: 0 0 0 1px rgba(20,247,255,.25), 0 16px 36px rgba(0,0,0,.55), inset 0 0 14px rgba(20,247,255,.28);
        }
      `}</style>

      {/* Static neon top divider */}
      <div className="topNeon" aria-hidden />

      {/* Original content starts */}
      <hr className="m-1 sm:m-3 opacity-0" />

      <div className="flex justify-between items-center m-3">
        {/* Left column: Contact */}
        <div className="flex flex-col gap-2 m-2">
          <p className="text-xs sm:lg lg:text-xl xl:text-2xl font-extrabold text-sky-200">Contact us</p>

          <div className="flex gap-2 items-center text-slate-500">
            <MdEmail className="icon inline-block text-sm sm:text-xl" />
            <a href="mailto:societyelectra@gmail.com" className="link text-gray-300 text-xs sm:text-sm">
              societyelectra@gmail.com
            </a>
          </div>

          <a href="tel:6291090769" className="flex gap-2 items-center text-slate-500">
            <FaPhoneAlt className="icon inline-block text-sm sm:text-xl" />
            <p className="link text-gray-300 text-xs sm:text-sm">+91 62910 90769</p>
          </a>

          <a
            href="https://wa.me/916291090769?text=Hello!%20%F0%9F%91%8B%0A%0AI%20visited%20the%20Electra%20Society%20website%20and%20really%20appreciate%20the%20information%20and%20resources%20available.%20Thank%20you!%20%E2%9A%A1"
            target="_blank"
            className="flex gap-2 items-center text-gray-300 text-xs sm:text-sm"
          >
            <IoLogoWhatsapp className="icon inline-block text-sm sm:text-xl" />
            Whatsapp
          </a>
        </div>

        {/* Center: Logo */}
        <div>
          <img
            src="https://res.cloudinary.com/dqa3ov76r/image/upload/v1729535834/favoritePhotos/ldlchr4ijcpgfq8nu2gx.jpg"
            alt="electra-logo"
            width={"120"}
            className="scale-[0.6] sm:scale-100"
          />
        </div>

        {/* Right column: Social media */}
        <div className="flex flex-col gap-2 m-2 font-semibold">
          <p className="text-xs sm:lg lg:text-xl xl:text-2xl font-extrabold text-sky-200">Social media</p>

          <a
            href="https://www.instagram.com/electrasociety/?__pwa=1"
            target="_blank"
            className="flex gap-2 items-center text-slate-500"
          >
            <FaInstagram className="icon inline-block text-sm sm:text-xl" />
            <p className="link text-gray-300 text-xs sm:text-base">Instagram</p>
          </a>

          <a
            href="https://www.facebook.com/groups/electra.nits"
            target="_blank"
            className="flex gap-2 items-center text-slate-500"
          >
            <FaFacebook className="icon inline-block text-sm sm:text-xl" />
            <p className="link text-gray-300 text-xs sm:text-base">Facebook</p>
          </a>

          <a
            href="https://www.linkedin.com/company/electrical-engineering-society-nit-silchar/posts/?feedView=all"
            target="_blank"
            className="flex gap-2 items-center text-slate-500 "
          >
            <FaLinkedin className="icon inline-block text-sm sm:text-xl" />
            <p className="link text-gray-300 text-xs sm:text-base">LinkedIn</p>
          </a>
        </div>
      </div>

      {/* Copyrights block */}
      <div className="text-slate-400">
        <p className="text-center text-xs sm:text-base">© 2024 Electrical Engineering Department, NIT Silchar</p>
        <p className="text-center text-xs sm:text-base">All Rights Reserved</p>
        <p className="text-center text-xs sm:text-base">Designed & Developed by Development Team@Electra society⚡</p>
      </div>

      {/* Scroll-to-top switch inside footer */}
      <button
        type="button"
        aria-label="Scroll to top"
        className="power"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M12 3v9" stroke={COLORS.neon1} strokeWidth="2" strokeLinecap="round" />
          <circle cx="12" cy="14" r="7" stroke={COLORS.neon1} strokeWidth="2" />
        </svg>
      </button>
    </footer>
  );
}
