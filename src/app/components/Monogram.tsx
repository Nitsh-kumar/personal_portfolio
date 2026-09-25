import Image from "next/image";

interface MonogramProps {
  className?: string;
  size?: number;
  variant?: "white" | "charcoal";
  priority?: boolean;
}

export default function Monogram({
  className = "",
  size = 32,
  variant = "white",
  priority = false,
}: MonogramProps) {
  const src = variant === "charcoal" ? "/n-monogram-charcoal.png" : "/n-monogram-white.png";
  
  // Aspect ratio of the tightly cropped asset: 684px wide by 705px high
  const aspect = 684 / 705;
  const width = Math.round(size * aspect);
  const height = size;

  return (
    <span
      className={`inline-flex items-center justify-center shrink-0 leading-none select-none ${className}`}
      style={{ width, height }}
      aria-hidden="true"
    >
      <Image
        src={src}
        alt="N Monogram"
        width={width}
        height={height}
        priority={priority}
        className="w-full h-full object-contain pointer-events-none"
      />
    </span>
  );
}
