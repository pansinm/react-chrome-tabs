# React Chrome Tabs

![](./react-chrome-tabs.gif)

[codesandbox]()

## Installation

> yarn add @sinm/react-chrome-tabs
## Usage

```tsx
import { Tabs, TabProperties } from "@sinm/react-chrome-tabs";
import '@sinm/react-chrome-tabs/css/chrome-tabs.css';

const [tabs, setTabs] = useState<TabProperties[]>([
  { id: "abc", favicon: fb, title: "测试", active: true },
]);

<Tabs
  draggable
  onTabClose={close}
  onTabReorder={reorder}
  onTabActive={active}
  onDragBegin={() => console.log('Drag started')}
  onDragEnd={() => console.log('Drag ended')}
  tabs={tabs}
/>
```

## Example

```tsx
import React, { useEffect } from "react";
import { useState } from "react";
import { Tabs, TabProperties } from "@sinm/react-chrome-tabs";
import '@sinm/react-chrome-tabs/css/chrome-tabs.css';
// for dark mode
import '@sinm/react-chrome-tabs/css/chrome-tabs-dark-theme.css';

import fb from "./images/facebook-favicon.ico";
import google from "./images/google-favicon.ico";

let id = 1;

function App() {
  const [tabs, setTabs] = useState<TabProperties[]>([
    { id: "abc", favicon: fb, title: "测试", active: true },
  ]);
  
  const [draggable, setDraggable] = useState(true);

  const addTab = () => {
    id++;
    setTabs([
      ...tabs,
      {
        id: `tab-id-${id}`,
        title: `New Tabs ${id}`,
        favicon: tabs.length % 2 ? fb : google,
      },
    ]);
  };

  const active = (id: string) => {
    setTabs(tabs.map((tab) => ({ ...tab, active: id === tab.id })));
  };

  const close = (id: string) => {
    setTabs(tabs.filter((tab) => tab.id !== id));
  };

  const reorder = (tabId: string, fromIndex: number, toIndex: number) => {
    const beforeTab = tabs.find(tab => tab.id === tabId);
    if (!beforeTab) {
        return;
    }
    let newTabs = tabs.filter(tab => tab.id !== tabId);
    newTabs.splice(toIndex, 0, beforeTab);
    setTabs(newTabs);
  };
  const closeAll = () => setTabs([]);
  return (
    <div>
      <Tabs
        darkMode={false}
        onTabClose={close}
        draggable={draggable}
        onTabReorder={reorder}
        onTabActive={active}
        tabs={tabs}
        pinnedRight={<button onClick={addTabWithIcon}>+</button>}
      ></Tabs>
      <button onClick={addTab}>Add Tab</button>
      <button onClick={closeAll}>Close All</button>
    </div>
  );
}
```

More Examples see

- [Demo Code](./demo/index.tsx)
- [ONote Tabs](https://github.com/pansinm/ONote/blob/master/packages/renderer/src/main/containers/ResourceTabs/index.tsx)


## Component Props

| name          | type          | description                                                            |
| ------------- | ------------- | ---------------------------------------------------------------------- |
| darkMode      | boolean       | Enables or disables dark mode.                                         |
| className     | string        | Custom class name for the tabs container.                              |
| tabs          | TabProperties | Array of tab data to be rendered.                                      |
| draggable     | boolean       | Determines whether tabs can be dragged for reordering，default true.   |  |
| onTabActive   | Function      | Callback function triggered when a tab becomes active.                 |
| onTabClose    | Function      | Callback function triggered when a tab is closed.                      |
| onTabReorder  | Function      | Callback function triggered when tabs are reordered via drag-and-drop. |
| onContextMenu | Function      | Callback function triggered when the context menu event is invoked.    |
| onDragBegin   | Function      | Callback function triggered when tab dragging starts. No parameters.   |
| onDragEnd     | Function      | Callback function triggered when tab dragging ends. No parameters.      |

## TabProperties
```ts
export interface TabProperties {
  id: string;
  title: string;
  active?: boolean;
  // favicon background image
  favicon?: boolean | string;
  // favicon class
  faviconClass?: string;
  // default true
  isCloseIconVisible?: boolean;
}
```

## Run Demo
```bash
git clone https://github.com/pansinm/react-chrome-tabs.git
cd react-chrome-tabs
yarn start
# visit http://localhost:8080/
```
