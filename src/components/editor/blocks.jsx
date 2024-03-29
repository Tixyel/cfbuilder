import React, { useState } from 'react'
import { ChevronsUpDown, SquareMousePointer, Trash2 } from 'lucide-react'

import { cn } from '@/lib/utils'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import SortableItem from '@/components/sortable/SortableItem'

import FieldTypeInput from '@/components/inputs/fieldType'
import LabelInput from '@/components/inputs/label'
import Variable from '@/components/inputs/variables'
import DropdownInput from '@/components/inputs/dropdown'
import FieldKeyInput from '@/components/inputs/fieldKey'
import { noGroup } from '@/lib/group'

function Block({ className, type = 'group', index, remove, childrenClassName, children, ...props }) {
  return (
    <div
      className={cn(
        'flex flex-row h-min justify-center items-strech p-2 pl-0 w-full border transition ease-in-out duration-1000 [&.active]:border-[#864FBC] rounded-xl my-2 first:mt-0 last:mb-0 relative',
        'bg-black/5 backdrop-blur-sm',
        className,
      )}
      {...props}>
      <div className="flex flex-col justify-start items-stretch self-stretch w-2/12 mx-1 gap-2">
        {type != 'group' && (
          <div className="grid place-items-center cursor-pointer" onClick={() => remove(index)}>
            <Trash2 className="hover:stroke-red-500 transition" color="#ffffff" size={20} />
          </div>
        )}
        <SortableItem.DragHandle className="grid flex-1 place-items-center w-full cursor-move touch-none hover:bg-white/20 rounded-xl transition duration-500">
          <ChevronsUpDown color="#ffffff" size="20px" />
        </SortableItem.DragHandle>
      </div>

      <div className={cn('flex flex-col items-start justify-start gap-3 w-full', childrenClassName)}>{children}</div>
    </div>
  )
}

function Group({ className, index, name, groupKey, onChange, select, ...props }) {
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
          onChange(e)
        }}
        value={group}
        disabled={name == noGroup}
      />
      <Button className="bg-transparent hover:bg-transparent" size={'icon'} onClick={() => select(groupKey, name)}>
        <SquareMousePointer size={20} color="white"></SquareMousePointer>
      </Button>
    </Block>
  )
}

function Field({ fields, className, label, value, index, remove, fieldKey, fieldKeyId, onChange, ...props }) {
  const [type, setType] = useState(props.type)

  return (
    <Block className={cn('hover:border hover:border-[#864FBC]', className)} remove={remove} index={index} {...props}>
      <FieldKeyInput
        className={cn(
          fields.some((item) => item.key == fieldKey && item.id != fieldKeyId) && 'invalid',
          '[&.invalid]:border-red-500 [&.invalid]:border',
        )}
        index={index}
        value={fieldKey}
        onChange={onChange}
      />

      <FieldTypeInput index={index} onChange={onChange} setType={setType} value={type} />

      <LabelInput index={index} onChange={onChange} value={label} />

      <Variable index={index} onChange={onChange} type={type} value={value} />

      {type == 'dropdown' && <DropdownInput index={index} {...props} />}
    </Block>
  )
}

export { Group, Block, Field }
