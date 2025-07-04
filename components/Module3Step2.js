'use client';

import Image from "next/image";
import React, { useState } from "react";

const Module3Step2 = ({ onDone }) => {
  const [primersDropped, setPrimersDropped] = useState(false);
  const [enzymeDropped, setEnzymeDropped] = useState(false);
  const [cycleLevel, setCycleLevel] = useState(null);
  const [result, setResult] = useState("");
  const [copies, setCopies] = useState(0); // for visual DNA copy count

  const handleDrop = (type) => {
    if (type === "primers") setPrimersDropped(true);
    if (type === "enzyme") setEnzymeDropped(true);
  };

  const handleStartPCR = () => {
    if (!primersDropped || !enzymeDropped || !cycleLevel) {
      setResult("⚠️ Add everything and choose cycle level!");
      setCopies(0);
      return;
    }

    let copyCount = 0;
    if (cycleLevel === "low") {
      setResult("🧪 Not enough copies! Try a higher cycle.");
      copyCount = 2;
    } else if (cycleLevel === "medium") {
      setResult("✅ Good! You’ve got enough copies.");
      copyCount = 6;
    } else {
      setResult("🚀 Great! Loads of gene copies generated!");
      copyCount = 12;
    }
    setCopies(copyCount);
  };

  return (
    <div className="space-y-6 p-4 text-white bg-gradient-to-br from-[#1e293b] to-[#0f172a] min-h-screen">
      <h2 className="text-3xl font-bold text-yellow-300">🧬 Finding Our Gene (PCR)</h2>
      <p className="text-lg text-gray-300">
        Drag the tools into the PCR machine and choose a cycle level to amplify the <strong>&quot;Protein X&quot;</strong> gene!
      </p>

      {/* DNA Strand with Highlight */}
      <div className="relative w-full max-w-3xl mx-auto">
        <Image
          src="/dna-strand.png"
          alt="DNA Strand"
          width={150}
          height={150}
          className="rounded-xl mx-auto"
        />
        <div className="absolute top-[35%] left-[35%] bg-red-500 text-white px-2 py-1 rounded-full animate-pulse text-xs">
          Protein X Gene
        </div>
      </div>

      {/* Drag Tools */}
      <div className="flex flex-wrap gap-6 justify-center mt-6">
        {!primersDropped && (
          <div
            draggable
            onDragStart={(e) => e.dataTransfer.setData("tool", "primers")}
            className="cursor-move bg-blue-500 px-4 py-2 rounded-full text-white shadow hover:scale-105 transition"
          >
            🔹 PCR Primers
          </div>
        )}
        {!enzymeDropped && (
          <div
            draggable
            onDragStart={(e) => e.dataTransfer.setData("tool", "enzyme")}
            className="cursor-move bg-purple-500 px-4 py-2 rounded-full text-white shadow hover:scale-105 transition"
          >
            🧪 DNA Polymerase
          </div>
        )}
      </div>

      {/* PCR Machine */}
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => handleDrop(e.dataTransfer.getData("tool"))}
        className="mt-6 mx-auto w-64 h-32 border-4 border-dashed border-green-400 rounded-xl flex items-center justify-center bg-white/10 backdrop-blur-md text-lg"
      >
        🧬 PCR Machine
      </div>

      {/* Cycle Level Selector */}
      <div className="text-center space-y-2 mt-4">
        <h3 className="text-xl font-semibold text-blue-200">🔁 Choose Cycles</h3>
        <div className="flex justify-center gap-4">
          {["low", "medium", "high"].map((level) => (
            <button
              key={level}
              onClick={() => setCycleLevel(level)}
              className={`px-4 py-2 rounded-full ${
                cycleLevel === level
                  ? "bg-green-500"
                  : "bg-white/10 hover:bg-white/20"
              } transition border`}
            >
              {level.charAt(0).toUpperCase() + level.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Start PCR */}
      <div className="text-center mt-6">
        <button
          onClick={handleStartPCR}
          className="bg-green-600 hover:bg-green-700 px-6 py-3 text-white font-bold rounded-full shadow-md"
        >
          🚀 Start PCR
        </button>
      </div>

      {/* Result Text */}
      {result && (
        <div className="text-center mt-4 text-xl text-yellow-300 font-semibold">
          {result}
        </div>
      )}

      {/* Animated Gene Copies */}
      {copies > 0 && (
        <div className="mt-8 grid grid-cols-4 sm:grid-cols-6 gap-2 justify-center items-center">
          {Array.from({ length: copies }).map((_, index) => (
            <div
              key={index}
              className="w-12 h-6 bg-green-400 text-xs flex items-center justify-center rounded shadow-md animate-fadeIn"
            >
              🧬
            </div>
          ))}
        </div>
      )}

      {/* Done Button */}
      <div className="text-center mt-10">
        <button
          onClick={onDone}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-full text-white font-bold shadow"
        >
          ✅ Done
        </button>
      </div>
    </div>
  );
};

export default Module3Step2;
