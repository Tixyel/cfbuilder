import { Plus } from 'lucide-react'

export default function DropdownInput({}) {
  return (
    <div className="flex w-full flex-col justify-end items-end">
      <div className="w-full max-w-sm flex flex-row justify-end items-center gap-1.5">
        <p className="text-zinc-50 text-sm ml-2">Add option</p>
        <div className="grid place-items-center size-10  cursor-pointer">
          <Plus color="#ffffff" size="20px" />
        </div>
      </div>

      <p className="text-zinc-400 text-sm   px-6">Not yet implemented</p>
    </div>
  )
}
