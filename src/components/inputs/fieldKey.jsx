import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

export default function FieldKeyInput({ className, index, value, onChange, ...props }) {
  return (
    <Input
      spellCheck={false}
      autoComplete="off"
      className={cn('px-3 ring-0 h-5 bg-black/20 border-0 text-center', className)}
      type="text"
      placeholder="Field key"
      value={value}
      onChange={(e) => onChange(e, index)}
      id="key"
      {...props}
    />
  )
}
