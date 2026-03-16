# Frui

## Introduction

React utilities for developing FiveM NUI with React + TypeScript.

## Installation

```bash
npm i @bluearc/frui
```

```bash
bun add @bluearc/frui
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

### fetchNui

```tsx
import { fetchNui } from "@bluearc/frui";

await fetchNui("ping", {
  message: "pong",
});
```

### useNuiEvent

```tsx
import { useNuiEvent } from "@bluearc/frui";

useNuiEvent("sendData", (data) => {
  console.log(data);
});
```

### useKeyBind

```tsx
import { useKeyBind } from "@bluearc/frui";

useKeyBind("Enter", () => {
  fetchNui("ping");
});
```

### MockRegisterNUICallback

```tsx
import { MockRegisterNUICallback } from "@bluearc/frui";

MockRegisterNUICallback("ping", (data) => {
  console.log(data?.message);
});
```

### MockSendNUIMessage

```tsx
import { MockSendNUIMessage } from "@bluearc/frui";

MockSendNUIMessage({
  action: "sendData",
  message: "hello, world",
});
```
