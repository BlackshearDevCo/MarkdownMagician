"use client";

import React from "react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { Editor } from "./Editor";

export function EditorLayout() {
  return (
    <PanelGroup direction="horizontal" className="h-full w-full">
      <Panel defaultSize={50} minSize={30} className="h-full p-4 bg-background">
        <Editor />
      </Panel>

      <PanelResizeHandle className="w-[2px] bg-gray-300 cursor-col-resize" />

      <Panel defaultSize={50} minSize={10} className="h-full p-4 bg-background">
        Live Preview
      </Panel>
    </PanelGroup>
  );
}
