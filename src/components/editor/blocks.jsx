import { Input } from '@/components/ui/input'
import { ChevronsUpDown } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

import { cn } from '@/lib/utils'
import InputWithLabel from '@/components/ui/input with label'
import SortableItem from '../sortable/SortableItem'

function Block({ className, children, ...props }) {
  return (
    <div
      className={cn(
        'flex flex-row h-min justify-center items-strech p-2 pl-0 w-full border transition ease-in-out duration-1000 [&.active]:border-[#864FBC] rounded-xl my-2 first:mt-0 last:mb-0 relative',
        className,
      )}
      {...props}>
      <SortableItem.DragHandle className="grid place-items-center w-14 cursor-move touch-none hover:bg-slate-400/20 rounded-xl mx-1 transition duration-500">
        <ChevronsUpDown color="#ffffff" size="20px" />
      </SortableItem.DragHandle>

      <div className="flex flex-col items-start justify-start gap-3 w-full">{children}</div>
    </div>
  )
}

function Group({ className, name, ...props }) {
  return (
    <Block
      className={cn(
        'flex flex-row p-2 pl-0 justify-start items-strech w-full border transition ease-in-out duration-1000 [&.active]:border-[#864FBC] rounded-xl my-2 first:mt-0 last:mb-0',
        className,
      )}
      {...props}>
      <Input type="text" placeholder="Group title" defaultValue={name} />
    </Block>
  )
}

let availableFieldTypes = [
  'text',
  'hidden',
  'button',
  'number',
  'slider',
  'dropdown',
  'checkbox',
  'googleFont',
  'colorpicker',
  'audio-input',
  'sound-input',
  'video-input',
]

function Field({ className, children, Key, type, label, value, index, onChange, ...props }) {
  return (
    <Block className={className} {...props}>
      <Input
        className="px-3 ring-0 h-5 bg-black border-0 text-center"
        type="text"
        placeholder="[object name]"
        value={Key}
        onChange={(e) => onChange(e, index)}
        id="key"
      />

      <InputWithLabel label="Field type">
        <Select value={type} id="type" onValueChange={(value) => onChange({ target: { value, id: 'type' } }, index)}>
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
        <Input type="text" placeholder="Field label" value={label} id="label" onChange={(e) => onChange(e, index)} />
      </InputWithLabel>

      <InputWithLabel label="Value" htmlFor="value">
        <Input type="text" placeholder="Field value" value={value} id="value" onChange={(e) => onChange(e, index)} />
      </InputWithLabel>

      {/* {type == 'dropdown' && <div></div>} */}
    </Block>
  )
}

export { Group, Block, Field }
