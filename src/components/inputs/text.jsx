import { Input } from '@/components/ui/input'

export default function TextInput({ className, index, value, type, onChange, ...props }) {
  return (
    <Input
      spellCheck={false}
      autoComplete="off"
      type={['number', 'slider'].some((e) => e == type) ? type : 'text'}
      placeholder="Field value"
      value={value}
      id="value"
      onChange={(e) => onChange(e, index)}
      {...props}
    />
  )
}
