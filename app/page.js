'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import Stepper, { Step } from '@/components/Stepper';
import Module1 from '@/components/Module1';
import Module2 from '@/components/Module2';
import Module3 from '@/components/Module3';
import Module4 from '@/components/Module4';
import Module5 from '@/components/Module5';
import Module6 from '@/components/Module6';

const Page = () => {
  const [name, setName] = useState('');

  return (
    <div
      className="text-white min-h-screen w-full bg-[#111] flex flex-col items-center justify-center"
      style={{
        backgroundImage: "url('/labo.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="w-full h-full flex flex-col justify-center items-center">
        <Stepper
          initialStep={1}
          onStepChange={(step) => {
            console.log('Current step:', step);
          }}
          onFinalStepCompleted={() => console.log('All steps completed!')}
          backButtonText="Previous"
          nextButtonText="Next"
        >
          <Step>
            <div className="min-h-[500px] flex justify-center items-center w-full">
              <Module1 />
            </div>
          </Step>

          <Step>
            <div className="min-h-[500px] flex justify-center items-center w-full">
              <Module2 />
            </div>
          </Step>

          <Step>
            <div className="min-h-[500px] flex justify-center items-center w-full">
              <Module3 />
            </div>
          </Step>

          <Step>
            <div className="min-h-[500px] flex justify-center items-center w-full">
              <Module4 />
            </div>
          </Step>

          <Step>
            <div className="min-h-[500px] flex justify-center items-center w-full">
              <Module5 />
            </div>
          </Step>

          <Step>
            <div className="min-h-[500px] flex justify-center items-center w-full">
              <Module6 />
            </div>
          </Step>
        </Stepper>
      </div>
    </div>
  );
};

export default Page;
