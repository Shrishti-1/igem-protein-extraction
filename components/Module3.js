"use client";

import React, { useState } from "react";

import Module3Step1 from "./Module3Step1";
import Module3Step2 from "./Module3Step2";
import Module3Step3 from "./Module3Step3";
import Module3Step4 from "./Module3Step4";

const steps = [
  { id: 1, component: Module3Step1 },
  { id: 2, component: Module3Step2 },
  { id: 3, component: Module3Step3 },
  { id: 4, component: Module3Step4 },
];

const Module3 = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completed, setCompleted] = useState({});

  const goToStep = (index) => {
    if (index >= 0 && index < steps.length) setCurrentStep(index);
  };

  const markDoneAndNext = () => {
    setCompleted((prev) => ({ ...prev, [currentStep]: true }));
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const StepComponent = steps[currentStep].component;

  return (
    <div className="p-6 rounded-xl shadow-md h-fit mb-56 max-w-xl mx-auto space-y-6">
      {/* <h2 className="text-xl font-semibold text-center">Module Step {currentStep + 1}</h2> */}
<div className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text p-3 rounded-full text-center shadow-lg hover:scale-105 transform transition-all">
  Cloning the Gene (into a Plasmid)
</div>

      <StepComponent onDone={markDoneAndNext} />

      <div className="flex justify-between items-center pt-4 border-t">
        <button
          onClick={() => goToStep(currentStep - 1)}
          disabled={currentStep === 0}
          className="px-4 py-2 bg-gray-200 text-black rounded disabled:opacity-40"
        >
          Previous
        </button>

        <div className="text-sm text-gray-600">
          {Object.keys(completed).length} of {steps.length} done
        </div>

        <button
          onClick={() => goToStep(currentStep + 1)}
          disabled={currentStep === steps.length - 1}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Module3;
