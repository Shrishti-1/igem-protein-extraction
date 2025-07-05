import React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const GlossaryItem = ({ term, definition, imageSrc }) => {
  const [show, setShow] = React.useState(false);

  return (
    <div
      onClick={() => setShow(!show)}
      className="cursor-pointer w-full bg-white border border-blue-200 shadow-sm hover:shadow-md transition rounded-xl p-4 space-y-3"
    >
      <h3 className="text-blue-700 font-bold text-lg sm:text-xl">{term}</h3>

      <AnimatePresence initial={false}>
        {show && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden flex flex-col sm:flex-row items-start gap-4"
          >
            {imageSrc && (
              <Image
                src={imageSrc}
                alt={`${term} illustration`}
                width={60}
                height={60}
                className="rounded-lg object-contain shrink-0"
              />
            )}
            <p className="text-gray-700 text-sm sm:text-base leading-snug">
              {definition}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GlossaryItem;
