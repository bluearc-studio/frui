import { useState, useCallback } from "react";
import { useNuiEvent } from "./useNuiEvent";
import { useKeyBind } from "./useKeyBind";
import { fetchNui } from "../fetchNui";

interface VisibilityOptions {
  defaultVisible?: boolean;
  closeKey?: string | string[];
  openEventName: string;
  closeEventName?: string;
  closeTriggerEventName: string;
}

export function useVisibility(options: VisibilityOptions) {
  const {
    defaultVisible = false,
    closeKey = "Escape",
    openEventName,
    closeEventName,
    closeTriggerEventName,
  } = options;

  const [isVisible, setIsVisible] = useState(defaultVisible);

  useNuiEvent(openEventName, () => {
    setIsVisible(true);
  });

  useNuiEvent(closeEventName ?? "__noop__", () => {
    setIsVisible(false);
  });

  const closeUI = useCallback(() => {
    fetchNui(closeTriggerEventName, {});
    if (!closeEventName) {
      setIsVisible(false);
    }
  }, [closeTriggerEventName, closeEventName]);

  useKeyBind(closeKey as string, () => {
    if (isVisible) {
      closeUI();
    }
  });

  return { isVisible, setIsVisible, closeUI };
}
