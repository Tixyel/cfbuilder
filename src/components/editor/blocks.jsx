import React, { useState } from 'react'
import { ChevronsUpDown, SquareMousePointer, Plus } from 'lucide-react'

import { cn } from '@/lib/utils'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import InputWithLabel from '@/components/ui/input with label'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import SortableItem from '../sortable/SortableItem'

import { HexColorPicker, HexAlphaColorPicker } from 'react-colorful'
import { Label } from '../ui/label'
import { googleFonts as availableGoogleFonts } from '@/lib/googleFonts'
import { fieldTypes as availableFieldTypes } from '@/lib/fieldTypes'
import GoogleFontInput from '../inputs/googleFont'
import ColorpickerInput from '../inputs/colorpicker'

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

function Field({ className, children, Key, type, label, value, index, onChange, ...props }) {
  const [typo, setTypo] = useState(type)

  const variables = {
    'googleFont': (
      <GoogleFontInput value={value} index={index} id="value" onValueChange={(value) => onChange({ target: { value, id: 'value' } }, index)} />
    ),
    'colorpicker': <ColorpickerInput value={value} index={index} onChange={onChange} />,
  }

  return (
    <Block className={cn('hover:border hover:border-[#864FBC]', className)} {...props}>
      <Input
        spellCheck={false}
        autoComplete="off"
        className="px-3 ring-0 h-5 bg-black/20 border-0 text-center"
        type="text"
        placeholder="[object name]"
        value={Key}
        onChange={(e) => onChange(e, index)}
        id="key"
      />

      <InputWithLabel label="Field type">
        <Select
          value={typo}
          id="type"
          onValueChange={(value) => {
            onChange({ target: { value, id: 'type' } }, index)
            setTypo(value)
          }}>
          <SelectTrigger className="w-full ">
            <SelectValue placeholder="Select field type" />
          </SelectTrigger>
          <SelectContent>
            {availableFieldTypes.map((name) => (
              <SelectItem key={name} value={name}>
                {name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </InputWithLabel>

      <InputWithLabel label="Label" htmlFor="label">
        <Input
          spellCheck={false}
          autoComplete="off"
          type="text"
          placeholder="Field label"
          value={label}
          id="label"
          onChange={(e) => onChange(e, index)}
        />
      </InputWithLabel>

      <InputWithLabel label="Value" htmlFor="value">
        {variables[typo] || (
          <Input
            spellCheck={false}
            autoComplete="off"
            type={['number', 'slider'].some((e) => e == typo) ? typo : 'text'}
            placeholder="Field value"
            value={value}
            id="value"
            onChange={(e) => onChange(e, index)}
          />
        )}
      </InputWithLabel>

      {typo == 'dropdown' && (
        <div className="w-full max-w-sm flex flex-row justify-end items-center gap-1.5">
          <p className="text-zinc-50 text-sm ml-2">Add option</p>
          <div className="grid place-items-center size-10  cursor-pointer">
            <Plus color="#ffffff" size="20px" />
          </div>
        </div>
      )}
    </Block>
  )
}

export { Group, Block, Field }
