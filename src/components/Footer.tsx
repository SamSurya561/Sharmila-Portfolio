import { cn } from "@/lib/utils";

export default function Footer() {
  return (
    <footer className={cn("w-full p-8 mt-16 md:mt-32 text-sm text-foreground/60")}>
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <span>© 2025 Sharmila S. All Rights Reserved.</span>
        <div className="font-mono text-xs bg-muted/50 border border-border px-2 py-1 rounded-md">
          App Version 1.1.0
        </div>
      </div>
    </footer>
  );
}
