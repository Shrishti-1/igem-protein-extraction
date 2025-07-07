'use client';

import React, { useState } from 'react';

const Module5Step2 = ({ onDone }) => {
  const [iptgAdded, setIptgAdded] = useState(false);
  const [transcriptionStarted, setTranscriptionStarted] = useState(false);
  const [translationStarted, setTranslationStarted] = useState(false);
  const [proteinBuilt, setProteinBuilt] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const handleClick = () => {
    setShowPopup(true); // Show popup to ask where to place the IPTG inducer
  };

  const handlePopupSelection = (target) => {
    if (target === 'repressor') {
      setIptgAdded(true);
      setTimeout(() => setTranscriptionStarted(true), 1000);
      setTimeout(() => setTranslationStarted(true), 2500);
      setTimeout(() => setProteinBuilt(true), 4000);
    }
    setShowPopup(false); // Close the popup after selection
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#1f2937] flex items-center justify-center p-6">
      <div className="bg-[#0f172a] rounded-xl shadow-xl backdrop-blur-md border border-white/10 px-6 py-10 max-w-xl w-full space-y-6 text-center text-white">
        
        {/* Title */}
        <h2 className="text-3xl font-bold text-yellow-300">🧪 Induction: Making Protein X</h2>
        <p className="text-gray-300 max-w-xl mx-auto">
          Click the IPTG inducer and select where to place it to begin protein synthesis in BL21 cells.
        </p>

      {/* IPTG Button */}
      {!iptgAdded && (
        <div
          onClick={handleClick}
          className="mx-auto mt-4 bg-blue-500 px-6 py-2 rounded-full font-bold w-fit cursor-pointer"
        >
          💧 IPTG Inducer
        </div>
      )}

      {/* IPTG Drop Area (Replacer) */}
      <div
        className="w-72 h-40 mx-auto mt-6 border-4 border-dashed border-green-400 rounded-xl flex items-center justify-center bg-white/10"
      >
        {iptgAdded ? '🧬 IPTG Bound!' : '🎯 Click to place IPTG on Repressor'}
      </div>

      {/* Transcription Phase */}
      {transcriptionStarted && (
        <div className="mt-6 animate-fadeInSlow">
          <p className="text-lg text-blue-200">🧪 T7 RNA Polymerase is active...</p>
          <div className="mt-2 animate-slideRight bg-white text-black px-4 py-2 inline-block rounded-full">
            ➡️ Transcribing mRNA...
          </div>
        </div>
      )}

      {/* Translation Phase */}
      {translationStarted && (
        <div className="mt-6 animate-fadeInSlow">
          <p className="text-lg text-green-200">💥 Ribosomes are translating mRNA</p>
          <div className="flex justify-center gap-2 mt-2 animate-bounce">
            <span className="bg-yellow-300 px-2 py-1 rounded-full text-black">🔗</span>
            <span className="bg-yellow-300 px-2 py-1 rounded-full text-black">🔗</span>
            <span className="bg-yellow-300 px-2 py-1 rounded-full text-black">🔗</span>
          </div>
        </div>
      )}

      {/* Protein X Accumulation */}
      {proteinBuilt && (
        <div className="mt-6 animate-fadeInSlow">
          <p className="text-xl font-bold text-green-300">✅ Protein X synthesized!</p>
          <div className="mt-4 flex justify-center flex-wrap gap-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center animate-pulse"
              >
                🧬
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Done Button */}
      {proteinBuilt && (
        <button
          onClick={onDone}
          className="mt-10 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full shadow"
        >
          ✅ Done
        </button>
      )}

      {/* Popup to ask where to place IPTG */}
      {showPopup && (
        <div className="bg-[#0f172a] rounded-xl shadow-xl backdrop-blur-md border border-white/10 px-6 py-10 max-w-xl w-full space-y-6 text-center text-white ">
          <div className="bg-white text-black p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h3 className="text-lg font-bold mb-4">Where do you want to place the IPTG inducer?</h3>
            <div className="flex justify-around">
              <button
                onClick={() => handlePopupSelection('repressor')}
                className="px-4 py-2 bg-green-500 text-white rounded-full hover:bg-green-600"
              >
                Repressor
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    </div>
  );
};

export default Module5Step2;
