import { useEffect, useRef } from "react";
import { subscribe, unsubscribe } from "../core/eventBus";

export function useNuiEvent<T>(action: string, handler: (data: T) => void) {
  const handlerRef = useRef(handler);

  handlerRef.current = handler;

  useEffect(() => {
    const wrapped = (data: T) => {
      handlerRef.current(data);
    };

    subscribe(action, wrapped);

    return () => {
      unsubscribe(action, wrapped);
    };
  }, [action]);
}
