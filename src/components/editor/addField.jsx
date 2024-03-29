import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Command, CommandEmpty, CommandList, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import InputWithLabel from '@/components/ui/input with label'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Button } from '@/components/ui/button'

import { Check, ChevronsUpDown, Plus } from 'lucide-react'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import FieldTypeInput from '../inputs/fieldType'
import LabelInput from '../inputs/label'
import Variable from '../inputs/variables'
import Divider from '../ui/divider'
import { newGroup, noGroup } from '@/lib/group'
import FieldKeyInput from '../inputs/fieldKey'
import { Input } from '../ui/input'

function GroupType({ type, onChange, groups, placeholder = 'Search group...' }) {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState(type)

  return (
    <InputWithLabel label="group">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between bg-background/20">
            <span className="w-full text-start">{[...groups, { name: newGroup }].find(({ name }) => name == value) ? value : 'Select group...'}</span>
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[300px] p-0">
          <Command className="overflow-hidden">
            <ScrollArea className="w-full h-full">
              <CommandList>
                <CommandInput placeholder={placeholder} />
                <CommandEmpty>No group found.</CommandEmpty>

                <CommandItem
                  className="my-1 mx-1"
                  key="new"
                  value="new "
                  onSelect={(currentValue) => {
                    currentValue = newGroup
                    setValue(currentValue == value ? '' : currentValue)

                    onChange(currentValue)

                    setOpen(false)
                  }}>
                  <Check className={cn('mr-2 h-4 w-4', value == 'new ' ? 'opacity-100' : 'opacity-0')} />
                  New group
                </CommandItem>

                <Divider />

                <CommandGroup>
                  {groups.map(({ id, name }) => (
                    <CommandItem
                      key={id}
                      value={name}
                      onSelect={(currentValue) => {
                        setValue(currentValue == value ? '' : currentValue)

                        onChange(currentValue)

                        setOpen(false)
                      }}>
                      <Check className={cn('mr-2 h-4 w-4', value == name ? 'opacity-100' : 'opacity-0')} />
                      {name.toString().replace(noGroup, 'ungrouped')}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </ScrollArea>
          </Command>
        </PopoverContent>
      </Popover>
    </InputWithLabel>
  )
}

export default function AddField({ groups, fields, group, onAdd }) {
  const [groupType, setGroupType] = useState(group.name),
    [fieldKey, setFieldKey] = useState('field'),
    [fieldType, setFieldType] = useState('text'),
    [fieldLabel, setFieldLabel] = useState(''),
    [fieldValue, setFieldValue] = useState('')

  useEffect(() => {
    setGroupType(group.name)
  }, [group.name])

  return (
    <Dialog>
      <DialogTrigger>
        <div className="flex flex-row justify-center items-center px-3 py-2 rounded-sm bg-transparent hover:bg-background/20 border-none gap-2">
          <p className="text-zinc-50 text-sm w-full">Add field</p>
          <Plus color="#ffffff" size="25px" strokeWidth={3} />
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add field</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col justify-between items-center gap-4 py-4">
          <GroupType groups={groups} type={groupType} onChange={setGroupType} />

          <Divider />

          <InputWithLabel label={'Field key'}>
            <Input
              className={cn(
                fields.some((item) => item.key == fieldKey || !fieldKey.length) && 'invalid',
                '[&.invalid]:border-red-500 [&.invalid]:border',
              )}
              value={fieldKey}
              onChange={(e) => setFieldKey(e.target.value)}
              placeholder="Field key"
            />
          </InputWithLabel>

          {/* <LabelInput value={fieldLabel} onChange={(e) => setFieldLabel(e.target.value)} placeholder="Field label" /> */}
          {/* <FieldKeyInput
            className={cn(fields.some((item) => item.key == fieldKey) && 'invalid', '[&.invalid]:border-red-500 [&.invalid]:border')}
            value={fieldKey}
            onChange={(e) => setFieldKey(e.target.value)}
          /> */}

          {/* <FieldTypeInput
            value={fieldType}
            onValueChange={(e) => {
              setFieldType(e.target.value)
            }}
          />

          <LabelInput value={fieldLabel} onChange={(e) => setFieldLabel(e.target.value)} placeholder="Field label" />

          <Variable type={fieldType} value={fieldValue} onChange={(e) => setFieldValue(e.target.value)} /> */}
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              disabled={fields.some((item) => item.key == fieldKey)}
              variant="outline"
              onClick={() => {
                onAdd(groupType, { key: fieldKey, type: fieldType, label: fieldLabel, value: fieldValue })
              }}>
              Add and exit
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
