import { useEffect } from "react";

export function useNuiEvent<T>(action: string, handler: (data: T) => void) {
  useEffect(() => {
    const listener = (event: MessageEvent) => {
      const { action: eventAction, ...data } = event.data;

      if (eventAction === action) {
        handler(data as T);
      }
    };

    window.addEventListener("message", listener);

    return () => {
      window.removeEventListener("message", listener);
    };
  }, [action, handler]);
}
