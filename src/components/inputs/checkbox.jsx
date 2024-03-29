import { Checkbox } from '../ui/checkbox'
import { useState } from 'react'

export default function CheckboxInput({ value, index, onChange }) {
  const [checked, setChecked] = useState(value)

  return (
    <Checkbox
      className="w-full h-8"
      checked={checked}
      index={index}
      onCheckedChange={(value) => {
        onChange({ target: { value, id: 'value' } }, index)
        setChecked(value)
      }}
    />
  )
}
