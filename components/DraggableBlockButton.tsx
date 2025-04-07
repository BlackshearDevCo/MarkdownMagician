import { DraggableBlockTypes } from "@/types";
import { useDraggable } from "@dnd-kit/core";
import React from "react";

interface Props {
  icon: React.ReactNode;
  text: string;
  type: DraggableBlockTypes;
}

export function DraggableBlockButton({ icon, text, type }: Props) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: `draggable-block-${type}`,
    data: { type },
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <li
      ref={setNodeRef}
      className="flex gap-2 items-center bg-background border border-border w-full p-3 rounded-md cursor-grab transition-all duration-100 hover:bg-accent"
      style={style}
      {...listeners}
      {...attributes}
    >
      <div className="rounded-md bg-secondary p-1.5">{icon}</div>
      <p className="font-medium">{text}</p>
    </li>
  );
}
