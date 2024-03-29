//

import { HexAlphaColorPicker, HexColorPicker } from 'react-colorful'
import { Button } from '../ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import InputWithLabel from '../ui/input with label'
import { Input } from '../ui/input'
import { Checkbox } from '../ui/checkbox'
import { Label } from '../ui/label'
import { cn } from '@/lib/utils'
import { useState } from 'react'

export default function ColorpickerInput({ className, value, index, onChange, ...props }) {
  const [color, setColor] = useState(value || '#864FBC'),
    [inputColor, setInputColor] = useState(color),
    [alpha, setAlpha] = useState(false)

  return (
    <div className={cn('flex flex-row gap-2 w-full', className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="px-2 w-full">
            <div className="w-full h-full rounded" style={{ backgroundColor: color }}></div>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 flex flex-row justify-between items-start gap-3">
          {alpha ? (
            <HexAlphaColorPicker
              className="flex-1"
              color={color}
              onChange={(color) => {
                setColor(color)
                setInputColor(color)
              }}
            />
          ) : (
            <HexColorPicker
              className="flex-1"
              color={color}
              onChange={(color) => {
                setColor(color)
                setInputColor(color)
              }}
            />
          )}
          <div className="flex w-[30%] flex-col h-full gap-4">
            <InputWithLabel labelClassName="text-xs ml-1" label="Color" htmlFor="value">
              <Input
                id="value"
                className="text-xs"
                value={inputColor}
                onChange={({ target: { value: color } }) => {
                  if (new RegExp(/#[0-9a-f]{6}|#[0-9a-f]{3}/gi).test(color)) {
                    setColor(color)

                    color.length == 9 ? setAlpha(true) : setAlpha(false)
                  }

                  setInputColor(color)
                }}
              />
            </InputWithLabel>
            <div className="flex flex-row justify-around items-center gap-3">
              <Checkbox
                checked={alpha}
                id="alpha"
                onCheckedChange={(checked) => {
                  setAlpha(checked)
                }}
              />
              <Label>Enable alpha</Label>
            </div>
          </div>
        </PopoverContent>
      </Popover>
      <Button
        variant="outline"
        onClick={() => {
          onChange({ target: { value: color, id: 'value' } }, index)
        }}>
        Apply
      </Button>
    </div>
  )
}
