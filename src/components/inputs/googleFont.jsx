'use client'

import { googleFonts } from '@/lib/googleFonts'

import { Command, CommandEmpty, CommandList, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '../ui/button'
import { Check, ChevronsUpDown } from 'lucide-react'
import React, { useState } from 'react'
import { cn } from '@/lib/utils'
import { ScrollArea } from '../ui/scroll-area'

export default function GoogleFontInput({ index, value: Value, onChange, placeholder = 'Search font...' }) {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState(Value)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between bg-background/20">
          <span className="w-full text-start">{googleFonts.find((font) => font == value) ? value : 'Select font...'}</span>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command className="overflow-hidden">
          <ScrollArea className="w-full h-full">
            <CommandList>
              <CommandInput placeholder={placeholder} />
              <CommandEmpty>No font found.</CommandEmpty>
              <CommandGroup>
                {googleFonts.map((font) => (
                  <CommandItem
                    key={font}
                    value={font}
                    onSelect={(currentValue) => {
                      setValue(currentValue == value ? '' : currentValue)

                      onChange({ target: { value: currentValue, id: 'value' } }, index)
                      setOpen(false)
                    }}>
                    <Check className={cn('mr-2 h-4 w-4', value == font ? 'opacity-100' : 'opacity-0')} />
                    {font}
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
