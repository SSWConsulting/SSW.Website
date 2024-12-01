"use client";

import { cn } from "@/lib/utils";
import React, { MouseEvent, useEffect, useState } from "react";

export type ColorVariant = "primary" | "secondary";

interface RippleButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  rippleColor?: string;
  duration?: string;
  variant: ColorVariant;
}

const RippleButton = React.forwardRef<HTMLButtonElement, RippleButtonProps>(
  (
    {
      variant = "primary",
      className,
      children,
      rippleColor = "rgba(0, 0, 0, 0.25)",
      duration = "600ms",
      ...props
    },
    ref
  ) => {
    const [buttonRipples, setButtonRipples] = useState<
      Array<{ x: number; y: number; size: number; key: number }>
    >([]);

    const isPrimary = variant === "primary";
    const createRipple = (event: MouseEvent<HTMLButtonElement>) => {
      const button = event.currentTarget;
      const rect = button.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = event.clientX - rect.left - size / 2;
      const y = event.clientY - rect.top - size / 2;

      const newRipple = { x, y, size, key: Date.now() };
      setButtonRipples((prevRipples) => [...prevRipples, newRipple]);
    };

    useEffect(() => {
      if (buttonRipples.length > 0) {
        const lastRipple = buttonRipples[buttonRipples.length - 1];
        const timeout = setTimeout(() => {
          setButtonRipples((prevRipples) =>
            prevRipples.filter((ripple) => ripple.key !== lastRipple.key)
          );
        }, parseInt(duration));
        return () => clearTimeout(timeout);
      }
    }, [buttonRipples, duration]);

    return (
      <button
        className={cn(
          "text-primary relative flex cursor-pointer items-center justify-center overflow-hidden rounded-lg px-4 py-2 text-center",
          "",
          variants[variant],
          className
        )}
        onMouseEnter={isPrimary ? createRipple : undefined}
        ref={ref}
        {...props}
      >
        <div className="relative z-10">{children}</div>
        <span className="pointer-events-none absolute inset-0">
          {buttonRipples.map((ripple) => (
            <span
              className="absolute animate-rippling rounded-full opacity-30"
              key={ripple.key}
              style={{
                width: `${ripple.size}px`,
                height: `${ripple.size}px`,
                top: `${ripple.y}px`,
                left: `${ripple.x}px`,
                backgroundColor: rippleColor,
                transform: "scale(0)",
              }}
            />
          ))}
        </span>
      </button>
    );
  }
);

const variants: Record<ColorVariant, string> = {
  primary: "bg-ssw-red",
  secondary: "bg-transparent border-1.5",
};

RippleButton.displayName = "RippleButton";

export default RippleButton;
