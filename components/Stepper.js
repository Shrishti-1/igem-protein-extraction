'use client';

import React, { useState, Children, useEffect, useRef, useLayoutEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Stepper({
  children,
  initialStep = 1,
  onStepChange = () => {},
  onFinalStepCompleted = () => {},
  stepCircleContainerClassName = "",
  stepContainerClassName = "",
  contentClassName = "",
  footerClassName = "",
  backButtonProps = {},
  nextButtonProps = {},
  backButtonText = "Back",
  nextButtonText = "Continue",
  disableStepIndicators = false,
  renderStepIndicator,
  ...rest
}) {
  // Retrieve the saved step from localStorage (if any)
  const storedStep = localStorage.getItem("currentStep");
  const startingStep = storedStep ? parseInt(storedStep) : initialStep;

  const [currentStep, setCurrentStep] = useState(startingStep);
  const [direction, setDirection] = useState(0);
  const stepsArray = Children.toArray(children);
  const totalSteps = stepsArray.length;
  const isCompleted = currentStep > totalSteps;
  const isLastStep = currentStep === totalSteps;

  const updateStep = (newStep) => {
    setCurrentStep(newStep);
    if (newStep > totalSteps) onFinalStepCompleted();
    else onStepChange(newStep);
    // Save the current step to localStorage whenever it changes
    localStorage.setItem("currentStep", newStep);
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setDirection(-1);
      updateStep(currentStep - 1);
    }
  };

  const handleNext = () => {
    if (!isLastStep) {
      setDirection(1);
      updateStep(currentStep + 1);
    }
  };

  const handleComplete = () => {
    setDirection(1);
    updateStep(totalSteps + 1);
  };

  useEffect(() => {
    // Optional: Reset the step on a full reset (e.g. refresh or navigate away)
    const storedStep = localStorage.getItem("currentStep");
    if (!storedStep) {
      localStorage.setItem("currentStep", startingStep);
    }
  }, []);

  return (
    <div
      className="flex flex-col items-center justify-start min-h-screen w-full px-4 sm:px-6 lg:px-20 py-8
                 bg-white/30 backdrop-blur-sm
                 dark:bg-neutral-900/30 dark:backdrop-blur-sm"
      {...rest}
    >
      <div
        className={`w-full max-w-5xl rounded-2xl shadow-xl border border-neutral-200 dark:border-neutral-800
                   bg-white/30 backdrop-blur-sm
                   dark:bg-neutral-900/30 dark:backdrop-blur-sm
                   ${stepCircleContainerClassName}`}
      >
        {/* Step Indicators */}
        <div
          className={`flex flex-wrap items-center justify-center gap-3 sm:gap-6 px-4 sm:px-6 pt-6
                     ${stepContainerClassName}`}
        >
          {stepsArray.map((_, index) => {
            const stepNumber = index + 1;
            const isNotLastStep = index < totalSteps - 1;
            return (
              <React.Fragment key={stepNumber}>
                {renderStepIndicator ? (
                  renderStepIndicator({
                    step: stepNumber,
                    currentStep,
                    onStepClick: (clicked) => {
                      setDirection(clicked > currentStep ? 1 : -1);
                      updateStep(clicked);
                    },
                  })
                ) : (
                  <StepIndicator
                    step={stepNumber}
                    disableStepIndicators={disableStepIndicators}
                    currentStep={currentStep}
                    onClickStep={(clicked) => {
                      setDirection(clicked > currentStep ? 1 : -1);
                      updateStep(clicked);
                    }}
                  />
                )}
                {isNotLastStep && (
                  <StepConnector isComplete={currentStep > stepNumber} />
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Step Content */}
        <StepContentWrapper
          isCompleted={isCompleted}
          currentStep={currentStep}
          direction={direction}
          className={`space-y-4 px-4 sm:px-6 pb-24 sm:pb-32 pt-6 ${contentClassName}`}
        >
          {stepsArray[currentStep - 1]}
        </StepContentWrapper>

        {/* Footer Navigation Buttons */}
        {!isCompleted && (
          <div
            className={`sticky bottom-10 left-0 right-0 px-4 sm:px-6 ${footerClassName}`}
          >
            <div
              className="max-w-5xl mx-auto flex justify-between items-center bg-white/30 backdrop-blur-sm
                         dark:bg-neutral-800/30 dark:backdrop-blur-sm
                         rounded-xl shadow-lg px-4 py-2"
            >
              {currentStep !== 1 && (
                <button
                  onClick={handleBack}
                  className="text-sm sm:text-base px-4 py-2 rounded-full cursor-pointer text-white bg-blue-500 hover:bg-blue-600 dark:hover:text-white transition"
                  {...backButtonProps}
                >
                  {backButtonText}
                </button>
              )}
              <div className="flex-1"></div>
              <button
                onClick={isLastStep ? handleComplete : handleNext}
                className="text-sm sm:text-base px-6 py-2 rounded-full font-semibold text-white bg-green-500 cursor-pointer hover:bg-green-600 active:bg-green-700 transition"
                {...nextButtonProps}
              >
                {isLastStep ? "Complete" : nextButtonText}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function StepContentWrapper({ isCompleted, currentStep, direction, children, className }) {
  const [parentHeight, setParentHeight] = useState(0);

  return (
    <motion.div
      style={{ position: "relative", overflow: "hidden" }}
      animate={{ height: isCompleted ? 0 : parentHeight }}
      transition={{ type: "spring", duration: 0.4 }}
      className={className}
    >
      <AnimatePresence initial={false} mode="sync" custom={direction}>
        {!isCompleted && (
          <SlideTransition
            key={currentStep}
            direction={direction}
            onHeightReady={(h) => setParentHeight(h)}
          >
            {children}
          </SlideTransition>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function SlideTransition({ children, direction, onHeightReady }) {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    if (containerRef.current) onHeightReady(containerRef.current.offsetHeight);
  }, [children, onHeightReady]);

  return (
    <motion.div
      ref={containerRef}
      custom={direction}
      variants={stepVariants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ duration: 0.4 }}
      style={{ position: "absolute", left: 0, right: 0, top: 0 }}
    >
      {children}
    </motion.div>
  );
}

const stepVariants = {
  enter: (dir) => ({ x: dir >= 0 ? "-100%" : "100%", opacity: 0 }),
  center: { x: "0%", opacity: 1 },
  exit: (dir) => ({ x: dir >= 0 ? "50%" : "-50%", opacity: 0 }),
};

export function Step({ children }) {
  return <div className="px-2 sm:px-6 lg:px-12">{children}</div>;
}

function StepIndicator({ step, currentStep, onClickStep, disableStepIndicators }) {
  const status =
    currentStep === step ? "active" : currentStep < step ? "inactive" : "complete";
  const handleClick = () => {
    if (step !== currentStep && !disableStepIndicators) onClickStep(step);
  };

  return (
    <motion.div
      onClick={handleClick}
      className="relative cursor-pointer outline-none focus:outline-none"
      animate={status}
      initial={false}
    >
      <motion.div
        variants={{
          inactive: { scale: 1, backgroundColor: "#222", color: "#a3a3a3" },
          active: { scale: 1, backgroundColor: "#5227FF", color: "#fff" },
          complete: { scale: 1, backgroundColor: "#5227FF", color: "#fff" },
        }}
        transition={{ duration: 0.3 }}
        className="flex h-8 w-8 items-center justify-center rounded-full font-semibold"
      >
        {status === "complete" ? (
          <CheckIcon className="h-4 w-4 text-white" />
        ) : (
          <span className="text-sm">{step}</span>
        )}
      </motion.div>
    </motion.div>
  );
}

function StepConnector({ isComplete }) {
  const lineVariants = {
    incomplete: { width: 0, backgroundColor: "transparent" },
    complete: { width: "100%", backgroundColor: "#5227FF" },
  };

  return (
    <div className="relative mx-1 h-0.5 flex-1 overflow-hidden rounded bg-neutral-400 dark:bg-neutral-600">
      <motion.div
        className="absolute left-0 top-0 h-full"
        variants={lineVariants}
        initial={false}
        animate={isComplete ? "complete" : "incomplete"}
        transition={{ duration: 0.4 }}
      />
    </div>
  );
}

function CheckIcon(props) {
  return (
    <svg {...props} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <motion.path
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 0.1, type: "tween", ease: "easeOut", duration: 0.3 }}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5 13l4 4L19 7"
      />
    </svg>
  );
}
