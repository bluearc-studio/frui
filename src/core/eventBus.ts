import { enqueueMessage, setBatchProcessor } from "./batcher";

type Handler = (data: any) => void;

const handlers: Record<string, Handler[]> = {};

function dispatch(message: any) {
  const { action, ...data } = message;

  const actionHandlers = handlers[action];

  if (!actionHandlers) return;

  for (const handler of actionHandlers) {
    handler(data);
  }
}

setBatchProcessor(dispatch);

window.addEventListener("message", (event) => {
  enqueueMessage(event.data);
});

export function subscribe(action: string, handler: Handler) {
  handlers[action] ??= [];
  handlers[action].push(handler);
}

export function unsubscribe(action: string, handler: Handler) {
  const list = handlers[action];

  if (!list) return;

  handlers[action] = list.filter((h) => h !== handler);
}
