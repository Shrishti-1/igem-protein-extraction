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
      className="text-white md:p-[11rem] min-h-screen w-full bg-[#111]"
      style={{
        backgroundImage: "url('/labo.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
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
            <Module1 />
          </Step>
        </Step>

        <Step>
          <Module2 />
        </Step>

        <Step>
         <Module3/>
        </Step>

        <Step>
<Module4/>
        </Step>
        <Step>
        
          <Module5/>
        </Step>
        <Step>
          <Module6/>
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
