'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import Stepper, { Step } from '@/components/Stepper';

const Page = () => {
  const [name, setName] = useState('');

  return (
    <div className="text-white p-6 min-h-screen w-full bg-[#111]">
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
            <h2 className="text-xl font-bold">Step 1: DNA Isolation</h2>
            <p className="text-sm mb-4">Watch how bacterial cells are lysed to extract genetic material.</p>
          </Step>

        </Step>

        <Step>
          <h2 className="text-2xl font-semibold mb-2">Step 2</h2>

          <Image
            src="https://www.purrfectcatgifts.co.uk/cdn/shop/collections/Funny_Cat_Cards_640x640.png?v=1663150894"
            alt="Funny Cat"
            width={640}
            height={320}
            className="w-full max-w-md h-auto object-cover rounded-xl mt-4"
          />

          <p className="mt-2">Custom step content!</p>
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
