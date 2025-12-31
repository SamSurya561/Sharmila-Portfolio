export default function GridBackground() {
  return (
    <div className="fixed inset-0 z-[-1] h-full w-full bg-background">
      <div
        className="h-full w-full [mask-image:radial-gradient(ellipse_at_center,black_10%,transparent_70%)]"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--grid-color) 1px, transparent 1px), linear-gradient(to bottom, var(--grid-color) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      ></div>
    </div>
  );
}
