"use client";
import React from "react";

export default function ToggleNav({ children }) {
  return (
    <>
      <div className="container">
        <input type="checkbox" id="toggle" defaultChecked />
        <label className="button" htmlFor="toggle">
          <nav className="nav">{children}</nav>
        </label>
      </div>

      {/* Remix Icon (optional if you're using any) */}
      <link
        href="https://cdn.jsdelivr.net/npm/remixicon/fonts/remixicon.css"
        rel="stylesheet"
      />

      <style jsx>{`
        .container {
        //   width: 20%;
          display: flex;
          justify-content: left;
          align-items: center;
          position: relative;
        }

        input[type="checkbox"] {
          -webkit-appearance: none;
          appearance: none;
          position: absolute;
          width: 0;
          height: 0;
          opacity: 0;
          pointer-events: none;
        }

        .button {
          position: absolute;
          z-index: 999;
          width: 320px;
          height: 65px;
          background: #222222;
          border-radius: 15px;
          cursor: pointer;
          display: flex;
          justify-content: left;
          align-items: center;
          padding: 0 24px;
          overflow: hidden;
          transition: width 300ms linear;
        }

        .button:before {
          position: absolute;
          content: "";
          width: 20px;
          height: 2px;
          background: #eeff00;
          transform: rotate(225deg);
          transition: all 0.4s ease;
        }

        .button:after {
          position: absolute;
          content: "";
          width: 20px;
          height: 2px;
          background: #eeff00;
          transform: rotate(135deg);
          transition: all 0.4s ease;
        }

        .nav {
          opacity: 1;
          transition: all 0.5s ease-in-out;
          background: #222222;
          width: 100%;
          border-radius: 5px;
          transform: translateX(10%);
          padding: 10px;
        }

        input[type="checkbox"]:checked ~ label .nav {
          display: none;
          opacity: 0;
          transform: translateX(0);
        }

        input[type="checkbox"]:checked ~ label.button:before {
          transform: rotate(90deg);
        }

        input[type="checkbox"]:checked ~ label.button:after {
          transform: rotate(0deg);
        }

        input[type="checkbox"]:checked ~ label.button {
          width: 70px;
          transition: all 0.1s linear;
        }

        @media (max-width: 640px) {
          .container {
            width: 100%;
          }
        }
      `}</style>
    </>
  );
}
