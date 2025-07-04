'use client';

import React, { useState } from 'react';
import Image from 'next/image';

const ChoosingEcoliStep = ({ onDone }) => {
  const [selected, setSelected] = useState(null);

  return (
    <div className="min-h-screen py-12 px-4 sm:px-8 bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#1f2937] text-white">
      <div className="max-w-4xl mx-auto text-center space-y-8">

        {/* Title */}
        <h2 className="text-3xl font-bold text-yellow-300">🦠 Choosing the Right E. coli</h2>
        <p className="text-lg text-gray-300 max-w-xl mx-auto">
          Not all E. coli are the same! Let&apos;s pick the best one to express our protein.
        </p>

        {/* Visual Comparison */}
        <div className="grid sm:grid-cols-2 gap-6 mt-10">
          {/* Normal E. coli */}
          <div
            className={`relative p-4 border rounded-xl bg-white/10 border-white/20 hover:scale-105 transition cursor-default ${
              selected === 'normal' ? 'ring-4 ring-red-500' : ''
            }`}
          >
            <Image
              src="/ecoli.png"
              alt="Normal E. coli"
              width={150}
              height={150}
              className="mx-auto"
            />
            <h3 className="text-xl font-semibold mt-4 text-gray-200">Regular E. coli</h3>
            <p className="text-gray-400 text-sm mt-2 px-2">
              Can grow DNA, but not the best for making lots of proteins.
            </p>
          </div>

          {/* BL21 */}
          <div
            onClick={() => setSelected('bl21')}
            className={`relative p-4 border rounded-xl bg-white/10 border-white/20 hover:scale-105 transition cursor-pointer ${
              selected === 'bl21' ? 'ring-4 ring-green-500' : ''
            }`}
          >
            <Image
              src="/bl21coli.png"
              alt="BL21 E. coli"
              width={150}
              height={150}
              className="mx-auto rounded-full"
            />
            <h3 className="text-xl font-semibold mt-4 text-green-300">BL21 (DE3)</h3>
            <p className="text-gray-400 text-sm mt-2 px-2">
              Special strain with T7 RNA Polymerase and low protein degradation.
            </p>
          </div>
        </div>

        {/* Explanation */}
        {selected === 'bl21' && (
          <div className="max-w-2xl mx-auto mt-8 bg-white/10 border border-white/20 backdrop-blur-md rounded-xl p-6 shadow-lg animate-fadeIn">
            <h3 className="text-xl font-semibold text-green-300 mb-2">
              Why BL21 is Best
            </h3>
            <ul className="text-left text-gray-200 space-y-2 list-disc list-inside">
              <li>
                Has <strong>T7 RNA Polymerase</strong> — perfect for T7 promoter-based plasmids.
              </li>
              <li>
                <strong>Lower protease activity</strong> — reduces protein degradation.
              </li>
              <li>
                High protein yield — great for large-scale expression.
              </li>
            </ul>
            <p className="mt-4 text-yellow-200 font-semibold text-center">
               BL21 is like a super-factory for making proteins!
            </p>
          </div>
        )}

        {/* Done Button */}
        {selected === 'bl21' && (
          <div className="pt-8">
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

export default ChoosingEcoliStep;
