import { Input } from '@/components/ui/input'
import InputWithLabel from '@/components/ui/input with label'

export default function LabelInput({ className, value, index, onChange, placeholder = 'Field label', ...props }) {
  return (
    <InputWithLabel label="Label" htmlFor="label">
      <Input
        spellCheck={false}
        autoComplete="off"
        type="text"
        placeholder={placeholder}
        value={value}
        id="label"
        onChange={(e) => onChange(e, index)}
        {...props}
      />
    </InputWithLabel>
  )
}
