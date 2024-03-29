import { DndContext, DragOverlay, KeyboardSensor, PointerSensor, defaultDropAnimationSideEffects, useSensor, useSensors } from '@dnd-kit/core'
import { restrictToVerticalAxis, restrictToWindowEdges } from '@dnd-kit/modifiers'
import { SortableContext, arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable'
import React, { useMemo, useState } from 'react'

function SortableOverlay({ children }) {
  const dropAnimationConfig = { sideEffects: defaultDropAnimationSideEffects({ styles: { active: { opacity: '0.2' } } }) }

  return <DragOverlay dropAnimation={dropAnimationConfig}>{children}</DragOverlay>
}

export default function SortableList({ items, onChange, renderItem }) {
  const [active, setActive] = useState(null),
    activeItem = useMemo(() => items.find((item) => item.id === active?.id), [active, items]),
    sensors = useSensors(useSensor(PointerSensor), useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }))

  return (
    <DndContext
      id="dnd"
      modifiers={[restrictToVerticalAxis, restrictToWindowEdges]}
      sensors={sensors}
      onDragStart={({ active }) => setActive(active)}
      onDragEnd={({ active, over }) => {
        over &&
          active.id != over?.id &&
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
        {items.map((item) => (
          <React.Fragment key={item.id}>
            {renderItem(
              item,
              items.findIndex((i) => i.id == item.id),
            )}
          </React.Fragment>
        ))}
      </SortableContext>
      <SortableOverlay>
        {activeItem
          ? renderItem(
              activeItem,
              items.findIndex((item) => item.id == activeItem.id),
            )
          : null}
      </SortableOverlay>
    </DndContext>
  )
}

SortableList.overlay = SortableOverlay
