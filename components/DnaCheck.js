"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

const DnaCheck = () => {
  const [checking, setChecking] = useState(false);
  const [dnaGood, setDnaGood] = useState(null); // null = not checked, true = good, false = degraded
  const [purity, setPurity] = useState(0); // 0-100

  const handleCheck = () => {
    setChecking(true);
    setDnaGood(null);
    setPurity(0);

    setTimeout(() => {
      const good = Math.random() > 0.3; // 70% chance good
      setDnaGood(good);
      setPurity(good ? 90 + Math.random() * 10 : 40 + Math.random() * 40);
      setChecking(false);
    }, 3000);
  };

  const renderBands = () => {
    if (dnaGood === null) return null;

    if (dnaGood) {
      // Single clear band
      return (
        <motion.div
          className="bg-blue-600 rounded-lg mx-auto"
          style={{ width: 40, height: 80 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        />
      );
    } else {
      // Multiple smeared bands
      return (
        <div className="flex flex-col space-y-1 items-center">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="bg-blue-400 rounded-lg"
              style={{ width: 20 + i * 10, height: 10 + i * 5, opacity: 0.6 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: i * 0.3 }}
            />
          ))}
        </div>
      );
    }
  };

  return (
    <div className="flex flex-col items-center space-y-6 text-white p-6 bg-gray-900 rounded-lg w-72 shadow-lg">
      <h2 className="text-2xl font-bold">🧬 DNA Quality Check</h2>

      {!checking && dnaGood === null && (
        <button
          onClick={handleCheck}
          className="px-5 py-2 bg-green-600 rounded hover:bg-green-700 transition text-lg font-semibold"
        >
          Run DNA Quality Check
        </button>
      )}

      {checking && (
        <div className="text-center text-lg font-semibold">
          Running gel electrophoresis...
        </div>
      )}

      {dnaGood !== null && !checking && (
        <>
          <div
            className="relative bg-gray-700 w-20 h-96 rounded-md border-4 border-gray-600 flex flex-col justify-end p-2"
            style={{ filter: "drop-shadow(0 0 5px #3b82f6)" }}
          >
            {renderBands()}
            <div className="absolute bottom-0 left-0 w-full h-2 bg-gray-500 rounded-b-md" />
          </div>

          <div className="w-full">
            <label
              htmlFor="purity"
              className="block mb-1 font-semibold text-gray-300"
            >
              DNA Purity: {purity.toFixed(1)}%
            </label>
            <div className="w-full bg-gray-600 rounded-full h-6 overflow-hidden">
              <motion.div
                id="purity"
                className={`h-6 rounded-full ${
                  purity > 70 ? "bg-green-500" : "bg-red-500"
                }`}
                initial={{ width: 0 }}
                animate={{ width: `${purity}%` }}
                transition={{ duration: 1.5 }}
              />
            </div>
          </div>

          <button
            onClick={handleCheck}
            className="mt-6 px-5 py-2 bg-blue-600 rounded hover:bg-blue-700 transition text-lg font-semibold"
          >
            Run Again
          </button>
        </>
      )}
    </div>
  );
};

export default DnaCheck;
