import { isEnvBrowser } from "./isEnvBrowser";

export async function fetchNui<T = unknown>(
  eventName: string,
  data?: any,
): Promise<T> {
  if (isEnvBrowser()) {
    return {} as T;
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
