# Frui

## Introduction

React utilities for developing FiveM NUI with React + TypeScript.

## Installation

```bash
npm i @bluearc/frui
```

## Example

```tsx
import { useState } from "react";
import { useNuiEvent, fetchNui, useKeyBind } from "@bluearc/frui";

export default function App() {
  const [visible, setVisible] = useState(false);

  useNuiEvent<{ visible: boolean }>("setVisible", (data) => {
    setVisible(data.visible);
  });

  useKeyBind("Escape", () => {
    fetchNui("close");
  });

  if (!visible) return null;

  return <div>UI</div>;
}
```

## Utilities

### Function

**fetchNui**

```tsx
import { fetchNui } from "@bluearc/frui";

await fetchNui("ping", {
  message: "pong",
});
```

**useNuiEvent**

```tsx
import { useNuiEvent } from "@bluearc/frui";

useNuiEvent("sendData", (data) => {
  console.log(data);
});
```

**useKeyBind**

```tsx
import { useKeyBind } from "@bluearc/frui";

useKeyBind("Enter", () => {
  fetchNui("ping");
});
```

**useVisibility**

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

```tsx
import { useNuiQuery } from "@bluearc/frui";

const { data, isLoading, error, refetch } = useNuiQuery("getData");
```

### Mock Function

**MockRegisterNUICallback**

```tsx
import { MockRegisterNUICallback } from "@bluearc/frui";

MockRegisterNUICallback("ping", (data) => {
  console.log(data?.message);
});
```

**MockSendNUIMessage**

```tsx
import { MockSendNUIMessage } from "@bluearc/frui";

MockSendNUIMessage({
  action: "sendData",
  message: "hello, world",
});
```
