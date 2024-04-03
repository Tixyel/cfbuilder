import React, { useState } from 'react'
import { ChevronsUpDown, Settings, SquareMousePointer, Trash2 } from 'lucide-react'

import { cn, validFieldToJSON } from '@/lib/utils'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import SortableItem from '@/components/sortable/SortableItem'

import FieldTypeInput from '@/components/inputs/fieldType'
import LabelInput from '@/components/inputs/label'
import Variable from '@/components/inputs/variables'
import DropdownInput from '@/components/inputs/dropdown'
import FieldKeyInput from '@/components/inputs/fieldKey'
import { noGroup } from '@/lib/placeholders'

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import InputWithLabel from '../ui/input with label'
import { GroupType } from './addField'

function Block({ className, index, remove, childrenClassName, children, ...props }) {
  return (
    <div
      className={cn(
        'flex flex-row h-min justify-center items-strech p-2 pl-0 w-full border transition ease-in-out duration-1000 [&.active]:border-purple rounded-xl my-2 first:mt-0 last:mb-0 relative',
        'bg-black/5 backdrop-blur-sm',
        className,
      )}
      {...props}>
      <div className="flex flex-col justify-start items-stretch self-stretch w-2/12 mx-1 gap-2">
        <SortableItem.DragHandle className="grid flex-1 place-items-center w-full cursor-move touch-none hover:bg-white/20 rounded-xl transition duration-500">
          <ChevronsUpDown color="#ffffff" size="20px" />
        </SortableItem.DragHandle>
      </div>

      <div className={cn('flex flex-col items-start justify-start gap-3 w-full', childrenClassName)}>{children}</div>
    </div>
  )
}

function Group({ className, index, name, groupKey, onChange, select, ...props }) {
  const [group, setGroup] = useState(name),
    [valid, setValid] = useState(true),
    [interval, setIntervalId] = useState(null)

  return (
    <Block
      className={cn(
        'flex flex-row p-2 pl-0 justify-start items-strech w-full border transition ease-in-out duration-1000 [&.active]:border-purple rounded-xl my-2 first:mt-0 last:mb-0',
        className,
        valid == false && 'invalid animate-invalid',
      )}
      childrenClassName="flex-row"
      {...props}>
      <Input
        type="text"
        placeholder="Group title"
        onChange={(e) => {
          let valid = onChange(e.target.value, groupKey)

          if (valid) {
            setValid(true)
            setGroup(e.target.value)
          } else {
            clearInterval(interval)

            setValid(false)

            setIntervalId(setInterval(() => setValid(true), 1000))
          }
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

function Field({ className, index, global, fields = {}, field, onChange, onRemove, ...props }) {
  const [type, setType] = useState(field.type)

  return (
    <Block className={cn('hover:border hover:border-purple', className)} remove={onRemove} index={index} {...props}>
      <div className="flex w-full gap-2">
        <FieldKeyInput
          className={cn(
            Object.values(fields).some((item) => item.key == field.key && item.id != field.id) && 'invalid',
            '[&.invalid]:animate-invalid',
          )}
          index={index}
          value={field.key}
          onChange={(e) => onChange(index, e.target.value, 'key')}
        />
        <Popover>
          <PopoverTrigger asChild>
            <div className="grid place-items-center cursor-pointer">
              <Settings className="hover:stroke-slate-200 transition" color="#fff" size={20} />
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="grid gap-4">
              <div className="space-y-2">
                <h4 className="font-medium leading-none">Settings</h4>
                <p className="text-sm text-muted-foreground">Manage the field here.</p>
              </div>
              <div className="flex flex-col gap-2 w-full">
                <GroupType
                  className="flex flex-row w-full justify-between whitespace-nowrap gap-4"
                  groups={global.groups}
                  type={global.getGroupByName(field?.group?.name || field?.group || noGroup)}
                  onChange={(e) => global.moveField(field.id, e.name)}></GroupType>
                <InputWithLabel className="flex flex-row w-full justify-between whitespace-nowrap gap-4" label="Delete this field">
                  <Button variant="outline" className="group px-10" onClick={() => global.removeField(field.id)}>
                    <Trash2 className="group-hover:stroke-red-500 transition" color="#ffffff" size={20} />
                  </Button>
                </InputWithLabel>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      <FieldTypeInput index={index} onChange={(e) => onChange(index, e.target.value, 'type')} setType={setType} value={type} />

      <LabelInput index={index} onChange={(e) => onChange(index, e.target.value, 'label')} value={field.label} />

      <Variable
        index={index}
        onChange={(e) => onChange(index, e.target.value, 'value')}
        type={type}
        value={field.value}
        options={field.options}
        field={field}
      />

      {type == 'dropdown' && (
        <DropdownInput
          index={index}
          options={field.options}
          onChange={(result) => {
            onChange(
              index,
              Object.values(result).reduce((acc, { key, value }) => {
                acc[key] = value

                return acc
              }, {}),
              'options',
            )
          }}
        />
      )}
    </Block>
  )
}

export { Group, Block, Field }
