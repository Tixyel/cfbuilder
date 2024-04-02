import { Plus } from 'lucide-react'
import InputWithLabel from '../ui/input with label'
import { Input } from '../ui/input'
import { useEffect, useState } from 'react'

function Option({ value, onChange = () => {} }) {
  const [val, setVal] = useState(value.value)
  const [key, setKey] = useState(value.key)
  const id = value.id

  function change({ key, value }) {
    return onChange({ key, value }, id)
  }

  return (
    <div className="flex flex-row w-full justify-between items-stretch gap-3  ">
      <InputWithLabel label="key" htmlFor={value.key}>
        <Input
          id={value.key}
          type="text"
          value={key}
          onChange={(e) => {
            setKey(e.target.value)
            change({ key: e.target.value, value: val })
          }}
        />
      </InputWithLabel>

      <InputWithLabel label="value" htmlFor={value.value}>
        <Input
          id={value.value}
          type="text"
          value={val}
          onChange={(e) => {
            setVal(e.target.value)
            change({ key: key, value: e.target.value })
          }}
        />
      </InputWithLabel>
    </div>
  )
}

export default function DropdownInput({ options = {}, onChange = () => {} }) {
  const [opt, setOpt] = useState(
    Object.entries(options).reduce((acc, [key, value]) => {
      acc[key] = {
        id: key,
        key,
        value,
      }
      return acc
    }, {}),
  )

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
        {Object.entries(opt)
          .reduce((acc, [_, { key, value, id }]) => {
            acc = [...acc, { key, value, id }]
            return acc
          }, [])
          .map(({ key, value, id }) => (
            <Option
              key={key + id}
              value={{ key, value, id }}
              onChange={({ key, value }, _id) => {
                const newOptions = opt

                setOpt(opt)
                onChange(newOptions)
              }}
            />
          ))}
      </div>
    </div>
  )
}
