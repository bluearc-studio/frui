type MockHandler = (data: any) => any;

const handlers: Record<string, MockHandler> = {};

export function MockRegisterNUICallback(event: string, handler: MockHandler) {
  handlers[event] = handler;
}

export async function MockTriggerNUICallback(event: string, data?: any) {
  const handler = handlers[event];

  if (!handler) {
    console.warn(`No mock handler for ${event}`);
    return;
  }

  return handler(data);
}

export function MockSendNUIMessage(message: any) {
  window.dispatchEvent(
    new MessageEvent("message", {
      data: message,
    }),
  );
}
