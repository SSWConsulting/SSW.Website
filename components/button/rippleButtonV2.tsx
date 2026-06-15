"use client";
import { cn } from "@/lib/utils";
import React, { MouseEvent, useEffect, useState } from "react";
import { buttonOptions } from "../blocksSubtemplates/tinaFormElements/colourOptions/buttonOptions";

export type ColorVariant = "primary" | "secondary" | "ghost";

// Tina colour pickers store an index; each picker entry declares the variant
// it maps to, so buttonOptions is the single source of the index → variant
// contract and this lookup is derived from it.
export const buttonColorVariants: ColorVariant[] = buttonOptions.map(
  (option) => option.variant
);

const variants: Record<ColorVariant, string> = {
  primary: "bg-ssw-red hover:bg-sswDarkRed text-white",
  secondary:
    "bg-transparent outline -outline-1.5  outline-white -outline-offset-1.5 hover:outline-gray-200 hover:text-gray-200 text-white",
  ghost:
    "bg-transparent px-0 py-0 font-semibold text-white underline decoration-gray-400 decoration-1 hover:decoration-sswRed",
};

export type ButtonTinaFields = {
  textTinaField?: string;
};

interface RippleButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    ButtonTinaFields {
  children: React.ReactNode;
  rippleColor?: string;
  fontClassName?: string;
  duration?: string;
  variant: ColorVariant;
  /** When set, renders an <a> instead of a <button> for link-style CTAs. */
  href?: string;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
}

const RippleButton = React.forwardRef<HTMLButtonElement, RippleButtonProps>(
  (
    {
      variant = "primary",
      className,
      fontClassName,
      children,
      rippleColor = "rgba(0, 0, 0, 0.25)",
      duration = "600ms",
      textTinaField,
      href,
      onClick = () => {},
      ...props
    },
    ref
  ) => {
    const [buttonRipples, setButtonRipples] = useState<
      Array<{ x: number; y: number; size: number; key: number }>
    >([]);

    const isPrimary = variant === "primary";
    const createRipple = (event: MouseEvent<HTMLElement>) => {
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

    const sharedClassName = cn(
      "text-primary relative cursor-pointer items-center justify-center overflow-hidden rounded-md px-6 py-3 text-center",
      variants[variant],
      className
    );

    const inner = (
      <>
        <div
          data-tina-field={textTinaField}
          className={cn(
            "relative z-10 flex items-center justify-center gap-2",
            fontClassName
          )}
        >
          {children}
        </div>
        <span className="pointer-events-none absolute inset-0">
          {buttonRipples.map((ripple) => (
            <span
              className={"absolute animate-rippling rounded-full opacity-30"}
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
      </>
    );

    // Render a real <a> for link-style CTAs so we never nest a <button> inside
    // an <a> (invalid HTML and a11y-hostile). A single polymorphic element
    // keeps ref and rest props (aria-*, id, target, ...) forwarded in both
    // modes.
    const Comp = (href ? "a" : "button") as React.ElementType;
    return (
      <Comp
        href={href}
        onClick={onClick}
        className={sharedClassName}
        onMouseEnter={isPrimary ? createRipple : undefined}
        ref={ref}
        {...props}
      >
        {inner}
      </Comp>
    );
  }
);

RippleButton.displayName = "RippleButton";

export default RippleButton;
