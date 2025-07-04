"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import CellHarvesting from "./CellHarvesting"; // ✅ Import your next phase component

const TOTAL_STAGES = 40;
const FRAME_INTERVAL = 200;

const BacterialGrowth = ({ optimal, totalTime = 24 }) => {
  const [growthDots, setGrowthDots] = useState([]);
  const [elapsed, setElapsed] = useState(0);
  const [showHarvesting, setShowHarvesting] = useState(false); // ✅ Phase switch

  const intervalRef = useRef(null);
  const hoursPerFrame = totalTime / TOTAL_STAGES;

  useEffect(() => {
    if (optimal) {
      intervalRef.current = setInterval(() => {
        setElapsed((prev) => {
          const next = prev + hoursPerFrame;
          if (next >= totalTime) {
            clearInterval(intervalRef.current);
            setShowHarvesting(true); // ✅ Show next phase
            return totalTime;
          }
          return next;
        });

        setGrowthDots((prev) => [
          ...prev,
          {
            top: 150 - prev.length * (120 / TOTAL_STAGES) + Math.random() * 5,
            left: 10 + Math.random() * 50,
            id: Date.now() + Math.random(),
          },
        ]);
      }, FRAME_INTERVAL);
    }

    return () => clearInterval(intervalRef.current);
  }, [optimal, totalTime]);

  const formatTime = (time) => {
    const hours = Math.floor(time);
    const minutes = Math.floor((time - hours) * 60);
    return `${hours}h ${minutes}m`;
  };

  // ✅ If growth phase is done, render harvesting directly
  if (showHarvesting) return <CellHarvesting />;

  return (
    <div className="flex flex-col items-center space-y-6 mt-6 w-full text-white">
      <h2 className="text-2xl font-semibold">🧫 Bacterial Growth Simulation</h2>

      <div className="flex items-center justify-center gap-12 w-full max-w-3xl">
        {/* Test Tube with bacteria */}
        <div className="relative w-24 h-48 border-4 border-white rounded-b-full rounded-t-md bg-gradient-to-b from-blue-100 via-white to-blue-50 overflow-hidden shadow-lg">
          {optimal &&
            growthDots.map((dot) => (
              <motion.div
                key={dot.id}
                className="absolute w-2 h-2 bg-green-500 rounded-full"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.2 }}
                style={{
                  top: `${dot.top}px`,
                  left: `${dot.left}px`,
                }}
              />
            ))}
        </div>

        {/* Clock */}
        <div className="flex flex-col items-center justify-center">
          <div className="relative w-28 h-28">
            <svg className="transform -rotate-90 w-full h-full">
              <circle
                cx="64"
                cy="64"
                r="56"
                stroke="#374151"
                strokeWidth="10"
                fill="none"
              />
              <motion.circle
                cx="64"
                cy="64"
                r="56"
                stroke="#10B981"
                strokeWidth="10"
                fill="none"
                strokeDasharray="352"
                strokeDashoffset={352 - (elapsed / totalTime) * 352}
                strokeLinecap="round"
                animate={{ strokeDashoffset: 352 - (elapsed / totalTime) * 352 }}
                transition={{ duration: 0.2 }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-sm">
              <span className="text-gray-300">Time</span>
              <span className="font-semibold text-lg">{formatTime(elapsed)}</span>
            </div>
          </div>
        </div>
      </div>

      {optimal && (
        <motion.div
          className="bg-green-900/50 px-6 py-3 rounded-lg border border-green-500 text-green-300 text-sm shadow-inner"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          ✅ Optimal Conditions Set: <strong>37°C</strong> for <strong>{totalTime} hours</strong>
        </motion.div>
      )}

      {!optimal && (
        <motion.div
          className="text-red-400 font-medium text-center max-w-sm mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          ❌ The bacteria didn't grow well due to incorrect conditions.
          <br />
          Try setting <strong>37°C</strong> and <strong>24 hours</strong> for optimal growth.
        </motion.div>
      )}
    </div>
  );
};

export default BacterialGrowth;
