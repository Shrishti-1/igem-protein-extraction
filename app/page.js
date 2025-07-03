'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import Stepper, { Step } from '@/components/Stepper';
import Module1 from '@/components/Module1';
import Module2 from '@/components/Module2';

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
           <Module2/>
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
