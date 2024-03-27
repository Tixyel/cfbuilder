'use client'

import { DndContext, DragOverlay, KeyboardSensor, PointerSensor, defaultDropAnimationSideEffects, useSensor, useSensors } from '@dnd-kit/core'
import { SortableContext, arrayMove, sortableKeyboardCoordinates, useSortable } from '@dnd-kit/sortable'
import React, { createContext, useContext, useMemo, useState } from 'react'
import { CSS } from '@dnd-kit/utilities'
import { ChevronsUpDown } from 'lucide-react'
import { restrictToVerticalAxis, restrictToWindowEdges } from '@dnd-kit/modifiers'
import { ScrollArea } from '@/components/ui/scroll-area'

function getMockItems() {
  return [...new Array(50)].map((_, index) => ({ id: index + 1 }))
}

function SortableOverlay({ children }) {
  const dropAnimationConfig = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: {
        active: {
          opacity: '0.4',
        },
      },
    }),
  }

  return <DragOverlay dropAnimation={dropAnimationConfig}>{children}</DragOverlay>
}

function SortableList({ items, onChange, renderItem }) {
  const [active, setActive] = useState(null),
    activeItem = useMemo(() => items.find((item) => item.id === active?.id), [active, items]),
    sensors = useSensors(useSensor(PointerSensor), useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }))

  return (
    <DndContext
      modifiers={[restrictToVerticalAxis, restrictToWindowEdges]}
      sensors={sensors}
      onDragStart={({ active }) => setActive(active)}
      onDragEnd={({ active, over }) => {
        if (over && active.id != over?.id)
          onChange(
            arrayMove(
              items,
              items.findIndex(({ id }) => id == active.id),
              items.findIndex(({ id }) => id == over.id),
            ),
          )

        setActive(null)
      }}
      onDragCancel={() => setActive(null)}>
      <SortableContext items={items}>
        <div className="flex flex-col gap-[10px] p-0 list-none">
          {items.map(({ id }) => (
            <React.Fragment key={id}>{renderItem({ id })}</React.Fragment>
          ))}
        </div>
      </SortableContext>
      <SortableOverlay>{activeItem ? renderItem(activeItem) : null}</SortableOverlay>
    </DndContext>
  )
}

const SortableItemContext = createContext({ attributes: {}, listeners: undefined, ref() {} })

function SortableItem({ children, id }) {
  const { attributes, isDragging, listeners, setNodeRef, setActivatorNodeRef, transform, transition } = useSortable({ id }),
    context = useMemo(() => ({ attributes, listeners, ref: setActivatorNodeRef }), [attributes, listeners, setActivatorNodeRef]),
    style = { opacity: isDragging ? 0.4 : undefined, transform: CSS.Translate.toString(transform), transition }

  return (
    <SortableItemContext.Provider value={context}>
      <div
        ref={setNodeRef}
        style={style}
        className="flex justify-between grow items-center px-[20px] py-[18px] bg-white shadow-sm rounded box-border list-none text-black bold text-sm">
        {children}
      </div>
    </SortableItemContext.Provider>
  )
}

function DragHandle() {
  const { attributes, listeners, ref } = useContext(SortableItemContext)

  return (
    <div
      className="flex items-center justify-center size-[30px] touch-none cursor-pointer hover:bg-slate-900/20 rounded transition-all duration-500"
      {...attributes}
      {...listeners}
      ref={ref}>
      <ChevronsUpDown color="#000" size="15px" />
    </div>
  )
}

export default function Page() {
  const [items, setItems] = useState(getMockItems)

  return (
    <main className="min-h-screen h-screen max-h-screen bg-slate-950 flex flex-row justify-center gap-6 items-start px-24 py-20 overflow-hidden">
      <ScrollArea className="w-[300px] h-full pr-3">
        <SortableList
          items={items}
          onChange={setItems}
          renderItem={(item) => {
            return (
              <SortableItem id={item.id}>
                <p className="flex-1">{item.id}</p>
                <DragHandle />
              </SortableItem>
            )
          }}
        />
      </ScrollArea>
    </main>
  )
}
