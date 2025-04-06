"use client";

import React from "react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";

export function EditorLayout() {
  return (
    <PanelGroup direction="horizontal" className="h-full w-full">
      <Panel defaultSize={15} minSize={10} maxSize={20}>
        <div className="h-full p-4 bg-background">Block Palette</div>
      </Panel>

      <PanelResizeHandle className="w-[2px] bg-gray-300 cursor-col-resize" />

      <Panel defaultSize={50} minSize={30}>
        <div className="h-full p-4 bg-background">Markdown Editor</div>
      </Panel>

      <PanelResizeHandle className="w-[2px] bg-gray-300 cursor-col-resize" />

      <Panel defaultSize={35} minSize={10} maxSize={60}>
        <div className="h-full p-4 bg-background">Live Preview</div>
      </Panel>
    </PanelGroup>
  );
}
