'use client';

import React, { useState } from 'react';
import Image from 'next/image';

const CompetentCellPrep = ({ onDone }) => {
  const [calciumApplied, setCalciumApplied] = useState(false);
  const [heatShocked, setHeatShocked] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  const handleDrop = (type) => {
    if (type === 'calcium') setCalciumApplied(true);
  };

  const handleHeatShock = () => {
    if (calciumApplied) {
      setHeatShocked(true);
      setShowExplanation(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#1f2937] text-white py-12 px-4 sm:px-8">
      <div className="max-w-4xl mx-auto text-center space-y-8">

        {/* Title */}
        <h2 className="text-3xl font-bold text-yellow-300">🧪 Preparing Competent E. coli Cells</h2>
        <p className="text-lg text-gray-300 max-w-xl mx-auto">
          Drag Calcium Chloride to the E. coli cell, then trigger a Heat Shock to make the membrane leaky.
        </p>

        {/* E. coli Visual */}
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => handleDrop(e.dataTransfer.getData('tool'))}
          className="relative w-72 h-72 mx-auto rounded-full border-4 border-blue-500 bg-black/10 flex items-center justify-center shadow-xl transition-all duration-500"
        >
          {/* Cell Image */}
          <Image
            src="/ecoli.png"
            alt="E. coli Cell"
            layout="fill"
            // width={140}
            // height={140}
            objectFit="contain"
            className="rounded-full pointer-events-none"
            priority
          />

          {/* Membrane Effect */}
          <div className={`absolute inset-0 rounded-full transition-all duration-700 ${calciumApplied ? 'ring-4 ring-yellow-400 animate-pulse-slow' : ''} ${heatShocked ? 'ring-[6px] ring-green-500 animate-ping' : ''}`}></div>
        </div>

        {/* Drag Tools */}
        <div className="flex flex-wrap justify-center gap-6">
          {!calciumApplied && (
            <div
              draggable
              onDragStart={(e) => e.dataTransfer.setData("tool", "calcium")}
              className="bg-blue-400 text-white px-4 py-2 rounded-full shadow hover:scale-105 transition cursor-move"
            >
              🧴 Calcium Chloride
            </div>
          )}
          <button
            onClick={handleHeatShock}
            disabled={!calciumApplied}
            className={`px-6 py-2 rounded-full font-bold shadow transition ${
              calciumApplied
                ? 'bg-orange-500 hover:bg-orange-600 text-white'
                : 'bg-gray-400 text-gray-300 cursor-not-allowed'
            }`}
          >
            🔥 Heat Shock
          </button>
        </div>

        {/* Explanation */}
        {showExplanation && (
          <div className="max-w-xl mx-auto bg-white/10 border border-white/20 backdrop-blur-md rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold text-green-300 mb-2">
              🎉 Cells Are Now Competent!
            </h3>
            <p className="text-gray-200 text-base">
              The Calcium Chloride makes the bacterial membrane more permeable, and the heat shock temporarily disrupts the membrane to create pores. This allows DNA (like our recombinant plasmid) to enter the E. coli!
            </p>
          </div>
        )}

        {/* Done */}
        {heatShocked && (
          <div className="pt-6">
            <button
              onClick={onDone}
              className="px-6 py-3 rounded-full bg-green-600 hover:bg-green-700 text-white font-bold shadow-md transition"
            >
              ✅ Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompetentCellPrep;
