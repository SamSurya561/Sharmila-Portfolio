"use client";
import { useState } from "react";
import Link from "next/link";
import {
  motion,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { cn } from "@/lib/utils";

const LIQUID_GLASS_CLASSES =
  "backdrop-blur-xl saturate-180 bg-white/5 dark:bg-black/10 border border-white/10 shadow-lg shadow-black/20";

const links = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-40 flex justify-center py-4"
      initial={false}
      animate={isScrolled ? "scrolled" : "top"}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <motion.nav
        layout
        variants={{
          top: {
            width: "max(60%, 400px)",
            borderRadius: "1.5rem",
          },
          scrolled: {
            width: "auto",
            borderRadius: "9999px",
          },
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 30,
          duration: 0.3,
        }}
        className={cn(
          "flex items-center justify-center",
          isScrolled
            ? LIQUID_GLASS_CLASSES
            : "bg-transparent"
        )}
      >
        <motion.ul
          layout="position"
          variants={{
            top: {
              gap: "1.5rem",
              padding: "0.75rem 2rem",
            },
            scrolled: {
              gap: "1rem",
              padding: "0.5rem 1.5rem",
            },
          }}
          className="flex"
        >
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors px-2 py-1"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </motion.ul>
      </motion.nav>
    </motion.header>
  );
}
