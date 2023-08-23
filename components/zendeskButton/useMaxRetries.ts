import { useEffect, useRef } from "react";

export function useMaxRetries(
  fn: () => void | Promise<void>,
  options: {
    min?: number;
    max?: number;
    interval?: number;
    immediate?: boolean;
  } = {
    min: 1,
    max: 10,
    interval: 50,
    immediate: true,
  }
) {
  const { min, max, interval, immediate } = options;
  const task = useRef(fn);
  const fnRef = useRef(null);
  const timerRef = useRef<NodeJS.Timer | null>(null);
  const countRef = useRef<number>(0);

  fnRef.current = () => {
    timerRef.current = setTimeout(() => {
      task.current();
      countRef.current++;
      if (countRef.current >= max) {
        clearTimeout(timerRef.current);
        return;
      }
      clearTimeout(timerRef.current);
      fnRef.current();
    }, interval);
  };

  function run() {
    try {
      fnRef.current();
    } catch (error) {
      if (countRef.current < min) {
        console.error(`RETRYING ${error}`);
      } else {
        clearTask();
      }
    }
  }

  function start() {
    clearTask();
    countRef.current = 0;
    immediate && countRef.current++ && task.current();
    run();
  }

  function clearTask() {
    timerRef.current && clearTimeout(timerRef.current);
    timerRef.current = null;
  }

  useEffect(() => {
    return () => {
      clearTask();
    };
  }, []);

  return { start };
}
