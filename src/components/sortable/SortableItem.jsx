import { cn } from '@/lib/utils'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

const { createContext, useMemo, useContext } = require('react')

const SortableItemContext = createContext({ attributes: {}, listeners: undefined, ref() {} })

function DragHandle({ className, children, ...props }) {
  const { attributes, listeners, ref } = useContext(SortableItemContext)

  return (
    <div className={cn('', className)} {...attributes} {...listeners} ref={ref} {...props}>
      {children}
    </div>
  )
}

export default function SortableItem({ className, children, id, ...props }) {
  const { attributes, isDragging, listeners, setNodeRef, setActivatorNodeRef, transform, transition } = useSortable({ id }),
    context = useMemo(() => ({ attributes, listeners, ref: setActivatorNodeRef }), [attributes, listeners, setActivatorNodeRef]),
    style = { opacity: isDragging ? 0.2 : undefined, transform: CSS.Translate.toString(transform), transition }

  return (
    <SortableItemContext.Provider value={context}>
      <div ref={setNodeRef} style={style} className={cn('', className)} {...props}>
        {children}
      </div>
    </SortableItemContext.Provider>
  )
}

SortableItem.DragHandle = DragHandle
