"use client";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import React from "react";

const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.15,
          },
        },
      }}
      className={cn(
        "grid md:auto-rows-[24rem] grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto ",
        className
      )}
    >
      {children}
    </motion.div>
  );
};

const BentoGridItem = ({
  className,
  title,
  description,
  header,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
}) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 30, scale: 0.95 },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: {
            type: "spring",
            stiffness: 100,
            damping: 20,
            mass: 1
          }
        },
      }}
      whileHover={{
        y: -5,
        scale: 1.02,
        transition: { duration: 0.2, ease: "easeOut" }
      }}
      className={cn(
        "row-span-1 rounded-3xl group/bento hover:shadow-2xl transition duration-200 shadow-input dark:shadow-none p-4 dark:bg-black dark:border-white/[0.2] bg-white border border-transparent justify-between flex flex-col space-y-4",
        "backdrop-blur-xl saturate-180 bg-white/5 dark:bg-black/10 border-white/10 shadow-lg shadow-black/20 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] overflow-hidden",
        "relative", // Ensure z-index layering works correctly
        className
      )}
    >
      {/* Background/Header Layer */}
      <div className="absolute inset-0 z-0 transition-transform duration-500 group-hover/bento:scale-105">
        {header}
      </div>

      {/* Content Layer - Added a gentle gradient to ensure text readability on hover */}
      <div className="relative z-10 flex flex-col h-full justify-end p-4 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-60 rounded-3xl" />

        <motion.div
          className="relative z-20"
          initial={{ x: 0 }}
          whileHover={{ x: 2 }} // Subtle shift on hover
        >
          <div className="font-sans font-bold text-neutral-50 dark:text-neutral-50 text-xl md:text-2xl mb-2 mt-2 drop-shadow-md">
            {title}
          </div>
          <div className="font-sans font-normal text-neutral-200 text-xs dark:text-neutral-300 drop-shadow-sm line-clamp-3">
            {description}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export { BentoGrid, BentoGridItem };