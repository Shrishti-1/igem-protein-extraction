"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Purify from "./Purify"; // Import your Purify component here

const Lysis = () => {
  const [lysozymeAdded, setLysozymeAdded] = useState(false);
  const [showPurify, setShowPurify] = useState(false);

  const handleAddLysozyme = () => {
    setLysozymeAdded(true);
    // After animation, show Purify
    setTimeout(() => {
      setShowPurify(true);
    }, 4000); // match animation duration
  };

  if (showPurify) {
    return <Purify />; // render Purify after animation
  }

  return (
    <div className="flex flex-col items-center text-white space-y-8">
      <h2 className="text-2xl font-bold">🧬 Cell Lysis</h2>

      {!lysozymeAdded ? (
        <button
          onClick={handleAddLysozyme}
          className="px-6 py-3 bg-red-600 rounded hover:bg-red-700 transition text-lg"
        >
          Add Lysozyme
        </button>
      ) : (
        <div className="relative w-64 h-64">
          {/* Cell membrane */}
          <motion.div
            className="absolute top-1/4 left-1/4 w-48 h-48 rounded-full border-8 border-green-400"
            initial={{ scale: 1 }}
            animate={{ scale: [1, 1.3, 1], opacity: [1, 0.7, 0] }}
            transition={{ duration: 3 }}
          />

          {/* DNA squiggle */}
          <motion.div
            className="absolute top-1/3 left-1/3 w-12 h-24 bg-gradient-to-r from-purple-400 to-purple-600 rounded-lg"
            initial={{ x: 0, opacity: 0 }}
            animate={{ x: 80, opacity: 1 }}
            transition={{ duration: 3, delay: 1 }}
            style={{ clipPath: "polygon(10% 0%, 90% 0%, 90% 100%, 10% 100%)" }}
          />
          <span
            className="absolute top-[33%] left-[calc(33% + 100px)] text-sm font-semibold text-purple-300 select-none"
            style={{ userSelect: "none" }}
          >
            DNA
          </span>

          {/* Protein blob */}
          <motion.div
            className="absolute top-1/2 left-1/2 w-16 h-16 bg-yellow-400 rounded-full"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1, x: 60, y: -40 }}
            transition={{ duration: 3, delay: 1.5 }}
          />
          <span
            className="absolute top-[50%] left-[calc(50% + 70px)] text-sm font-semibold text-yellow-300 select-none"
            style={{ userSelect: "none" }}
          >
            Protein
          </span>

          {/* RNA small squiggles */}
          {[...Array(3)].map((_, i) => (
            <React.Fragment key={i}>
              <motion.div
                className="absolute w-6 h-12 bg-pink-400 rounded-lg"
                initial={{ x: 0, y: 0, opacity: 0 }}
                animate={{ x: 40 + i * 20, y: -20 - i * 10, opacity: 1 }}
                transition={{ duration: 3, delay: 2 + i * 0.2 }}
                style={{ clipPath: "polygon(20% 0%, 80% 0%, 80% 100%, 20% 100%)" }}
              />
              <span
                className="absolute text-sm font-semibold text-pink-300 select-none"
                style={{
                  userSelect: "none",
                  top: `${50 - 20 - i * 10}px`,
                  left: `${40 + i * 20 + 50}px`,
                }}
              >
                RNA
              </span>
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
};

export default Lysis;
