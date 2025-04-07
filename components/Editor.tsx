"use client";

import {
  closestCenter,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Heading1 } from "lucide-react";
import React, { useState } from "react";
import { Button } from "./ui/Button";
import { cn } from "@/lib/utils";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";

export function Editor() {
  const [items, setItems] = useState([1, 2, 3]);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      modifiers={[restrictToVerticalAxis]}
    >
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        <ul className="flex flex-col gap-2 p-6">
          {items.map((id) => (
            <SortableItem key={id} id={id} />
          ))}
        </ul>
      </SortableContext>
    </DndContext>
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setItems((items) => {
        const oldIndex = items.indexOf(parseInt(active.id as string));
        const newIndex = items.indexOf(parseInt(over?.id as string));

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }
}

function SortableItem(props: { id: number }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    setActivatorNodeRef,
    active,
  } = useSortable({ id: props.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <li
      ref={setNodeRef}
      className={cn(
        "flex gap-2 items-center bg-background border border-border w-full p-3 rounded-md cursor-grab hover:bg-accent z-1",
        active?.id === props.id && "z-50"
      )}
      style={style}
      {...attributes}
    >
      <div className="rounded-md bg-secondary p-1.5">
        {<Heading1 className="h-4 w-4" />}
      </div>
      <p className="font-medium flex-1">Heading {props.id}</p>

      <Button
        ref={setActivatorNodeRef}
        {...listeners}
        variant="ghost"
        size="icon"
      >
        <GripVertical className="h-4 w-4" />
      </Button>
    </li>
  );
}
