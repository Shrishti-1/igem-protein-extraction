'use client';
import React, { useState } from 'react';

const InductionStep = ({ onDone }) => {
  const [iptgAdded, setIptgAdded] = useState(false);
  const [transcriptionStarted, setTranscriptionStarted] = useState(false);
  const [translationStarted, setTranslationStarted] = useState(false);
  const [proteinBuilt, setProteinBuilt] = useState(false);

  const handleDrop = () => {
    setIptgAdded(true);
    setTimeout(() => setTranscriptionStarted(true), 1000);
    setTimeout(() => setTranslationStarted(true), 2500);
    setTimeout(() => setProteinBuilt(true), 4000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] to-[#1e293b] text-white p-6 text-center space-y-6">
      <h2 className="text-3xl font-bold text-yellow-300">🧪 Induction: Making Protein X</h2>
      <p className="text-gray-300 max-w-xl mx-auto">
        Drag the IPTG inducer to the repressor to begin protein synthesis in BL21 cells.
      </p>

      {/* IPTG Drop Area */}
      {!iptgAdded && (
        <div
          draggable
          onDragStart={(e) => e.dataTransfer.setData('text', 'iptg')}
          className="mx-auto mt-4 bg-blue-500 px-6 py-2 rounded-full font-bold w-fit cursor-move"
        >
          💧 IPTG Inducer
        </div>
      )}

      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        className="w-72 h-40 mx-auto mt-6 border-4 border-dashed border-green-400 rounded-xl flex items-center justify-center bg-white/10"
      >
        {iptgAdded ? '🧬 IPTG Bound!' : '🎯 Drop IPTG Here (Repressor)'}
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
    </div>
  );
};

export default InductionStep;
