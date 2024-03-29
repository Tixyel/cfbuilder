import { Input } from '@/components/ui/input'

export default function FieldKeyInput({ index, value, onChange, ...props }) {
  return (
    <Input
      spellCheck={false}
      autoComplete="off"
      className="px-3 ring-0 h-5 bg-black/20 border-0 text-center"
      type="text"
      placeholder="Field key"
      value={value}
      onChange={(e) => onChange(e, index)}
      id="key"
      {...props}
    />
  )
}