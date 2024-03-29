import { Plus } from 'lucide-react'

export default function DropdownInput({}) {
  return (
    <div className="w-full max-w-sm flex flex-row justify-end items-center gap-1.5">
      <p className="text-zinc-50 text-sm ml-2">Add option</p>
      <div className="grid place-items-center size-10  cursor-pointer">
        <Plus color="#ffffff" size="20px" />
      </div>
    </div>
  )
}
