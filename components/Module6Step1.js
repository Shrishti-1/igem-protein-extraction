'use client';

import React, { useState } from 'react';
import Image from 'next/image';

const Module5Step5 = ({ onDone }) => {
  const [lysed, setLysed] = useState(false);

  const handleLysis = () => {
    if (!lysed) {
      setLysed(true);
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-8 bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#1f2937] text-white">
      <div className="max-w-4xl mx-auto text-center space-y-8">

        {/* Title */}
        <h2 className="text-3xl font-bold text-yellow-300">💥 Cell Lysis</h2>
        <p className="text-lg text-gray-300 max-w-xl mx-auto">
          Time to break open the cells and collect our protein! Click the button to lyse the cells.
        </p>

        {/* Lysis Image / Animation */}
        <div className="relative w-64 h-64 mx-auto mt-4">
          <Image
            src="/bl21coli.png"
            alt="E. coli Cell"
            width={200}
            height={200}
            className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-transform duration-700 ${
              lysed ? 'scale-0 opacity-0' : 'scale-100 opacity-100'
            }`}
          />

          {/* Protein blobs animation */}
          {lysed &&
            Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className={`absolute w-5 h-5 rounded-full bg-pink-400 animate-blob`}
                style={{
                  left: `${50 + 30 * Math.cos((i / 8) * 2 * Math.PI)}%`,
                  top: `${50 + 30 * Math.sin((i / 8) * 2 * Math.PI)}%`,
                  animationDelay: `${i * 0.1}s`,
                }}
              />
            ))}
        </div>

        {/* Lysis Button */}
        {!lysed && (
          <button
            onClick={handleLysis}
            className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-full shadow-md transition"
          >
            💣 Lyse the Cells
          </button>
        )}

        {/* Feedback */}
        {lysed && (
          <div className="text-green-300 text-xl font-semibold animate-fadeIn">
            ✅ Cells lysed! Proteins are now free!
          </div>
        )}

        {/* Done Button */}
        {lysed && (
          <div className="pt-6">
            <button
              onClick={onDone}
              className="px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-md transition"
            >
              ✅ Done
            </button>
          </div>
        )}
      </div>

      {/* Animations */}
      <style jsx>{`
        .animate-blob {
          animation: blob-pop 0.6s ease-out forwards;
        }

        @keyframes blob-pop {
          0% {
            transform: scale(0.2);
            opacity: 0;
          }
          50% {
            transform: scale(1.3);
            opacity: 1;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.8s ease-in-out;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default Module5Step5;
