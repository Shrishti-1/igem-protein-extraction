import Image from 'next/image';
import React from 'react';
import GlossaryItem from './GloassaryItem';

const Module1 = () => {
  return (
    <div className=" min-h-screen w-full text-white px-4 py-8 sm:px-6 lg:px-8 space-y-10">
      {/* Doctor with Speech Bubble */}
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


      {/* Glossary Section */}
      <section className=" rounded-xl p-6 shadow-md max-w-4xl mx-auto space-y-6 max-h-[32rem] overflow-y-auto">
        <h2 className="text-2xl font-semibold text-white mb-4">🧬 Quick Glossary</h2>

        <GlossaryItem
          term="Gene"
          definition="A small section of DNA that carries instructions to make a specific protein."
          imageSrc="/gene.png"
        />
        <GlossaryItem
          term="Protein"
          definition="Proteins are molecules made by cells that do many jobs, like building the body or fighting germs."
          imageSrc="/images/protein.png"
        />
        <GlossaryItem
          term="Bacteria"
          definition="Tiny living organisms. Some can make useful things like insulin, while others may cause illness."
          imageSrc="/images/bacteria.png"
        />
        <GlossaryItem
          term="DNA"
          definition="The instruction book of life, found in almost every living thing. DNA carries all genetic information."
          imageSrc="/images/dna.png"
        />
      </section>
    </div>
  );
};

export default Module1;
