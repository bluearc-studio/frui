import { useEffect, useRef } from "react";

export function useKeyBind(key: string, callback: () => void) {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    const targetKey = key.toLowerCase();

    const listener = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === targetKey) {
        callbackRef.current();
      }
    };

    window.addEventListener("keydown", listener);

    return () => {
      window.removeEventListener("keydown", listener);
    };
  }, [key]);
}
