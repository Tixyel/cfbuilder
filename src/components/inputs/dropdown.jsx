import { Check, ChevronsUpDown, Plus, Trash2 } from 'lucide-react'
import InputWithLabel from '../ui/input with label'
import { Input } from '../ui/input'
import { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '../ui/command'
import { ScrollArea } from '../ui/scroll-area'
import { cn } from '@/lib/utils'

function Option({ value, onChange = () => {}, onRemove = () => {} }) {
  const [key, setKey] = useState(value.key),
    [val, setVal] = useState(value.value),
    id = value.id

  function change({ key, value }) {
    return onChange({ key, value }, id)
  }

  return (
    <div className="flex flex-row w-full justify-between items-center gap-3 border p-1 rounded-md border-transparent hover:border-purple transition duration-500">
      <Button variant="outline" className="group aspect-square p-0" onClick={() => onRemove(id)}>
        <Trash2 className="group-hover:stroke-red-500 transition" color="#ffffff" size={20} />
      </Button>
      <InputWithLabel className="py-1" label="key" htmlFor={value.key}>
        <Input
          className="px-2 h-8"
          id={value.key}
          type="text"
          value={key}
          onChange={(e) => {
            setKey(e.target.value)
            change({ key: e.target.value, value: val })
          }}
        />
      </InputWithLabel>
      <InputWithLabel className="py-1" label="value" htmlFor={value.value}>
        <Input
          className="px-2 h-8"
          id={value.value}
          type="text"
          value={val}
          onChange={(e) => {
            setVal(e.target.value)
            change({ key: key, value: e.target.value })
          }}
        />
      </InputWithLabel>
    </div>
  )
}

export function Dropdown({ options = {}, index, value: Value, onChange, placeholder = 'Option' }) {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState(Value)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between bg-background/20">
          <span className="w-full text-start">{Object.entries(options).find(([key, name]) => key == value) ? value : 'Select option...'}</span>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command className="overflow-hidden">
          <ScrollArea className="w-full h-full">
            <CommandList>
              <CommandInput placeholder={placeholder} />
              <CommandEmpty>No option found.</CommandEmpty>
              <CommandGroup>
                {Object.entries(options).map(([key, name]) => (
                  <CommandItem
                    key={key}
                    value={key}
                    onSelect={(currentValue) => {
                      setValue(currentValue == value ? '' : currentValue)

                      onChange({ target: { value: key, id: 'value' } }, index)
                      setOpen(false)
                    }}>
                    <Check className={cn('mr-2 h-4 w-4', value == name ? 'opacity-100' : 'opacity-0')} />
                    {name}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </ScrollArea>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export default function DropdownInput({ options = {}, onChange = () => {} }) {
  const convert = (options) =>
      Object.entries(options).reduce((acc, [key, value], index) => {
        acc = [...acc, { id: index, key, value }]

        return acc
      }, []),
    [opt, setOpt] = useState(convert(options))

  useEffect(() => {
    setOpt(convert(options))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function onRemove(id) {
    let newOptions = opt.map((item) => ({ key: item.key, value: item.value }))

    newOptions.splice(id, 1)

    newOptions = convert(
      Object.values(newOptions).reduce((acc, { key, value }) => {
        acc[key] = value

        return acc
      }, {}),
    )

    setOpt(newOptions)
    onChange(newOptions)
  }

  function onAdd() {
    let newOptions = opt.map((item) => ({ key: item.key, value: item.value }))

    newOptions.push({ key: 'new', value: 'new' })

    newOptions = convert(
      Object.values(newOptions).reduce((acc, { key, value }) => {
        acc[key] = value

        return acc
      }, {}),
    )

    setOpt(newOptions)
    onChange(newOptions)
  }

  return (
    <div className="flex w-full flex-col justify-end items-end">
      <div className="w-full max-w-sm flex flex-row justify-end items-center gap-1.5 cursor-pointer" onClick={onAdd}>
        <p className="text-zinc-50 text-sm ml-2">Add option</p>
        <div className="grid place-items-center size-10 ">
          <Plus color="#ffffff" size="20px" />
        </div>
      </div>

      {/* <p className="text-zinc-400 text-sm mb-1 px-6">Not yet implemented</p> */}
      <div className="flex flex-col gap-2 w-full">
        {Object.values(opt).map(({ key, value, id }) => (
          <Option
            key={id}
            value={{ key, value, id }}
            onChange={({ key, value }, id) => {
              const newOptions = opt

              newOptions[id] = { id, key, value }

              setOpt(newOptions)
              onChange(newOptions)
            }}
            onRemove={onRemove}
          />
        ))}
      </div>
    </div>
  )
}
