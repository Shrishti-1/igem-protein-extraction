"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import Draggable from "react-draggable";
import { motion } from "framer-motion";
import DnaCheck from "./DnaCheck"; // Import your separate component

const Purify = () => {
  const [proteaseAdded, setProteaseAdded] = useState(false);
  const [rnaseAdded, setRnaseAdded] = useState(false);
  const [isDropped, setIsDropped] = useState(false);
  const [showDnaCheck, setShowDnaCheck] = useState(false);

  const tubeRef = useRef(null);
  const dropZoneRef = useRef(null);

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
    }
  };

  if (showDnaCheck) {
    return <DnaCheck />;  // Render your DnaCheck component here
  }

  return (
    <div className="flex flex-col items-center text-white space-y-8 max-w-4xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold">🧪 DNA Purification</h2>

      {/* Buttons to add enzymes */}
      <div className="flex gap-4">
        <button
          onClick={() => setProteaseAdded(true)}
          disabled={proteaseAdded}
          className={`px-4 py-2 rounded ${
            proteaseAdded
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-yellow-600 hover:bg-yellow-700"
          }`}
        >
          Add Protease
        </button>
        <button
          onClick={() => setRnaseAdded(true)}
          disabled={rnaseAdded}
          className={`px-4 py-2 rounded ${
            rnaseAdded
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-pink-600 hover:bg-pink-700"
          }`}
        >
          Add RNase
        </button>
      </div>

      <div className="flex justify-center items-center gap-12 w-full relative mt-8">
        {/* Tube */}
        <Draggable
          nodeRef={tubeRef}
          bounds="parent"
          onStop={handleDrop}
          disabled={!proteaseAdded && !rnaseAdded}
        >
          <div
            ref={tubeRef}
            className="cursor-grab active:cursor-grabbing select-none relative"
            style={{ width: 80, height: 120 }}
          >
            <Image
              src="/testtube.svg"
              alt="Culture Tube"
              width={80}
              height={120}
              draggable={false}
            />

            {!isDropped && proteaseAdded && (
              <motion.div
                className="absolute top-6 left-4 w-12 h-12 bg-yellow-400 rounded-full"
                initial={{ opacity: 1 }}
                animate={{ opacity: isDropped ? 0 : 1 }}
                transition={{ duration: 1 }}
                style={{ pointerEvents: "none" }}
              />
            )}

            {!isDropped && rnaseAdded && (
              <motion.div
                className="absolute top-16 left-8 w-8 h-16 bg-pink-400 rounded-lg"
                initial={{ opacity: 1 }}
                animate={{ opacity: isDropped ? 0 : 1 }}
                transition={{ duration: 1 }}
                style={{ pointerEvents: "none" }}
              />
            )}

            <div className="absolute top-20 left-2 w-12 h-24 bg-gradient-to-r from-purple-400 to-purple-600 rounded-lg" />
          </div>
        </Draggable>

        {/* Purification Column Drop Zone */}
        <div
  ref={dropZoneRef}
  className="w-40 h-56 border-4 border-dashed border-cyan-400 rounded-xl flex flex-col items-center justify-center"
>
  {!isDropped && (
    <>
      <div className="text-cyan-400 font-semibold text-center mb-2">
        DNA Purification Column
      </div>
      <Image
        src="/column.png"
        alt="Purification Column"
        width={120}
        height={180}
        className="opacity-60"
        draggable={false}
      />
    </>
  )}
</div>

      </div>

      {!isDropped && (
        <p className="text-center max-w-md text-gray-300">
          Add Protease and RNase to the tube, then drag it to the purification
          column.
        </p>
      )}

      {isDropped && (
        <>
          <p className="text-center max-w-md text-green-400 font-semibold">
            Proteins and RNA removed! DNA purified successfully.
          </p>
          <button
            onClick={() => setShowDnaCheck(true)}
            className="mt-6 px-6 py-3 bg-blue-600 rounded hover:bg-blue-700 transition"
          >
            Done: Check DNA Quality
          </button>
        </>
      )}
    </div>
  );
};

export default Purify;
