'use client';
import React, { useState } from "react";
import Image from "next/image";
import clsx from "clsx";

const parts = {
  ori: {
    title: "🛞 Ori - The Engine",
    desc: "This part helps the plasmid copy itself. Just like an engine helps a truck move!",
    position: "top-[8%] left-[45%]",
  },
  resistance: {
    title: "💊 Antibiotic Resistance - The VIP Sticker",
    desc: "This tells us which bacteria got the truck. Like giving a VIP sticker to special ones!",
    position: "top-[60%] left-[78%]",
  },
  promoter: {
    title: "🔌 Promoter - The ON Switch",
    desc: "This turns on the gene so the cell knows when to use it. Just like a light switch!",
    position: "top-[82%] left-[28%]",
  },
  mcs: {
    title: "📦 MCS - The Cargo Bay",
    desc: "This is where we put our gene. It’s the storage space in the truck!",
    position: "top-[35%] left-[10%]",
  },
};

const KidFriendlyPlasmid = ({ onDone }) => {
  const [selectedPart, setSelectedPart] = useState(null);

  return (
    <div className="min-h-screen overflow-y-auto bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#1f2937] text-white py-12 px-4 sm:px-8">
      <div className="max-w-4xl mx-auto text-center space-y-10">
        {/* Intro */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 max-w-xl mx-auto shadow-lg">
          <h2 className="text-2xl font-bold text-yellow-300 mb-2">🔬 Introducing the Plasmid</h2>
          <p className="text-gray-300 text-base">
            This is our <strong>&ldquo;gene delivery truck&rdquo;</strong>! Each part plays a key role in delivering and expressing our gene inside bacteria.
            Tap any glowing part to explore its job.
          </p>
        </div>

        {/* Plasmid Diagram with Image & Parts */}
        <div className="relative w-72 h-72 mx-auto">
          {/* Spinning Dotted Ring */}
          <div className="absolute inset-0 animate-spin-slow rounded-full border-[6px] border-blue-500/30 border-dotted pointer-events-none"></div>

          {/* Plasmid Image */}
          <Image
            src="/plasmid.png"
            alt="Plasmid Diagram"
            layout="fill"
            objectFit="contain"
            className="rounded-full pointer-events-none"
            priority
          />

          {/* Clickable Parts */}
          {Object.entries(parts).map(([key, part]) => (
            <button
              key={key}
              onClick={() => setSelectedPart(key)}
              className={clsx(
                "absolute w-6 h-6 bg-yellow-400 rounded-full border-2  border-white shadow-lg transition hover:scale-125",
                "hover:ring-2 hover:ring-blue-300",
                "animate-pulse-slow",
                part.position,
                selectedPart === key && "scale-150 ring-4 ring-green-400"
              )}
              title={part.title}
            />
          ))}
        </div>

        {/* Selected Info Card */}
        {selectedPart && (
          <div className="mx-auto max-w-xl bg-white/10 border border-white/20 backdrop-blur-md rounded-2xl p-6 shadow-xl transition-all duration-300">
            <h3 className="text-2xl font-semibold text-yellow-300 mb-2">
              {parts[selectedPart].title}
            </h3>
            <p className="text-gray-200">{parts[selectedPart].desc}</p>
          </div>
        )}

        {/* Done Button */}
        <button
          onClick={onDone}
          className="mt-6 px-6 py-3 rounded-full bg-green-600 hover:bg-green-700 text-white font-bold shadow-md hover:shadow-xl transition"
        >
          ✅ Done
        </button>
      </div>
    </div>
  );
};

export default KidFriendlyPlasmid;
