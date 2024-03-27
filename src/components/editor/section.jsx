import { cn } from '@/lib/utils'

export default function Section({ className, children, ...props }) {
  return (
    <div className={cn('flex-initial flex flex-col gap-1 justify-start items-start w-96', className)} {...props}>
      {children}
    </div>
  )
}

function SectionTitle({ className, children, ...props }) {
  return (
    <div className={cn('flex flex-row gap-3 justify-end items-center w-full h-12 max-h-12 min-h-12', className)} {...props}>
      {children}
    </div>
  )
}

Section.title = SectionTitle
