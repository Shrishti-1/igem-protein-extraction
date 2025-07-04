'use client';

import React, { useState } from 'react';
import Image from 'next/image';

const Module3Step2 = ({ onDone }) => {
  const [plasmidDropped, setPlasmidDropped] = useState(false);
  const [successCount, setSuccessCount] = useState(0);

  const handleDrop = () => {
    if (!plasmidDropped) {
      setPlasmidDropped(true);
      setSuccessCount(Math.floor(Math.random() * 3) + 2); // 2 to 4 successes
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] to-[#1e293b] text-white p-6">
      <div className="max-w-3xl mx-auto space-y-6 text-center">
        <h2 className="text-3xl font-bold text-yellow-300">🧬 Transformation</h2>
        <p className="text-lg text-gray-300">
          Drag the <strong>Recombinant Plasmid</strong> into the prepared <strong>E. coli</strong> tube. Only some cells will take it in!
        </p>

        {/* E. coli Tube Drop Zone */}
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          className="relative mx-auto mt-6 w-60 h-60 rounded-xl border-4 border-dashed border-green-400 bg-white/10 backdrop-blur flex items-center justify-center transition"
        >
          <Image
            src="/ecoliTube.png"
            alt="E. coli Tube"
            layout="fill"
            objectFit="contain"
            className="rounded-xl pointer-events-none opacity-80"
          />

          <div className="z-10 text-white font-semibold text-lg">🧪 E. coli Cells</div>
        </div>

        {/* Draggable Plasmid */}
        {!plasmidDropped && (
          <div
            draggable
            onDragStart={(e) => e.dataTransfer.setData('text', 'plasmid')}
            className="mx-auto mt-6 bg-blue-500 text-white px-6 py-3 rounded-full font-bold shadow hover:scale-105 transition cursor-move"
          >
            🧬 Recombinant Plasmid
          </div>
        )}

        {/* Animation: plasmid success */}
        {plasmidDropped && (
          <>
            <div className="text-xl text-green-300 font-medium mt-4 animate-fadeIn">
              🌟 Only a few bacteria successfully took in the plasmid!
            </div>

            <div className="mt-6 grid grid-cols-4 sm:grid-cols-6 gap-4 justify-center">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-xl transition-all duration-500 ${
                    i < successCount
                      ? 'bg-green-500 animate-bounce text-white'
                      : 'bg-gray-500 text-gray-300 opacity-60'
                  }`}
                >
                  🦠
                </div>
              ))}
            </div>
          </>
        )}

        {/* Done Button */}
        {plasmidDropped && (
          <div className="text-center mt-10">
            <button
              onClick={onDone}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-full text-white font-bold shadow"
            >
              ✅ Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Module3Step2;
