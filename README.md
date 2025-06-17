# React Chrome Tabs

![](./react-chrome-tabs.gif)

[codesandbox]()

A React component that mimics Chrome browser tabs with:

- Smooth drag-and-drop reordering
- Customizable favicons (image or CSS class)
- Dark mode support
- Responsive layout with dynamic tab sizing
- Custom toolbar integration

## Installation

```bash
yarn add @sinm/react-chrome-tabs
```

Required peer dependencies:
- react@^16.8.0
- react-dom@^16.8.0
- draggabilly@^3.0.0
## Usage

Basic setup:

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

## Examples

### Basic Usage

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

| Prop          | Type          | Description                                                                 | Default |
| ------------- | ------------- | --------------------------------------------------------------------------- | ------- |
| darkMode      | boolean       | Toggle dark mode theme                                                     | false   |
| className     | string        | Additional CSS class for the container                                      | -       |
| tabs          | TabProperties[] | Array of tab objects (required)                                           | -       |
| draggable     | boolean       | Enable/disable drag-and-drop reordering                                    | true    |
| onTabActive   | (id: string) => void | Called when a tab is activated                                         | -       |
| onTabClose    | (id: string) => void | Called when a tab is closed                                            | -       |
| onTabReorder  | (id: string, from: number, to: number) => void | Called after tab reorder completes                              | -       |
| onContextMenu | (event: React.MouseEvent) => void | Called on right-click                                              | -       |
| onDragBegin   | (id: string) => void | Called when drag starts                                                | -       |
| onDragEnd     | (id: string) => void | Called when drag ends                                                  | -       |
| pinnedRight   | React.ReactNode | Custom content to display on the right side of the tab bar              | -       |

## TabProperties

```ts
interface TabProperties {
  id: string;                   // Unique identifier (required)
  title: string;                // Tab display text (required)
  active?: boolean;             // Whether tab is active
  favicon?: boolean | string;   // Favicon image URL or visibility flag
  faviconClass?: string;        // CSS class for custom favicon styling
  isCloseIconVisible?: boolean; // Show/hide close button
}
```

### Favicon Examples:

```ts
// Image favicon
{ id: 'tab1', title: 'Google', favicon: 'https://google.com/favicon.ico' }

// CSS class favicon
{ id: 'tab2', title: 'Emoji', faviconClass: 'emoji-icon' }

// Hidden close button
{ id: 'tab3', title: 'Pinned', isCloseIconVisible: false }
```

## Development

```bash
# Install dependencies
yarn

# Start dev server
yarn start
# Open http://localhost:8080/

# Build for production
yarn build
```

### Custom Styling

Override these CSS classes for custom styling:

- `.chrome-tabs` - Main container
- `.chrome-tab` - Individual tab
- `.chrome-tab-active` - Active tab state
- `.chrome-tab-favicon` - Favicon container
- `.chrome-tab-title` - Title text
- `.chrome-tab-close` - Close button

Import `chrome-tabs-dark-theme.css` for dark mode support.
