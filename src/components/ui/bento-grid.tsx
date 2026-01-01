"use client"
import { cn } from "@/lib/utils";
import React from "react";

const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "grid md:auto-rows-[24rem] grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto ",
        className
      )}
    >
      {children}
    </div>
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
    <div
      className={cn(
        "row-span-1 rounded-3xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-4 dark:bg-black dark:border-white/[0.2] bg-white border border-transparent justify-between flex flex-col space-y-4",
        "backdrop-blur-xl saturate-180 bg-white/5 dark:bg-black/10 border-white/10 shadow-lg shadow-black/20 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] overflow-hidden",
        className
      )}
    >
      <div className="absolute inset-0 z-0">{header}</div>
      <div className="relative z-10 flex flex-col h-full justify-end p-4">
        <div className="font-sans font-bold text-neutral-50 dark:text-neutral-50 text-xl md:text-2xl mb-2 mt-2">
          {title}
        </div>
        <div className="font-sans font-normal text-neutral-300 text-xs dark:text-neutral-300">
          {description}
        </div>
      </div>
    </div>
  );
};

export { BentoGrid, BentoGridItem };
