'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import Stepper, { Step } from '@/components/Stepper';
import Module1 from '@/components/Module1';

const Page = () => {
  const [name, setName] = useState('');

  return (
    <div className="text-white md:p-[11rem] min-h-screen  w-full bg-[#111]">
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

          <Step>
          
            <Module1/>
          </Step>

        </Step>

        <Step>
           <div className="max-w-4xl mx-auto flex flex-row items-start gap-4 sm:gap-6">
            <Image
              src="/doctor1.png"
              alt="Doctor illustration"
              width={129}
              height={129}
              className="rounded-lg object-contain flex-shrink-0 w-[64px] h-[64px] sm:w-[100px] sm:h-[100px] md:w-[129px] md:h-[129px]"
              priority
            />
            <div className="relative bg-neutral-800 text-white px-4 py-3 rounded-xl shadow-md w-full">
              <p className="text-sm sm:text-md font-medium leading-relaxed">
                We want to make a special protein from bacteria to help solve a problem (like making insulin or a specific enzyme).
              </p>
              {/* Speech bubble arrow */}
              <div className="absolute left-[-10px] top-5 w-0 h-0 border-t-8 border-b-8 border-r-8 border-transparent border-r-neutral-800" />
            </div>
          </div>
        </Step>

        <Step>
          <h2 className="text-2xl font-semibold mb-2">How about an input?</h2>
          <input
            className="mt-2 px-4 py-2 rounded-md bg-gray-800 border border-gray-600 text-white w-full"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name?"
          />
        </Step>

        <Step>
          <h2 className="text-2xl font-semibold mb-2">Final Step</h2>
          <p>You made it!</p>
        </Step>
        <Step>
          <h2 className="text-2xl font-semibold mb-2">Final Step</h2>
          <p>You made it!</p>
        </Step>
        <Step>
          <h2 className="text-2xl font-semibold mb-2">Final Step</h2>
          <p>You made it 6th!</p>
        </Step>
        <Step>
          <h2 className="text-2xl font-semibold mb-2">Final Step</h2>
          <p>You made it till7th!</p>
        </Step>
      </Stepper>
    </div>
  );
};

export default Page;
