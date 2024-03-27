import { cn } from '@/lib/utils'

export default function Divider({ className, vertical, ...props }) {
  return <div className={cn('bg-neutral-800 my-1', className, vertical ? 'w-[1px] h-full' : 'w-full h-[1px]')} {...props}></div>
}
