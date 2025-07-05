"use client";

import React, { useState, useEffect } from "react";
import Module5Step1 from "./Module5Step1";
import Module5Step2 from "./Module5Step2";
import Module5Step3 from "./Module5Step3";

const steps = [
  { id: 1, component: Module5Step1 },
  { id: 2, component: Module5Step2 },
  { id: 3, component: Module5Step3 },
  // { id: 4, component: Module5Step4 },
];

const Module5 = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completed, setCompleted] = useState({});

  // Load the completed steps from localStorage when the component mounts
  useEffect(() => {
    const storedCompleted = JSON.parse(localStorage.getItem("completedSteps")) || {};
    setCompleted(storedCompleted);
  }, []);

  // Save completed steps to localStorage when it changes
  useEffect(() => {
    if (Object.keys(completed).length > 0) {
      localStorage.setItem("completedSteps", JSON.stringify(completed));
    }
  }, [completed]);

  const goToStep = (index) => {
    if (index >= 0 && index < steps.length) setCurrentStep(index);
  };

  const markDoneAndNext = () => {
    // Mark current step as completed
    setCompleted((prev) => {
      const updatedCompleted = { ...prev, [currentStep]: true };
      return updatedCompleted;
    });
    // Move to the next step
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  // Only show steps that are not completed
  const availableSteps = steps.filter(
    (step, index) => !completed[index]
  );

  // Make sure currentStep is within the available steps range
  const StepComponent = availableSteps[currentStep]?.component || null;

  return (
    <div className="p-6 rounded-xl shadow-md h-fit mb-56 max-w-xl mx-auto space-y-6">
      {/* <h2 className="text-xl font-semibold text-center">
        Module Step {currentStep + 1}
      </h2> */}
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text p-3 rounded-full text-center shadow-lg hover:scale-105 transform transition-all">
 Protein Expression (using BL21)
</div>

      {StepComponent && <StepComponent onDone={markDoneAndNext} />}

      <div className="flex justify-between items-center pt-4 border-t">
        <button
          onClick={() => goToStep(currentStep - 1)}
          disabled={currentStep === 0}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-40"
        >
          Previous
        </button>

        <div className="text-sm text-gray-600">
          {Object.keys(completed).length} of {steps.length} done
        </div>

        <button
          onClick={() => goToStep(currentStep + 1)}
          disabled={currentStep === availableSteps.length - 1}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Module5;
