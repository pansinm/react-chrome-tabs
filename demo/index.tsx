import React, { useEffect } from "react";
import { useState } from "react";
import { render } from "react-dom";
import { Tabs } from "../src";
import { TabProperties } from "../src/chrome-tabs";
import "../css/chrome-tabs.css";
import "../css/chrome-tabs-dark-theme.css";
import "./css/demo.css";

import fb from "./images/facebook-favicon.ico";
import google from "./images/google-favicon.ico";

let id = 0;
function App() {
  const [tabs, setTabs] = useState<TabProperties[]>([
    { id: "abc", favicon: fb, title: "测试", active: true },
  ]);
  const [draggable, setDraggable] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const addTabWithIcon = () => {
    id++;
    setTabs([
      ...tabs.map((i) => ({ ...i, active: false })),
      {
        id: `tab-id-${id}`,
        title: `New Tabs ${id}`,
        favicon: tabs.length % 2 ? fb : google,
        active: true,
      },
    ]);
  };

  const addTabWithIconClass = () => {
    id++;
    setTabs([
      ...tabs.map((i) => ({ ...i, active: false })),
      {
        id: `tab-id-${id}`,
        title: `New Tabs ${id}`,
        faviconClass: " emoji",
        active: true,
      },
    ]);
  };

  const addTabWithoutClose = () => {
    id++;
    setTabs([
      ...tabs.map((i) => ({ ...i, active: false })),
      {
        id: `tab-id-${id}`,
        title: `New Tabs ${id}`,
        faviconClass: " emoji",
        isCloseIconVisible: false,
        active: true,
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
    const beforeTab = tabs.find((tab) => tab.id === tabId);
    if (!beforeTab) {
      return;
    }
    let newTabs = tabs.filter((tab) => tab.id !== tabId);
    newTabs.splice(toIndex, 0, beforeTab);
    setTabs(newTabs);
  };

  const closeAll = () => setTabs([]);

  const toggleDarkMode = () => {
    setDarkMode((darkMode) => !darkMode);
  };

  const handleDragBegin = (tabId: string) => {
    console.log("drag begin", tabId);
  };

  const handleDragEnd = (tabId: string) => {
    console.log("drag end", tabId);
  };

  return (
    <div>
      <Tabs
        darkMode={darkMode}
        draggable={draggable}
        onDragBegin={handleDragBegin}
        onDragEnd={handleDragEnd}
        onTabClose={close}
        onTabReorder={reorder}
        onTabActive={active}
        tabs={tabs}
        pinnedRight={<button onClick={addTabWithIcon}>+</button>}
      ></Tabs>
      <button onClick={addTabWithIcon}>Add Tab with icon</button>
      <button onClick={addTabWithIconClass}>Add Tab with iconClass</button>
      <button onClick={addTabWithoutClose}>Add Tab without close icon</button>
      <button onClick={closeAll}>Close All</button>
      <button onClick={toggleDarkMode}>Dark Mode</button>
      <label> Draggable </label>
      <input
        type="checkbox"
        checked={draggable}
        onChange={(e) => setDraggable(e.target.checked)}
      />
    </div>
  );
}

render(<App />, document.getElementById("root"));
