import React, { useState } from 'react'
import { ChevronsUpDown, SquareMousePointer, Plus } from 'lucide-react'

import { cn } from '@/lib/utils'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import SortableItem from '../sortable/SortableItem'

import FieldTypeInput from '../inputs/fieldType'
import LabelInput from '../inputs/label'
import Variable from '../inputs/variables'
import DropdownInput from '../inputs/dropdown'
import FieldKeyInput from '../inputs/fieldKey'

function Block({ className, childrenClassName, children, ...props }) {
  return (
    <div
      className={cn(
        'flex flex-row h-min justify-center items-strech p-2 pl-0 w-full border transition ease-in-out duration-1000 [&.active]:border-[#864FBC] rounded-xl my-2 first:mt-0 last:mb-0 relative',
        'bg-black/5 backdrop-blur-sm',
        className,
      )}
      {...props}>
      <SortableItem.DragHandle className="grid place-items-center w-14 cursor-move touch-none hover:bg-white/20 rounded-xl mx-1 transition duration-500">
        <ChevronsUpDown color="#ffffff" size="20px" />
      </SortableItem.DragHandle>

      <div className={cn('flex flex-col items-start justify-start gap-3 w-full', childrenClassName)}>{children}</div>
    </div>
  )
}

function Group({ className, name, Key: key, select, ...props }) {
  const [group, setGroup] = useState(name)

  return (
    <Block
      className={cn(
        'flex flex-row p-2 pl-0 justify-start items-strech w-full border transition ease-in-out duration-1000 [&.active]:border-[#864FBC] rounded-xl my-2 first:mt-0 last:mb-0',
        className,
      )}
      childrenClassName="flex-row"
      {...props}>
      <Input
        type="text"
        placeholder="Group title"
        onChange={(e) => {
          setGroup(e.target.value)
        }}
        value={group}
        disabled={name == 'ungrouped'}
      />
      <Button className="bg-transparent hover:bg-transparent" size={'icon'} onClick={() => select(key, name)}>
        <SquareMousePointer size={20} color="white"></SquareMousePointer>
      </Button>
    </Block>
  )
}

function Field({ className, label, value, index, onChange, ...props }) {
  const [type, setType] = useState(props.type)

  return (
    <Block className={cn('hover:border hover:border-[#864FBC]', className)} {...props}>
      <FieldKeyInput index={index} key={props.Key} onChange={onChange} />

      <FieldTypeInput index={index} onChange={onChange} type={type} setType={setType} />

      <LabelInput index={index} onChange={onChange} label={label} />

      <Variable index={index} onChange={onChange} type={type} value={value} />

      {type == 'dropdown' && <DropdownInput />}
    </Block>
  )
}

export { Group, Block, Field }
