import Image from 'next/image';
import React from 'react';
import GlossaryItem from './GlossaryItem';

const ProteinExpressionPage = () => {
  return (
    <div className="h-[5050px] w-full bg-gray-900 text-white px-4 py-8 sm:px-6 lg:px-8 space-y-10">

      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-start gap-6">
        <Image
          src="/doctor1.png"
          alt="Doctor illustration"
          width={129}
          height={129}
          className="rounded-lg object-contain flex-shrink-0"
          priority
        />
        <div className="relative bg-neutral-800 text-white px-5 py-3 rounded-xl shadow-md max-w-md">
          <p className="text-md font-medium leading-relaxed">
            We want to make a special protein from bacteria to help solve a problem (like making insulin or a specific enzyme).
          </p>
          {/* Speech bubble arrow */}
          <div className="absolute left-[-12px] top-5 w-0 h-0 border-t-8 border-b-8 border-r-8 border-transparent border-r-neutral-800" />
        </div>
      </div>
      {/* Welcome Section */}
      <section className="bg-gradient-to-r from-blue-500 to-green-500 rounded-xl p-6 shadow-lg text-center space-y-6">
        <p className="text-lg sm:text-xl text-white font-light">
          Building proteins in a lab might sound like magic, but it&apos;s actually a clever trick using tiny helpers called bacteria! Let&apos;s dive in and see how we use special tools like plasmids and two types of *E. coli* bacteria to build the proteins we need.
        </p>
      </section>

      {/* Process Overview */}
      <section className="max-w-4xl mx-auto space-y-8">
        <h2 className="text-3xl font-semibold text-center text-white">How Do We Build Proteins?</h2>

        <div className="space-y-6">
          <p className="text-lg sm:text-xl text-white">
            Imagine you want to make a specific toy car. You need the blueprints for that car, the factory to build it, and workers to assemble it. In protein expression, here&apos;s how we do it:
          </p>

          <div className="space-y-4">
            {/* Step 1: The Blueprint */}
            <div className="bg-blue-600 rounded-xl p-6 shadow-md">
              <h3 className="text-2xl font-semibold text-white">1. The Blueprint (Your Gene in a Plasmid)</h3>
              <p className="text-md sm:text-lg text-white">
                First, we need the &quot;instructions&quot; for making our protein. These instructions are a piece of DNA called a <strong>gene</strong>. We insert this gene into a small, circular piece of DNA called a <strong>plasmid</strong>. The plasmid is like a delivery truck that carries the gene into the bacteria.
              </p>
              <Image src="/plasmid.png" alt="Plasmid illustration" width={400} height={300} className="rounded-lg" />
              <p className="text-sm text-white mt-4">
                The plasmid also contains a <strong>promoter</strong> (an &quot;on&quot; switch) and a <strong>selectable marker</strong> (to help us identify successful bacteria).
              </p>
            </div>

            {/* Step 2: The Cloning Workhorse */}
            <div className="bg-green-600 rounded-xl p-6 shadow-md">
              <h3 className="text-2xl font-semibold text-white">2. The Cloning Workhorse (DH5alpha)</h3>
              <p className="text-md sm:text-lg text-white">
                We need to get our plasmid (with the gene inside) into bacteria. We use a special strain of <strong>E. coli</strong> called <em>DH5alpha</em> for this step.
              </p>
              <Image src="/dh5alpha.png" alt="DH5alpha bacteria" width={400} height={300} className="rounded-lg" />
              <p className="text-sm text-white mt-4">
                <em>DH5alpha</em> bacteria are perfect at taking in plasmids and keeping them stable. We use heat shock to make their membrane permeable, allowing them to absorb the plasmid.
              </p>
            </div>

            {/* Step 3: The Protein Factory */}
            <div className="bg-red-600 rounded-xl p-6 shadow-md">
              <h3 className="text-2xl font-semibold text-white">3. The Protein Factory (BL21)</h3>
              <p className="text-md sm:text-lg text-white">
                After creating lots of DH5alpha bacteria, we need a special &quot;factory&quot; to make the protein. That&apos;s where another strain of <strong>E. coli</strong> called <em>BL21</em> comes in.
              </p>
              <Image src="/bl21coli.png" alt="BL21 bacteria" width={400} height={300} className="rounded-lg" />
              <p className="text-sm text-white mt-4">
                <em>BL21</em> cells have everything they need to produce proteins in large amounts. They have a special enzyme that helps turn on the gene and make lots of mRNA.
              </p>
            </div>

            {/* Step 4: Turning on the Factory */}
            <div className="bg-yellow-600 rounded-xl p-6 shadow-md">
              <h3 className="text-2xl font-semibold text-white">4. Turning on the &quot;Factory&quot; (Induction)</h3>
              <p className="text-md sm:text-lg text-white">
                We add a special chemical called <strong>IPTG</strong> to tell the BL21 cells to start making the protein. This acts as a &quot;start&quot; button, turning on the protein-making machinery inside the bacteria.
              </p>
              <Image src="/iptg.png" alt="IPTG induction" width={400} height={300} className="rounded-lg" />
            </div>

            {/* Step 5: Collecting the Product */}
            <div className="bg-purple-600 rounded-xl p-6 shadow-md">
              <h3 className="text-2xl font-semibold text-white">5. Collecting the Product (Harvesting and Lysis)</h3>
              <p className="text-md sm:text-lg text-white">
                After the BL21 cells have made the protein, we collect them and break open (or &quot;lyse&quot;) the cells to release the protein.
              </p>
              <Image src="/lysis.png" alt="Cell lysis" width={400} height={300} className="rounded-lg" />
            </div>

            {/* Step 6: Purification */}
            <div className="bg-indigo-600 rounded-xl p-6 shadow-md">
              <h3 className="text-2xl font-semibold text-white">6. Cleaning Up (Purification)</h3>
              <p className="text-md sm:text-lg text-white">
                Finally, we need to purify the protein, separating it from the other proteins made by the bacteria. This is a more advanced step that involves using special tools like chromatography.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Glossary Section */}
      <section className="rounded-xl p-6 shadow-md max-w-4xl mx-auto space-y-6 max-h-[32rem] overflow-y-auto">
        <h2 className="text-2xl font-semibold text-white mb-4">🧬 Quick Glossary</h2>

        <GlossaryItem
          term="Gene"
          definition="A small section of DNA that carries instructions to make a specific protein."
          imageSrc="/gene.png"
        />
        <GlossaryItem
          term="Protein"
          definition="Proteins are molecules made by cells that do many jobs, like building the body or fighting germs."
          imageSrc="/protein.png"
        />
        <GlossaryItem
          term="Plasmid"
          definition="A small, circular piece of DNA that carries the gene into the bacteria to express the protein."
          imageSrc="/plasmid.png"
        />
        <GlossaryItem
          term="E. coli"
          definition="A common bacteria used in labs for protein production. Strains like DH5alpha and BL21 are especially helpful."
          imageSrc="/ecoli.png"
        />
      </section>
    </div>
  );
};

export default ProteinExpressionPage;
  