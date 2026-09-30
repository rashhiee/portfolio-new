"use client";

import React from "react";
import { motion } from "framer-motion";

export interface BouncingSquareProps {
  className?: string;
  squareClassName?: string;
  shadowClassName?: string;
}

export const BouncingSquare = ({
  className = "",
  squareClassName = "",
  shadowClassName = "",
}: BouncingSquareProps) => {
  return (
    <div
      className={`relative w-14 h-18 sm:w-16 sm:h-20 flex items-end justify-center select-none ${className}`}
    >
      {/* Dynamic Ground Contact Shadow */}
      <motion.div
        className={`absolute bottom-0 w-11 sm:w-12 h-1.5 bg-zinc-300 dark:bg-zinc-700/80 rounded-full blur-[2px] ${shadowClassName}`}
        animate={{
          scaleX: [1.25, 0.55, 1.25],
          opacity: [0.85, 0.25, 0.85],
        }}
        transition={{ duration: 0.65, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Enlarged Bouncing Square with Smooth Squash & Stretch */}
      <motion.div
        className={`w-9 h-9 sm:w-10 sm:h-10 bg-zinc-900 dark:bg-white rounded-[5px] origin-bottom shadow-md ${squareClassName}`}
        animate={{
          y: [0, -34, 0],
          scaleY: [0.78, 1.12, 0.78],
          scaleX: [1.22, 0.88, 1.22],
        }}
        transition={{ duration: 0.65, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
};

export default BouncingSquare;
