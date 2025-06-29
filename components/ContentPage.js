"use client";
import React, { useEffect, useRef, useState } from "react";
import Dock from "./Dock";
import { motion, AnimatePresence } from "framer-motion";
import { useMemo } from "react";

const ContentPage = () => {
  // Generate 20 sections dynamically

  const sections = useMemo(() => [
    {
      id: "section1",
      title: "Abhyudaya",
      highPara: "Welcome to our platform. Here’s what you need to know.",
      // middleImages:
      //   "https://images.pexels.com/photos/1870376/pexels-photo-1870376.jpeg?_gl=1*bi5slv*_ga*MjUwMzQ1MzA4LjE3NTA5NTcyMjk.*_ga_8JE65Q40S6*czE3NTA5NTcyMjgkbzEkZzEkdDE3NTA5NTcyMzMkajU1JGwwJGgw,/background.jpg,/background.jpg",
      endPara: "We hope this introduction gives you a good start.",
      // gap: 10
    },
    {
      id: "section2",
      title: "Features",
      highPara: "Our key features include speed, security, and scalability.",
      middleImages: "https://via.placeholder.com/300",
      endPara: "These features make us stand out from the competition.",
      gap: 10
    },
    {
      id: "section3",
      title: "Usage",
      highPara: "You can start using the platform by signing up.",
      middleImages:
        "https://via.placeholder.com/200,https://via.placeholder.com/200,https://via.placeholder.com/200",
      endPara: "The usage process is streamlined for your convenience.",
      gap: 10
    },
    {
      id: "section4",
      title: "Conclusion",
      highPara: "Thanks for taking the time to learn about our platform.",
      middleImages: "",
      endPara: "Feel free to reach out with any questions!",
      gap: 10 
    },
  ], []);



  const [activeId, setActiveId] = useState(null);
  const [showIndexMobile, setShowIndexMobile] = useState(false);
  const contentRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    const elements = sections
      .map((section) => document.getElementById(section.id))
      .filter(Boolean);
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
      observer.disconnect();
    };
  }, [sections]);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setShowIndexMobile(false); // close on mobile after clicking
  };

  return (
    <section
      className="relative flex min-h-screen text-white bg-cover bg-center"
      style={{
        backgroundImage: `url('/background.jpg')`,
      }}
    >
      {/* Large Screen Dock */}
      <div className="hidden lg:block w-1/4 p-3 h-[94vh] ">
        <Dock sections={sections} activeId={activeId} />
      </div>

      {/* Mobile Toggle Button */}
      <button
        onClick={() => setShowIndexMobile((v) => !v)}
        className="fixed bottom-6 right-6 z-50 rounded-full bg-blue-600 p-4 shadow-lg hover:bg-blue-700 transition-colors lg:hidden"
        aria-label="Toggle Index"
        title="Toggle Index"
      >
        {/* Hamburger icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          {showIndexMobile ? (
            // X icon when open
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            // Hamburger icon when closed
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      {/* Mobile Dock Overlay */}
      <AnimatePresence>
        {showIndexMobile && (
          <>
            {/* Overlay backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowIndexMobile(false)}
              className="fixed inset-0 bg-black z-40"
            />

            {/* Dock panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 bottom-0 w-96 bg-gradient-to-br from-[#111111cc] to-[#1c1c1ccc] backdrop-blur-lg border-l border-white/20 z-50 p-4 overflow-y-auto rounded-l-2xl shadow-xl"
            >
              <h3 className="text-xl font-bold text-white mb-5 border-b border-white/10 pb-2">
                Index
              </h3>
              <div className="flex flex-col gap-3">
                {sections.map((section, idx) => (
                  <button
                    key={idx}
                    onClick={() => scrollToSection(section.id)}
                    className={`relative w-full text-left cursor-pointer rounded-lg px-4 py-3 transition-colors duration-300
                      ${activeId === section.id
                        ? "bg-blue-600 text-white font-bold shadow-[0_0_12px_#3b82f6]"
                        : "text-white/80 hover:bg-white/10"
                      }
                      backdrop-blur-sm`}
                  >
                    {section.title}
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div
        ref={contentRef}
        className="flex-1 h-screen overflow-y-scroll px-10 py-4 space-y-20"
      >
        <div className="bg-white bg-opacity-80 text-black p-10 shadow-lg rounded-[1rem]">
          {sections.map((section) => (
            <div
              key={section.id}
              id={section.id}
              style={{ marginBottom: `${section.gap ?? 0}rem` }}
            >

              {/* Title */}
              {section.title && (
                <h2 className="text-3xl font-bold mb-4">{section.title}</h2>
              )}

              {/* High-level Paragraph */}
              {section.highPara && (
                <p className="text-lg mb-6 text-gray-800 leading-relaxed">
                  {section.highPara}
                </p>
              )}

              {/* Images Grid */}
              {section.middleImages &&
                section.middleImages.trim() !== "" &&
                (() => {
                  const images = section.middleImages
                    .split(",")
                    .map((url) => url.trim())
                    .filter(Boolean);
                  const cols =
                    images.length === 1
                      ? "grid-cols-1"
                      : images.length === 2
                        ? "grid-cols-2"
                        : "grid-cols-3";

                  return (
                    <div className={`grid ${cols} gap-4 mb-6`}>
                      {images.map((img, idx) => (
                        <img
                          key={idx}
                          src={img}
                          alt={`Section ${section.id} - image ${idx + 1}`}
                          className="w-full h-auto rounded-lg shadow-md object-cover"
                          loading="lazy"
                        />
                      ))}
                    </div>
                  );
                })()}

              {/* End Paragraph */}
              {section.endPara && (
                <p className="text-base text-gray-700 leading-relaxed">
                  {section.endPara}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

    </section>
  );
};

export default ContentPage;
