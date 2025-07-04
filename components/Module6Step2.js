'use client';

import React, { useState } from 'react';

const ClarificationStep = ({ onDone }) => {
  const [clarified, setClarified] = useState(false);
  const [purified, setPurified] = useState(false);
  const [checked, setChecked] = useState(false);

  const handleClarify = () => setClarified(true);
  const handlePurify = () => setPurified(true);
  const handleCheck = () => setChecked(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] to-[#1e293b] text-white p-6 text-center space-y-8">
      <h2 className="text-3xl font-bold text-yellow-300">🧹 Clarification</h2>
      <p className="text-gray-300 max-w-xl mx-auto">
        Let’s remove insoluble junk from the lysate. Click the button to clarify the solution!
      </p>

      {/* Visual Tube */}
      <div className="relative w-40 h-64 mx-auto mt-8 rounded-b-full border-4 border-white/20 bg-white/10 overflow-hidden shadow-inner">
        {clarified ? (
          <>
            <div className="absolute top-0 left-0 w-full h-[60%] bg-green-300/70 flex justify-center items-center text-black font-semibold animate-fadeInDrop delay-500">
              💧 Soluble Protein
            </div>
            <div className="absolute bottom-0 left-0 w-full h-[15%] bg-gray-500/80 flex justify-center items-center text-sm text-white animate-fadeInDrop">
              🗑️ Junk Pellet
            </div>
          </>
        ) : (
          <div className="absolute inset-0 flex justify-center items-center text-blue-100 font-semibold animate-fadeInSlow">
            🌀 Unclarified Lysate
          </div>
        )}
      </div>

      {/* Buttons */}
      {!clarified && (
        <button
          onClick={handleClarify}
          className="mt-6 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-full shadow transition"
        >
          🧼 Clarify
        </button>
      )}

      {clarified && !purified && (
        <>
          <div className="text-green-300 text-lg font-semibold animate-fadeInSlow">
            ✅ Clarified! Soluble proteins are ready for purification.
          </div>
          <button
            onClick={handlePurify}
            className="mt-4 px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-white font-bold rounded-full shadow"
          >
            🧲 Purify with Affinity Tag
          </button>
        </>
      )}

      {purified && !checked && (
        <>
          <div className="text-yellow-300 text-lg font-semibold animate-fadeInSlow">
            🧪 Purified! Time to check the protein quality.
          </div>
          <button
            onClick={handleCheck}
            className="mt-4 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-full shadow"
          >
            🧫 Run SDS-PAGE
          </button>
        </>
      )}

      {checked && (
        <>
          <div className="mt-4 text-cyan-300 text-lg font-semibold animate-fadeInSlow">
            🔬 SDS-PAGE shows clear band at expected size! Purification successful.
          </div>
          <button
            onClick={onDone}
            className="mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full shadow"
          >
            ✅ Done
          </button>
        </>
      )}

      <style jsx>{`
        .animate-fadeInDrop {
          animation: fadeInDrop 0.6s ease-out both;
        }

        .animate-fadeInSlow {
          animation: fadeInSlow 0.8s ease-in;
        }

        @keyframes fadeInDrop {
          0% {
            transform: translateY(-10%);
            opacity: 0;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes fadeInSlow {
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

export default ClarificationStep;
