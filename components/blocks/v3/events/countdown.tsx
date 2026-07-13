"use client";
import { useEffect, useState } from "react";

type Remaining = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

const getRemaining = (target: number): Remaining => {
  const total = Math.max(target - Date.now(), 0);
  return {
    days: Math.floor(total / 86_400_000),
    hours: Math.floor((total / 3_600_000) % 24),
    minutes: Math.floor((total / 60_000) % 60),
    seconds: Math.floor((total / 1_000) % 60),
  };
};

export function Countdown({ date }: { date?: string }) {
  const target = date ? new Date(date).getTime() : NaN;
  // Start null so the server render and first client render match (no Date.now
  // on the server); the effect fills it in after hydration.
  const [remaining, setRemaining] = useState<Remaining | null>(null);

  useEffect(() => {
    if (Number.isNaN(target)) return;
    setRemaining(getRemaining(target));
    const id = setInterval(() => setRemaining(getRemaining(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  if (!remaining) return null;

  const units = [
    { value: remaining.days, label: "Days" },
    { value: remaining.hours, label: "Hours" },
    { value: remaining.minutes, label: "Min" },
    { value: remaining.seconds, label: "Secs" },
  ];

  return (
    <div className="flex items-center justify-center gap-2 rounded-full bg-white/10 px-4 py-4 backdrop-blur-sm sm:gap-6 sm:px-8 sm:py-5">
      {units.map((unit, index) => (
        <div key={unit.label} className="flex items-center gap-2 sm:gap-6">
          {index > 0 && <span className="h-10 w-px bg-white/20" />}
          <div className="flex flex-col items-center">
            <span className="text-2xl font-semibold tabular-nums text-white sm:text-4xl">
              {String(unit.value).padStart(2, "0")}
            </span>
            <span className="text-xs text-gray-300">{unit.label}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
