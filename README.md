# Frui

## Introduction

React utilities for developing FiveM NUI with React + TypeScript.

## Installation

```bash
npm i @bluearc/frui
```

## Utilities

### Function

**fetchNui**

Send data from NUI (React) to the game (Lua). Returns a Promise that resolves with the game's response. Use this to trigger callbacks, send data, or request information from the server/client.

```tsx
import { fetchNui } from "@bluearc/frui";

await fetchNui("ping", {
  message: "pong",
});
```

**useNuiEvent**

Listen for events sent from the game (Lua) to NUI via `SendNUIMessage`. The callback receives the data payload sent from the game. Automatically handles cleanup on unmount.

```tsx
import { useNuiEvent } from "@bluearc/frui";

useNuiEvent("sendData", (data) => {
  console.log(data);
});
```

**useKeyBind**

Bind a keyboard key to trigger a callback. Supports single keys, modifier combinations (e.g., "Shift+Escape"), and special keys. Automatically handles cleanup on unmount.

```tsx
import { useKeyBind } from "@bluearc/frui";

useKeyBind("Enter", () => {
  fetchNui("ping");
});
```

**useVisibility**

Manage NUI visibility state with built-in keyboard support and NUI event integration. Handles the open/close UI pattern common in FiveM NUI applications.

- `openEventName` (required): Event listener that sets UI to visible
- `closeTriggerEventName` (required): NUI callback triggered when closing
- `closeEventName` (optional): Event listener that sets UI to hidden. If not provided, `closeUI()` directly sets visibility to false

```tsx
import { useVisibility } from "@bluearc/frui";

// openEventName and closeTriggerEventName are required
// closeEventName is optional
//   - if provided: closeUI() triggers NUI callback and waits for closeEventName to set isVisible = false
//   - if not provided: closeUI() triggers NUI callback and directly sets isVisible = false

// With closeEventName (event-based)
const { isVisible, closeUI } = useVisibility({
  defaultVisible: false,
  closeKey: "Escape",
  openEventName: "showUI",
  closeEventName: "hideUI",
  closeTriggerEventName: "close",
});

// Without closeEventName (direct)
const { isVisible, closeUI } = useVisibility({
  defaultVisible: false,
  closeKey: "Escape",
  openEventName: "showUI",
  closeTriggerEventName: "close",
});
```

**useNuiQuery**

A data fetching hook for NUI that provides loading, error, and success states. Ideal for fetching data from the server/client when the UI opens. Returns `{ data, isLoading, error, refetch }`.

```tsx
import { useNuiQuery } from "@bluearc/frui";

const { data, isLoading, error, refetch } = useNuiQuery("getData");
```

### Mock Function

**MockRegisterNUICallback**

Mock the game's NUI callback registration for development/testing. Simulates how `RegisterNUICallback` works on the Lua side so you can test NUI interactions without running FiveM.

```tsx
import { MockRegisterNUICallback } from "@bluearc/frui";

MockRegisterNUICallback("ping", (data) => {
  console.log(data?.message);
});
```

**MockSendNUIMessage**

Mock sending messages from the game to NUI for development/testing. Simulates `SendNUIMessage` calls from Lua so you can test event listeners without running FiveM.

```tsx
import { MockSendNUIMessage } from "@bluearc/frui";

MockSendNUIMessage({
  action: "sendData",
  message: "hello, world",
});
```
