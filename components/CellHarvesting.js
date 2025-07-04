"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import Draggable from "react-draggable";
import { motion, useAnimation } from "framer-motion";
import Lysis from "./Lysis";  // import Lysis here

const OPTIMAL_SPEED = 500;

const CellHarvesting = ({ onDone }) => {
  const [speed, setSpeed] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [isDropped, setIsDropped] = useState(false);
  const [pelletVisible, setPelletVisible] = useState(false);
  const [showLysis, setShowLysis] = useState(false);  // new state

  const centrifugeControls = useAnimation();
  const tubeRef = useRef(null);
  const dropZoneRef = useRef(null);

  const updateFeedbackAndAnimation = (val) => {
    if (val < OPTIMAL_SPEED * 0.8) {
      setFeedback("❌ Too slow, cells still floating!");
      setPelletVisible(false);
    } else if (val >= OPTIMAL_SPEED * 0.8 && val <= OPTIMAL_SPEED * 1.2) {
      setFeedback("✅ Perfect! Cells are ready!");
      setPelletVisible(true);
    } else {
      setFeedback("⚠️ Too fast! Cells might be damaged!");
      setPelletVisible(false);
    }

    if (val <= 0) {
      centrifugeControls.stop();
    } else {
      const duration = 60 / val;
      centrifugeControls.start({
        rotate: 360,
        transition: {
          repeat: Infinity,
          ease: "linear",
          duration: duration > 0 ? duration : 1,
        },
      });
    }
  };

  const handleDrop = (e, data) => {
    const dropZone = dropZoneRef.current?.getBoundingClientRect();
    const tube = data.node.getBoundingClientRect();

    const centerX = tube.left + tube.width / 2;
    const centerY = tube.top + tube.height / 2;

    if (
      dropZone &&
      centerX >= dropZone.left &&
      centerX <= dropZone.right &&
      centerY >= dropZone.top &&
      centerY <= dropZone.bottom
    ) {
      setIsDropped(true);
      setTimeout(() => updateFeedbackAndAnimation(speed), 400);
    }
  };

  const handleSpeedChange = (e) => {
    const newSpeed = Number(e.target.value);
    setSpeed(newSpeed);
    if (isDropped) updateFeedbackAndAnimation(newSpeed);
  };

  const handleOptimal = () => {
    const newSpeed = OPTIMAL_SPEED;
    setSpeed(newSpeed);
    if (isDropped) updateFeedbackAndAnimation(newSpeed);
  };

  const handleDone = () => {
    const isSpeedOptimal = speed >= OPTIMAL_SPEED * 0.8 && speed <= OPTIMAL_SPEED * 1.2;
    if (!isSpeedOptimal) return;  // disable done if speed not optimal

    setShowLysis(true);  // show lysis component
  };

  const handleLysisDone = () => {
    if (onDone) onDone();  // notify parent component that entire harvesting+lysis is done
  };

  if (showLysis) {
    // Render the Lysis step here
    return <Lysis onDone={handleLysisDone} />;
  }

  // Render the centrifuge UI if lysis not shown yet
  return (
    <div className="flex flex-col items-center text-white space-y-8 max-w-4xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold">🧪 Cell Harvesting</h2>

      <div className="flex flex-col sm:flex-row justify-center gap-12 items-center w-full relative">
        {!isDropped ? (
          <Draggable
            nodeRef={tubeRef}
            bounds="parent"
            onStop={(e, data) => handleDrop(e, data)}
          >
            <div
              ref={tubeRef}
              className="cursor-grab active:cursor-grabbing select-none"
              style={{ width: 80, height: 120 }}
            >
              <Image
                src="/testtube.svg"
                alt="Culture Tube"
                width={80}
                height={120}
                draggable={false}
              />
            </div>
          </Draggable>
        ) : (
          <div className="w-20 h-32 relative">
            <Image
              src="/testtube.svg"
              alt="Culture Tube"
              width={80}
              height={120}
              draggable={false}
            />
            <div className="absolute bottom-1 left-2 right-2 h-3 bg-green-500 rounded-full animate-pulse" />
          </div>
        )}

        <motion.div
          ref={dropZoneRef}
          className="w-40 h-40 rounded-full border-[10px] border-gray-700 bg-gray-900 relative shadow-2xl"
          animate={centrifugeControls}
          style={{ originX: "50%", originY: "50%" }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 bg-gray-700 rounded-full border-4 border-gray-600" />
          </div>
          {[0, 45, 90, -45].map((angle) => (
            <div
              key={angle}
              className="absolute w-4 h-16 bg-gray-500 rounded-md left-1/2 top-1/2 origin-bottom"
              style={{
                transform: `translate(-50%, -100%) rotate(${angle}deg)`,
              }}
            />
          ))}

          {pelletVisible && (
            <motion.div
              className="absolute w-6 h-6 bg-green-400 rounded-full left-[calc(50%-12px)] top-[calc(50%-12px)] z-10"
              initial={{ scale: 0, y: 0 }}
              animate={{ scale: 1, y: 60 }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          )}
        </motion.div>
      </div>

      {isDropped && (
        <div className="w-full max-w-md space-y-4">
          <div className="flex justify-between items-center">
            <label className="text-md font-medium">Set Centrifuge Speed (RPM)</label>
            <div className="text-lg font-bold">{speed} RPM</div>
          </div>

          <input
            type="range"
            min="0"
            max="1000"
            value={speed}
            onChange={handleSpeedChange}
            className="w-full"
          />

          <div className="flex justify-between mt-2">
            <button
              onClick={handleOptimal}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
            >
              Optimal Speed
            </button>

            <button
              onClick={handleDone}
              className={`px-4 py-2 rounded text-white ${
                speed >= OPTIMAL_SPEED * 0.8 && speed <= OPTIMAL_SPEED * 1.2
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-gray-500 cursor-not-allowed"
              }`}
              disabled={!(speed >= OPTIMAL_SPEED * 0.8 && speed <= OPTIMAL_SPEED * 1.2)}
            >
              Done
            </button>
          </div>

          <motion.div
            className="text-center text-lg font-semibold mt-4"
            key={feedback}
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {feedback}
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default CellHarvesting;
