'use client';

import React, { useState } from 'react';
import Image from 'next/image';

const Module5Step4 = ({ onDone }) => {
  const [spinning, setSpinning] = useState(false);
  const [pelleted, setPelleted] = useState(false);
  const [proteinsVisible, setProteinsVisible] = useState(false);

  const handleCentrifuge = () => {
    setSpinning(true);
    setTimeout(() => {
      setPelleted(true);
    }, 2500);
    setTimeout(() => {
      setProteinsVisible(true);
      setSpinning(false);
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] to-[#1e293b] text-white p-6">
      <div className="max-w-3xl mx-auto text-center space-y-6">
        <h2 className="text-3xl font-bold text-yellow-300">🧪 Harvesting Expressed Protein</h2>
        <p className="text-lg text-gray-300">
          Spin down the engineered <strong>E. coli</strong> cells and isolate the precious <strong>Protein X</strong>!
        </p>

        {/* Animated Centrifuge Section */}
        <div className="relative w-72 h-72 mx-auto mt-10">
          {/* Spinning base plate */}
          <div
            className={`absolute inset-0 rounded-full border-[6px] border-dashed border-cyan-500 bg-cyan-400/10 flex items-center justify-center transition-all duration-700 ${
              spinning ? 'animate-spin-fast' : ''
            }`}
          />

          {/* Centrifuge Tube Image */}
          <div className="absolute inset-0">
            <Image
              src="/centrifuge-tube.png"
              alt="Centrifuge Tube"
              layout="fill"
              objectFit="contain"
              className="pointer-events-none opacity-95"
              priority
            />
          </div>

          {/* Protein Pellet at Bottom */}
          {pelleted && (
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-20 h-5 rounded-full bg-green-400 shadow-lg animate-glowPulse" />
          )}

          {/* Expressed Proteins Floating in Cell */}
          {proteinsVisible && (
            <div className="absolute inset-0 flex flex-wrap justify-center items-center gap-3 p-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
  key={i}
  className="w-4 h-4 bg-pink-400 rounded-full shadow-md animate-float"
  style={{ ['--i']: i }}
  title="Protein X"
/>

              ))}
            </div>
          )}
        </div>

        {/* Button to Start */}
        <button
          onClick={handleCentrifuge}
          disabled={spinning || pelleted}
          className="mt-6 bg-green-600 hover:bg-green-700 px-6 py-3 text-white font-bold rounded-full shadow-md disabled:opacity-40"
        >
          🚀 Start Centrifuge
        </button>

        {/* Success Message */}
        {proteinsVisible && (
          <div className="text-center text-xl text-green-300 font-semibold mt-6 animate-fadeIn">
            ✅ Protein X successfully collected from the pellet!
          </div>
        )}

        {/* Done Button */}
        {proteinsVisible && (
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

      {/* Animations */}
      <style jsx>{`
        .animate-spin-fast {
          animation: spin 0.4s linear infinite;
        }

        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .animate-glowPulse {
          animation: glowPulse 2s ease-in-out infinite;
        }

        @keyframes glowPulse {
          0%, 100% {
            opacity: 1;
            box-shadow: 0 0 0px #00ffcc;
          }
          50% {
            opacity: 0.8;
            box-shadow: 0 0 12px #00ffcc;
          }
        }

        .animate-float {
          animation: float 2.5s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
      `}</style>
    </div>
  );
};

export default Module5Step4;
