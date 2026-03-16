import { useState, useCallback } from "react";
import { useNuiEvent } from "./useNuiEvent";
import { useKeyBind } from "./useKeyBind";
import { fetchNui } from "../fetchNui";

interface VisibilityOptions {
  defaultVisible?: boolean;
  closeKey?: string | string[];
  openEventName?: string;
  closeEventName?: string;
}

export function useVisibility(options: VisibilityOptions = {}) {
  const {
    defaultVisible = false,
    closeKey = "Escape",
    openEventName = "openUI",
    closeEventName = "closeUI",
  } = options;

  const [isVisible, setIsVisible] = useState(defaultVisible);

  useNuiEvent<boolean>(openEventName, (visible) => {
    setIsVisible(visible);
  });

  const closeUI = useCallback(() => {
    setIsVisible(false);
    fetchNui(closeEventName, {});
  }, [closeEventName]);

  useKeyBind(closeKey as string, () => {
    if (isVisible) {
      closeUI();
    }
  });

  return { isVisible, setIsVisible, closeUI };
}
