"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Draggable from "react-draggable";
import BacterialGrowth from "./BacterialGrowth";
import CellHarvesting from "./CellHarvesting";
import Lysis from "./Lysis";

const OPTIMAL_TEMP = 37;
const OPTIMAL_TIME = 24;
const LOCAL_KEY = "experiment_flow_state";

const Module2 = () => {
  const [step, setStep] = useState(0);  // 0: initial drag, 1: bacterial growth, 2: cell harvesting, 3: lysis
  const [settings, setSettings] = useState({ temp: "", time: "" });
  const [result, setResult] = useState("");
  const [showPrompt, setShowPrompt] = useState(false);

  const nodeRef = useRef(null);

  // Load saved step + settings + result
  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_KEY);
    if (saved) {
      const data = JSON.parse(saved);
      if (data.step !== undefined) setStep(data.step);
      if (data.settings) setSettings(data.settings);
      if (data.result) setResult(data.result);
    }
  }, []);

  // Save to localStorage on state changes
  useEffect(() => {
    localStorage.setItem(
      LOCAL_KEY,
      JSON.stringify({ step, settings, result })
    );
  }, [step, settings, result]);

  const handleDrop = () => setShowPrompt(true);

  const handleConfirm = () => {
    const temp = parseInt(settings.temp);
    const time = parseInt(settings.time);

    if (temp === OPTIMAL_TEMP && time === OPTIMAL_TIME) {
      setResult("success");
    } else {
      setResult("fail");
    }
    setShowPrompt(false);

    setStep(1); // move to next step: bacterial growth
  };

  const handleOptimal = () => {
    setSettings({ temp: OPTIMAL_TEMP.toString(), time: OPTIMAL_TIME.toString() });
    setResult("success");
    setShowPrompt(false);
    setStep(1); // move to next step: bacterial growth
  };

  // When a child step is done, advance the step
  const onStepDone = () => setStep(step + 1);

  return (
    <div className="px-4 py-8 max-w-5xl mx-auto min-h-screen space-y-10 text-white">
     <div className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text p-3 rounded-full text-center shadow-lg hover:scale-105 transform transition-all">
  Gene Extraction from 'Bacteria A'
</div>

      {step === 0 && (
        <>
          {/* Doctor Instruction */}
          <div className="flex flex-row items-start gap-4">
            <Image
              src="/doctor1.png"
              alt="Doctor"
              width={100}
              height={100}
              className="w-[64px] sm:w-[100px] rounded-lg object-contain"
              priority
            />
            <div className="relative bg-neutral-800 px-4 py-3 rounded-xl shadow-md w-full">
              <p className="text-sm sm:text-md font-medium leading-relaxed text-white">
                Drag the culture tube onto the incubator to grow bacteria.
              </p>
              <div className="absolute left-[-10px] top-5 w-0 h-0 border-t-8 border-b-8 border-r-8 border-transparent border-r-neutral-800" />
            </div>
          </div>

          {/* Interaction Area */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-12 py-6 relative">
            {/* Culture Tube (Draggable) */}
            <Draggable nodeRef={nodeRef} onStop={handleDrop}>
              <div
                ref={nodeRef}
                className="cursor-grab active:cursor-grabbing z-50 select-none"
                style={{ touchAction: "none" }}
              >
                <Image
                  src="/testtube.svg"
                  alt="Culture Tube"
                  width={100}
                  height={100}
                  className="w-[80px] sm:w-[120px]"
                  draggable={false}
                  priority
                />
                <h1>Culture of Bacteria A</h1>
              </div>
            </Draggable>

            {/* Incubator */}
            <div className="border-4 border-dashed border-gray-400 -z-0 rounded-xl p-4 min-w-[140px] min-h-[140px] flex items-center justify-center relative">
              <Image
                src="/incubator.png"
                alt="Incubator"
                width={120}
                height={120}
                className="w-[100px] sm:w-[130px]"
                priority
              />
            </div>
          </div>

          {/* Prompt for temperature/time */}
          {showPrompt && (
            <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center px-4">
              <div className="bg-white text-black rounded-lg p-6 w-full max-w-md space-y-4 shadow-xl">
                <h2 className="text-lg font-semibold">Set Incubation Conditions</h2>
                <input
                  type="number"
                  placeholder="Temperature (°C)"
                  className="w-full p-2 border rounded"
                  value={settings.temp}
                  onChange={(e) =>
                    setSettings({ ...settings, temp: e.target.value })
                  }
                  min={0}
                />
                <input
                  type="number"
                  placeholder="Time (hours)"
                  className="w-full p-2 border rounded"
                  value={settings.time}
                  onChange={(e) =>
                    setSettings({ ...settings, time: e.target.value })
                  }
                  min={0}
                />
                <div className="flex justify-between mt-2">
                  <button
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                    onClick={handleConfirm}
                  >
                    Confirm
                  </button>
                  <button
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
                    onClick={handleOptimal}
                  >
                    Optimal Conditions
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {step === 1 && (
        <BacterialGrowth
          optimal={result === "success"}
          totalTime={parseInt(settings.time)}
          onDone={onStepDone}  // notify to go to next step
        />
      )}

      {step === 2 && (
        <CellHarvesting onDone={() => setStep(step + 1)} />

      )}

      {step === 3 && (
        <Lysis
          onDone={onStepDone}
        />
      )}

      {step > 3 && (
        <div className="text-center text-3xl font-bold mt-20">
          🎉 All steps completed!
        </div>
      )}
    </div>
  );
};

export default Module2;
