import { useEffect, useRef } from "react";

export function useKeyBind(key: string | string[], callback: () => void) {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    const targetKeys = (Array.isArray(key) ? key : [key]).map((k) =>
      k.toLowerCase(),
    );

    const listener = (e: KeyboardEvent) => {
      if (targetKeys.includes(e.key.toLowerCase())) {
        callbackRef.current();
      }
    };

    window.addEventListener("keydown", listener);

    return () => {
      window.removeEventListener("keydown", listener);
    };
  }, [key]);
}
