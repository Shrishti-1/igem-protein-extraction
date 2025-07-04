"use client";

import React, { useState } from "react";
import Image from "next/image";
import clsx from "clsx";

const enzymeOptions = {
  EcoRI: {
    label: "EcoRI",
    matchGene: true,
    matchPlasmid: true,
    color: "bg-blue-500",
  },
  HindIII: {
    label: "HindIII",
    matchGene: false,
    matchPlasmid: true,
    color: "bg-red-500",
  },
  BamHI: {
    label: "BamHI",
    matchGene: true,
    matchPlasmid: false,
    color: "bg-yellow-500",
  },
};

const Module3Step3 = ({ onDone }) => {
  const [geneEnzyme, setGeneEnzyme] = useState(null);
  const [plasmidEnzyme, setPlasmidEnzyme] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [cutting, setCutting] = useState(false);

  const handleDrop = (target, enzyme) => {
    if (target === "gene") {
      setGeneEnzyme(enzyme);
    } else {
      setPlasmidEnzyme(enzyme);
    }
  };

  const handleCheck = () => {
    if (!geneEnzyme || !plasmidEnzyme) {
      setFeedback("⚠️ Drop enzymes onto both gene and plasmid!");
      return;
    }

    const geneMatch = enzymeOptions[geneEnzyme].matchGene;
    const plasmidMatch = enzymeOptions[plasmidEnzyme].matchPlasmid;

    if (geneMatch && plasmidMatch) {
      setFeedback("✅ Sticky ends match! Ready to insert gene.");
      setCutting(true);
    } else {
      setFeedback("❌ Wrong enzyme! The ends don’t match.");
      setCutting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1e293b] to-[#0f172a] text-white p-6 space-y-6">
      <h2 className="text-3xl font-bold text-yellow-300">✂️ Cutting with Restriction Enzymes</h2>
      <p className="text-lg text-gray-300 max-w-2xl">
        Drag restriction enzymes onto both the amplified gene and the plasmid to make matching sticky ends.
      </p>

      {/* Enzyme Choices */}
      <div className="flex flex-wrap gap-4 justify-center">
        {Object.entries(enzymeOptions).map(([key, { label, color }]) => (
          <div
            key={key}
            draggable
            onDragStart={(e) => e.dataTransfer.setData("enzyme", key)}
            className={clsx(
              "cursor-move px-4 py-2 rounded-full text-white font-semibold shadow-md hover:scale-105 transition",
              color
            )}
          >
            {label}
          </div>
        ))}
      </div>

      {/* Drop Targets */}
      <div className="grid sm:grid-cols-2 gap-8 mt-8">
        {/* Gene */}
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => handleDrop("gene", e.dataTransfer.getData("enzyme"))}
          className="relative border-4 border-dashed border-blue-300 rounded-xl p-4 flex flex-col items-center justify-center min-h-[200px] bg-white/10"
        >
          <p className="mb-2 text-xl text-blue-200">Amplified Gene</p>
          <Image src="/gene.png" alt="Gene" width={200} height={100} />
          {geneEnzyme && (
            <p className="mt-2 text-sm text-white">
              🔬 Enzyme: <strong>{geneEnzyme}</strong>
            </p>
          )}
          {cutting && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 animate-ping-slow">
              ✂️
            </div>
          )}
        </div>

        {/* Plasmid */}
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => handleDrop("plasmid", e.dataTransfer.getData("enzyme"))}
          className="relative border-4 border-dashed border-green-300 rounded-xl p-4 flex flex-col items-center justify-center min-h-[200px] bg-white/10"
        >
          <p className="mb-2 text-xl text-green-200">Plasmid</p>
          <Image src="/plasmid.png" alt="Plasmid" width={200} height={100} />
          {plasmidEnzyme && (
            <p className="mt-2 text-sm text-white">
              🔬 Enzyme: <strong>{plasmidEnzyme}</strong>
            </p>
          )}
          {cutting && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 animate-ping-slow">
              ✂️
            </div>
          )}
        </div>
      </div>

      {/* Check Button */}
      <div className="text-center mt-6">
        <button
          onClick={handleCheck}
          className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-full shadow-md"
        >
          🧬 Check Matching
        </button>
      </div>

      {/* Feedback */}
      {feedback && (
        <div className="text-center mt-4 text-lg font-semibold text-yellow-200">
          {feedback}
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

export default Module3Step3;
