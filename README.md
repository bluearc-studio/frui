# Frui

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
