import { Input } from '../ui/input'
import InputWithLabel from '../ui/input with label'

export default function LabelInput({ className, label, index, onChange, placeholder = 'Field label', ...props }) {
  return (
    <InputWithLabel label="Label" htmlFor="label">
      <Input
        spellCheck={false}
        autoComplete="off"
        type="text"
        placeholder={placeholder}
        value={label}
        id="label"
        onChange={(e) => onChange(e, index)}
        {...props}
      />
    </InputWithLabel>
  )
}
