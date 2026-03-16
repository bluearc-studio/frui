import { isEnvBrowser } from "./isEnvBrowser";
import { MockTriggerNUICallback } from "./mock";

export async function fetchNui<T = unknown>(
  eventName: string,
  data?: any,
): Promise<T> {
  if (isEnvBrowser()) {
    return MockTriggerNUICallback(eventName, data) as Promise<T>;
  }

  const res = await fetch(`https://${GetParentResourceName()}/${eventName}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify(data ?? {}),
  });

  return res.json() as Promise<T>;
}
