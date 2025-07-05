"use client";

import React, { useState } from "react";
import Image from "next/image";

const Module4Step3 = ({ onDone }) => {
  const [selectedPlate, setSelectedPlate] = useState(null);
  const [placed, setPlaced] = useState(false);
  const [result, setResult] = useState("");
  const [showPrompt, setShowPrompt] = useState(false);

  // Handle E. coli culture click
  const handleEcoliClick = () => {
    setShowPrompt(true);
  };

  // Handle plate selection and placement of E. coli
  const handlePlateSelect = (plateType) => {
    setSelectedPlate(plateType);
    setPlaced(true);
    setShowPrompt(false);

    if (plateType === "antibiotic") {
      setResult("✅ Only transformed E. coli survived and formed colonies!");
    } else {
      setResult("❌ Uh oh, too many bacteria! We can't find the ones with our plasmid!");
    }
  };

  return (
    <div className="min-h-screen p-6 text-white bg-gradient-to-br from-[#0f172a] to-[#1e293b]">
      <div className="max-w-3xl mx-auto text-center space-y-6">
        <h2 className="text-3xl font-bold text-yellow-300">🧫 Selection (Antibiotic Plate)</h2>
        <p className="text-lg text-gray-300">
          Click on the <strong>E. coli</strong> to decide where to place it and see who survives!
        </p>

        {/* Show Plate Selection Prompt */}
        {showPrompt && (
          <div className="mt-6 bg-white/10 border border-white/20 backdrop-blur-md rounded-xl p-6 shadow-lg">
            <h3 className="text-xl text-yellow-300 font-semibold">Where would you like to place the E. coli?</h3>
            <div className="flex justify-center gap-8 mt-6">
              <button
                onClick={() => handlePlateSelect("antibiotic")}
                className="w-36 h-36 rounded-full flex items-center justify-center bg-green-400 text-white font-bold hover:bg-green-500 transition-all duration-300 shadow-lg"
              >
                With Antibiotic
              </button>
              <button
                onClick={() => handlePlateSelect("no-antibiotic")}
                className="w-36 h-36 rounded-full flex items-center justify-center bg-red-400 text-white font-bold hover:bg-red-500 transition-all duration-300 shadow-lg"
              >
                No Antibiotic
              </button>
            </div>
          </div>
        )}

        {/* Plates */}
        <div className="flex flex-wrap justify-center gap-8 mt-8">
          {/* Antibiotic Plate */}
          <div
            className={`relative w-52 h-52 bg-white/10 border-4 border-green-400 border-dashed rounded-full flex items-center justify-center backdrop-blur-md shadow-inner ${selectedPlate === "antibiotic" && placed ? "animate-pulse" : ""}`}
          >
            <Image
              src="/antibiotic-plate.png"
              alt="Antibiotic Plate"
              layout="fill"
              objectFit="contain"
              className="rounded-full pointer-events-none opacity-80"
            />
            <div className="z-10 font-semibold text-green-300">With Antibiotic</div>

            {selectedPlate === "antibiotic" && placed && (
              <div className="absolute inset-0 flex flex-wrap justify-center items-center gap-2 p-4 animate-fadeIn">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-4 h-4 rounded-full bg-green-400 animate-ping"
                  ></div>
                ))}
              </div>
            )}
          </div>

          {/* No Antibiotic Plate */}
          <div
            className={`relative w-52 h-52 bg-white/10 border-4 border-red-400 border-dashed rounded-full flex items-center justify-center backdrop-blur-md shadow-inner ${selectedPlate === "no-antibiotic" && placed ? "animate-pulse" : ""}`}
          >
            <Image
              src="/plain-plate.png"
              alt="No Antibiotic Plate"
              layout="fill"
              objectFit="contain"
              className="rounded-full pointer-events-none opacity-80"
            />
            <div className="z-10 font-semibold text-red-300">No Antibiotic</div>

            {selectedPlate === "no-antibiotic" && placed && (
              <div className="absolute inset-0 flex flex-wrap justify-center items-center gap-1 p-3 animate-fadeIn">
                {Array.from({ length: 20 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-3 h-3 rounded-full bg-gray-200"
                  ></div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* E. coli Culture to Click */}
        {!placed && !showPrompt && (
          <button
            onClick={handleEcoliClick}
            className="mx-auto mt-6 bg-blue-500 text-white px-6 py-3 rounded-full font-bold shadow hover:scale-105 transition cursor-pointer"
          >
            🦠 E. coli Culture
          </button>
        )}

        {/* Result */}
        {result && (
          <div className="mt-6 text-xl text-yellow-300 font-semibold animate-fadeIn">
            {result}
          </div>
        )}

        {/* Done */}
        {/* {placed && (
          <div className="text-center mt-10">
            <button
              onClick={onDone}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-full text-white font-bold shadow"
            >
              ✅ Done
            </button>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default Module4Step3;
