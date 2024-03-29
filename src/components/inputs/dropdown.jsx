import { Plus } from 'lucide-react'
import InputWithLabel from '../ui/input with label'
import { Input } from '../ui/input'
import { useState } from 'react'

function Option({ value }) {
  const [key, setKey] = useState(value.key)
  const [val, setVal] = useState(value.value)

  return (
    <div key={key} className="flex flex-row w-full justify-between items-stretch gap-2">
      <InputWithLabel label="key">
        <Input type="text" value={key} onChange={(e) => setKey(e.target.value)} />
      </InputWithLabel>

      <InputWithLabel label="value">
        <Input type="text" value={val} onChange={(e) => setVal(e.target.value)} />
      </InputWithLabel>
    </div>
  )
}

export default function DropdownInput({ options }) {
  return (
    <div className="flex w-full flex-col justify-end items-end">
      <div className="w-full max-w-sm flex flex-row justify-end items-center gap-1.5">
        <p className="text-zinc-50 text-sm ml-2">Add option</p>
        <div className="grid place-items-center size-10  cursor-pointer">
          <Plus color="#ffffff" size="20px" />
        </div>
      </div>

      <p className="text-zinc-400 text-sm mb-1 px-6">Not yet implemented</p>
      <div className="flex flex-col gap-2 w-full">
        {Object.entries(options)
          .reduce((acc, [key, value]) => {
            acc = [...acc, { key, value }]
            return acc
          }, [])
          .map(({ key, value }) => (
            <Option key={value} value={{ key, value }} />
          ))}
      </div>
    </div>
  )
}
