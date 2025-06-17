import React, { useCallback, useEffect, useRef, useState } from "react";
import { Listeners, useChromeTabs } from "./hooks/useChromeTabs";
import isEqual from "lodash.isequal";
import { TabProperties } from "./chrome-tabs";
import { useLatest } from "./hooks/useLatest";
import { usePrevious } from "./hooks/usePrevious";
import { usePersistFn } from "./hooks/usePersistFn";

export type TabsProps = Listeners & {
  tabs: TabProperties[];
  className?: string;
  darkMode?: boolean;
  pinnedRight?: React.ReactNode;
  draggable?: boolean;
};

export function Tabs({
  tabs,
  className,
  draggable,
  darkMode,
  onTabActive: onTabActive,
  onTabClose: onTabClose,
  onDragBegin,
  onDragEnd,
  onTabReorder,
  onContextMenu,
  pinnedRight: toolbar,
}: TabsProps) {
  const tabsLatest = useLatest(tabs);
  const previousTabs = usePrevious(tabs);

  const moveIndex = useRef({ tabId: "", fromIndex: -1, toIndex: -1 });

  const handleTabReorder = usePersistFn(
    (tabId: string, fromIndex: number, toIndex: number) => {
      const [dest] = tabsLatest.current.splice(fromIndex, 1);
      tabsLatest.current.splice(toIndex, 0, dest);
      const beforeFromIndex = moveIndex.current.fromIndex;
      moveIndex.current = {
        tabId,
        fromIndex: beforeFromIndex > -1 ? beforeFromIndex : fromIndex,
        toIndex,
      };
    }
  );

  const handleDragEnd = usePersistFn(() => {
    const { tabId, fromIndex, toIndex } = moveIndex.current;
    if (fromIndex > -1) {
      onTabReorder?.(tabId, fromIndex, toIndex);
    }
    moveIndex.current = {
      tabId: "",
      fromIndex: -1,
      toIndex: -1,
    };
    onDragEnd?.();
  });

  const {
    ChromeTabs,
    addTab,
    activeTab,
    removeTab,
    updateTab,
    updateTabByIndex,
  } = useChromeTabs(
    {
      onTabClose: onTabClose,
      onTabActive: onTabActive,
      onContextMenu,
      onDragEnd: handleDragEnd,
      onTabReorder: handleTabReorder,
      onDragBegin,
    },
    { draggable }
  );

  useEffect(() => {
    const beforeTabs = previousTabs || [];
    if (!isEqual(beforeTabs, tabs)) {
      const retainTabs = beforeTabs.slice(tabs.length);
      retainTabs.forEach((tab) => {
        removeTab(tab.id);
      });

      tabs.forEach((tab, index) => {
        updateTabByIndex(index, tab);
      });

      tabs.forEach((tab) => {
        if (tab.active) {
          activeTab(tab.id);
        }
      });
    }
  }, [tabs]);
  return (
    <ChromeTabs className={className} darkMode={darkMode} toolbar={toolbar} />
  );
}
