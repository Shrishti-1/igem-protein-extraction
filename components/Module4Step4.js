"use client";

import React, { useState } from "react";
import Image from "next/image";

const Module3Step4 = ({ onDone }) => {
  const [geneInserted, setGeneInserted] = useState(false);
  const [ligaseDropped, setLigaseDropped] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleDrop = (type) => {
    if (type === "gene") setGeneInserted(true);
    if (type === "ligase") setLigaseDropped(true);
  };

  const handleCheck = () => {
    if (geneInserted && ligaseDropped) {
      setShowSuccess(true);
    } else {
      setShowSuccess(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1e293b] to-[#0f172a] text-white p-6 space-y-8">
      <h2 className="text-3xl font-bold text-yellow-300">🧬 Pasting DNA (Ligation)</h2>
      <p className="text-lg text-gray-300 max-w-2xl">
        Drag the cut gene into the plasmid. Then add DNA Ligase to seal the sticky ends!
      </p>

      {/* Tools to drag */}
      <div className="flex flex-wrap gap-4 justify-center mt-4">
        {!geneInserted && (
          <div
            draggable
            onDragStart={(e) => e.dataTransfer.setData("tool", "gene")}
            className="bg-blue-500 text-white px-4 py-2 rounded-full shadow hover:scale-105 cursor-move"
          >
            🧬 Cut Gene
          </div>
        )}
        {!ligaseDropped && (
          <div
            draggable
            onDragStart={(e) => e.dataTransfer.setData("tool", "ligase")}
            className="bg-green-500 text-white px-4 py-2 rounded-full shadow hover:scale-105 cursor-move"
          >
            🧪 DNA Ligase
          </div>
        )}
      </div>

      {/* Plasmid Drop Area */}
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => handleDrop(e.dataTransfer.getData("tool"))}
        className="relative w-full max-w-xl h-64 mx-auto mt-6 bg-white/10 border-4 border-dashed border-cyan-400 rounded-2xl flex items-center justify-center"
      >
        {!geneInserted ? (
          <p className="text-center text-white text-lg">Drop 🧬 Gene Here</p>
        ) : (
          <div className="relative w-64 h-64">
            <Image
              src="/recombinant.png"
              alt="Recombinant Plasmid"
              layout="fill"
              objectFit="contain"
              className="animate-snap"
            />
            {ligaseDropped && (
              <div className="absolute bottom-2 right-2 bg-green-600 text-white px-2 py-1 rounded shadow animate-fadeIn">
                🔒 Ligase Sealing!
              </div>
            )}
          </div>
        )}
      </div>

      {/* Action Button */}
      <div className="text-center">
        <button
          onClick={handleCheck}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-full font-bold shadow text-white"
        >
          ✅ Check Ligation
        </button>
      </div>

      {/* Success Message */}
      {showSuccess && (
        <div className="text-center text-green-300 text-2xl font-bold animate-bounce mt-4">
          🎉 Recombinant Plasmid Formed!
        </div>
      )}

      {/* Done Button */}
      <div className="text-center mt-10">
        <button
          onClick={onDone}
          className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-full text-white font-bold shadow"
        >
          ✅ Done
        </button>
      </div>
    </div>
  );
};

export default Module3Step4;
