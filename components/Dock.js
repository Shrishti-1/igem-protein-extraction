"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";

const scrollToSection = (id) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
};

function DockLabel({ children, isHovered }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const unsubscribe = isHovered.on("change", (val) => {
      setIsVisible(val === 1);
    });
    return () => unsubscribe();
  }, [isHovered]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: 0 }}
          animate={{ opacity: 1, x: 12 }}
          exit={{ opacity: 0, x: 0 }}
          transition={{ duration: 0.2 }}
          className="absolute left-full top-1/2 -translate-y-1/2 ml-3 px-3 py-1 text-xs text-white bg-black/50 rounded-md border border-white/10 shadow-lg backdrop-blur-md z-50"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function DockItem({
  label,
  onClick,
  isActive,
  mouseY,
  spring,
  distance,
  baseItemSize,
}) {
  const ref = useRef(null);
  const isHovered = useMotionValue(0);

  const mouseDistance = useTransform(mouseY, (val) => {
    const rect = ref.current?.getBoundingClientRect() ?? {
      y: 0,
      height: baseItemSize,
    };
    return val - rect.y - baseItemSize / 2;
  });

  const targetScale = useTransform(
    mouseDistance,
    [-distance, 0, distance],
    [1, 1.1, 1]
  );
  const scale = useSpring(targetScale, spring);

  return (
    <motion.div
      ref={ref}
      style={{ scale }}
      onMouseEnter={() => isHovered.set(1)}
      onMouseLeave={() => isHovered.set(0)}
      onClick={onClick}
      className={`relative w-full h-[50px] px-4 flex items-center justify-start cursor-pointer rounded-lg transition-all duration-300 border
        ${
          isActive
            ? "bg-blue-900/40 text-white font-semibold shadow-[0_0_15px_#3b82f6] border-blue-400"
            : "bg-black/20 text-white/90 hover:bg-black/30 border-white/20"
        }
        backdrop-blur-md`}
    >
      {isActive && (
        <motion.div
          layoutId="active-bar"
          className="absolute left-0 top-1/4 bottom-1/4 w-1 rounded-r-full bg-blue-400 shadow-[0_0_10px_#3b82f6]"
        />
      )}
      <span className="text-sm z-10">{label}</span>
      <DockLabel isHovered={isHovered}>{label}</DockLabel>
    </motion.div>
  );
}

export default function Dock({
  sections,
  activeId,
  className = "",
  spring = { mass: 0.1, stiffness: 150, damping: 12 },
  distance = 120,
  baseItemSize = 48,
  dockWidth = 220,
}) {
  const mouseY = useMotionValue(Infinity);
  const isHovered = useMotionValue(0);

  return (
    <motion.div
      onMouseMove={({ pageY }) => {
        isHovered.set(1);
        mouseY.set(pageY);
      }}
      onMouseLeave={() => {
        isHovered.set(0);
        mouseY.set(Infinity);
      }}
      className={`fixed top-4 left-4 h-[95vh] overflow-y-auto p-4 rounded-2xl z-50 
        shadow-xl border border-blue-900/50
        bg-black/20 backdrop-blur-lg 
        before:content-[''] before:absolute before:inset-0 before:rounded-2xl
        before:bg-gradient-to-br before:from-blue-900/40 before:to-black/10 before:blur-md before:z-[-1]
        after:content-[''] after:absolute after:inset-0 after:rounded-2xl
        after:ring-1 after:ring-blue-900/50 after:z-[-1]
        ${className}`}
      style={{ width: dockWidth }}
    >
      <h3 className="text-xl font-bold text-white mb-5 border-b border-blue-900/50 pb-2">
        Index
      </h3>
      <div className="flex flex-col gap-3">
        {sections.map((section, idx) => (
          <DockItem
            key={idx}
            label={section.title}
            onClick={() => scrollToSection(section.id)}
            isActive={activeId === section.id}
            mouseY={mouseY}
            spring={spring}
            distance={distance}
            baseItemSize={baseItemSize}
          />
        ))}
      </div>
    </motion.div>
  );
}
