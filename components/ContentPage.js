"use client";
import React, { useEffect, useRef, useState } from "react";
import Dock from "./Dock";
import { motion, AnimatePresence } from "framer-motion";

const ContentPage = () => {
  // Generate 20 sections dynamically
  const sections = Array.from({ length: 20 }, (_, i) => ({
    id: `section${i + 1}`,
    title: `Section ${i + 1}`,
  }));

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
      <div className="hidden lg:block">
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
              className="fixed top-0 right-0 bottom-0 w-72 bg-gradient-to-br from-[#111111cc] to-[#1c1c1ccc] backdrop-blur-lg border-l border-white/20 z-50 p-4 overflow-y-auto rounded-l-2xl shadow-xl"
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
                      ${
                        activeId === section.id
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
        className="flex-1 h-screen overflow-y-scroll p-6 space-y-20 lg:ml-[260px]"
      >
        <div className="bg-white bg-opacity-80 text-black p-10 rounded-[1rem]">
          {sections.map((section) => (
            <div key={section.id} id={section.id} className="min-h-screen">
              <h2 className="text-3xl font-bold mb-4">{section.title}</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                tristique consequat placerat. Vestibulum auctor pellentesque sem,
                eu posuere erat hendrerit quis. Maecenas vel consequat turpis.
                Nam facilisis, ligula in mattis sodales, augue justo tristique
                nulla, sed lacinia ante eros ut mi.
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContentPage;
