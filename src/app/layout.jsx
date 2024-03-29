import { cn } from '@/lib/utils'

import './globals.css'
import './layout.css'

import { Inter } from 'next/font/google'
import { Toaster } from '@/components/ui/sonner'
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Custom Fields Builder',
  description: 'Developed by Tixyel',
}

function Credits() {
  return (
    <div className="w-full h-min flex flex-col justify-center items-center z-10">
      <p>
        made by{' '}
        <a className="font-bold" href="https://twitter.com/Tixyel" target="_blank">
          Tixyel
        </a>
      </p>
      <a href="https://twitter.com/Tixyel" target="_blank">
        <svg className="fill-white size-12" width="100" height="76" viewBox="0 0 100 76">
          <path d="M40.507 3.4 4.376.02C1.083-.29-1.137 3.309.616 6.113L15.289 29.59a6.914 6.914 0 0 0 5.218 3.22l14.96 1.4-6.507 6.508a7.349 7.349 0 0 0-1.035 9.09l16.134 25.814V53.254l-4.184-6.694L50 36.435 60.125 46.56l-4.184 6.694v22.368l16.134-25.814a7.349 7.349 0 0 0-1.035-9.09l-6.508-6.508 14.96-1.4a6.915 6.915 0 0 0 5.22-3.22L99.383 6.113c1.753-2.805-.467-6.403-3.76-6.094L59.494 3.4l7.012 11.22 14.424-1.35-4.996 7.994L50 23.693l-25.934-2.428-4.996-7.993 14.423 1.35L40.506 3.4Z" />
        </svg>
      </a>
    </div>
  )
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={cn(
          inter.className,
          'w-full flex flex-col justify-center items-stretch min-h-screen h-screen max-h-screen overflow-hidden gap-2',
          'bg-[#000000]',
        )}>
        {/* <div className="bacate absolute w-full h-[100%] scale-y-50 scale-x-75 origin-top top-[-30%] bg-[#592e76] rounded-b-full"></div> */}

        <Credits />
        <div className="absolute inset-0">
          <Toaster position="bottom-left" />
        </div>
        {children}
      </body>
    </html>
  )
}
