import { Input } from '@/components/ui/input'
import { ChevronsUpDown } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

import { cn } from '@/lib/utils'
import InputWithLabel from '@/components/ui/input with label'

function Group({ className, name, ...props }) {
  return (
    <div
      className={cn(
        'flex flex-row p-2 pl-0 justify-start items-strech w-full border transition ease-in-out duration-1000 [&.active]:border-[#864FBC] rounded-xl my-2 first:mt-0 last:mb-0',
        className,
      )}
      {...props}>
      <div className="grid place-items-center w-14 cursor-move hover:bg-slate-400/20 rounded-xl mx-1 transition-all duration-500">
        <ChevronsUpDown color="#ffffff" size="20px" />
      </div>

      <div className="flex flex-col items-start justify-start gap-3 w-full">
        <Input type="text" placeholder="Group title" defaultValue={name} />
      </div>
    </div>
  )
}

function Block({ className, children, ...props }) {
  return (
    <div
      className={cn(
        'flex flex-row h-min justify-center items-strech p-2 pl-0 w-full border transition ease-in-out duration-1000 [&.active]:border-[#864FBC] rounded-xl my-2 first:mt-0 last:mb-0 relative',
        className,
      )}
      {...props}>
      <div className="grid place-items-center w-14 cursor-move hover:bg-slate-400/20 rounded-xl mx-1 transition-all duration-500">
        <ChevronsUpDown color="#ffffff" size="20px" />
      </div>

      <div className="flex flex-col items-start justify-start gap-3 w-full">{children}</div>
    </div>
  )
}

function Field({ className, children, availableFieldTypes, name: key, type, label, value, index, ...props }) {
  return (
    <Block className={cn(index == 0 ? 'active' : '')} {...props}>
      <Input className="px-3 ring-0 h-5 bg-black border-0 text-center" type="text" placeholder="[object name]" defaultValue={key} />
      <InputWithLabel label="Field type">
        <Select defaultValue={type}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select" />
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
        <Input type="text" placeholder="Field label" defaultValue={label} id="label" />
      </InputWithLabel>

      <InputWithLabel label="Value" htmlFor="value">
        <Input type="text" placeholder="Field value" defaultValue={value} id="value" />
      </InputWithLabel>
    </Block>
  )
}

export { Group, Block, Field }
