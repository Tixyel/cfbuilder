import { Minus, Plus } from 'lucide-react'
import { Label } from './label'
import { cn } from '@/lib/utils'
import { Input } from './input'
import { useEffect, useState } from 'react'

function Button({ className, children, ...props }) {
  return (
    <button
      className={cn(
        'flex px-1 self-stretch aspect-square items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors disabled:pointer-events-none disabled:opacity-50',
        'border-x border-x-input bg-background/20 hover:bg-accent hover:text-accent-foreground',
        className,
      )}
      {...props}>
      {children}
    </button>
  )
}

export default function InputCounter({ index, value, step = 1, max = Number.MAX_SAFE_INTEGER, min = Number.MIN_SAFE_INTEGER, onChange }) {
  const [val, setVal] = useState((value || 0).toString()),
    [status, setStatus] = useState('')

  useEffect(() => {
    value != val && setVal((value || 0).toString())

    setStatus(val >= max ? 'max' : val <= min ? 'min' : '')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, val])

  const balance = (value) => {
      value = parseFloat(value)
      value = Math.round(parseFloat(value.toString().length ? value : 0) / step) * step
      value = Math.min(Math.max(value, parseFloat(min)), parseFloat(max))

      return value
    },
    save = (value) => onChange({ target: { value, id: 'value' } }, index),
    add = () => {
      let newValue = balance(parseFloat(val) + parseFloat(step || 1))
      setVal(newValue)
      save(newValue)
    },
    remove = () => {
      let newValue = balance(parseFloat(val) - parseFloat(step || 1))
      setVal(newValue)
      save(newValue)
    }

  return (
    <div
      className={cn(
        'relative flex flex-row w-full items-center justify-stretch transition-all duration-500 rounded-md',
        'border-input border',
        'focus-within:ring-2 focus-within:ring-slate-800 focus-within:ring-offset-0',
      )}>
      <Button className={cn('rounded-br-none rounded-tr-none border-l-0 [&.min]:opacity-40 [&.min]:cursor-not-allowed', status)} onClick={remove}>
        <Minus color="#fff" size={24} />
      </Button>
      <Input
        type="text"
        className="px-1 rounded-none border-none focus-visible:ring-transparent items-center justify-center text-center border-x-0"
        value={val}
        pattern="\d{1,5}"
        step={step}
        min={min}
        max={max}
        onChange={(e) => {
          let newValue = e.target.value

          newValue = balance(newValue)

          setVal(newValue)
          save(newValue)
        }}
      />
      {/* <input type="text" placeholder="999" /> */}
      <Button className={cn('rounded-bl-none rounded-tl-none border-r-0 [&.max]:opacity-40 [&.max]:cursor-not-allowed', status)} onClick={add}>
        <Plus color="#fff" size={24} />
      </Button>
    </div>
  )
}
