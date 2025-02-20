import { cn } from "@/lib/utils";

interface MarqueeProps {
  className?: string;
  gap: string;
  reverse?: boolean;
  paused?: boolean;
  pauseOnHover?: boolean;
  children?: React.ReactNode;
  vertical?: boolean;
  repeat?: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- this is MagicUI boilerplate
  [key: string]: any;
}

export function Marquee({
  className,
  gap = "--[gap:1rem]",
  reverse,
  paused,
  pauseOnHover = false,
  children,
  vertical = false,
  repeat = 7,
  ...props
}: MarqueeProps) {
  return (
    <div
      {...props}
      className={cn(
        "group flex overflow-hidden p-2 [--duration:40s] [gap:var(--gap)]",
        gap,
        {
          "flex-row": !vertical,
          "flex-col": vertical,
        },
        className
      )}
    >
      {Array(repeat)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            className={cn(
              "flex shrink-0 justify-around [gap:var(--gap)]",
              {
                "animate-marquee flex-row": !vertical,
                "animate-marquee-vertical flex-col": vertical,
                "group-hover:[animation-play-state:paused]": pauseOnHover,
                "[animation-direction:reverse]": reverse,
              },
              paused && "[animation-play-state:paused]"
            )}
          >
            {children}
          </div>
        ))}
    </div>
  );
}
