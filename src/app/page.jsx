'use client'

import { ChevronsUpDown, Plus } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'

import { cn } from '@/lib/utils'
import Editor, { DiffEditor, useMonaco, loader } from '@monaco-editor/react'

function Group({ className, ...props }) {
  return (
    <div
      className={cn(
        'flex flex-row p-2 pl-0 justify-start items-center w-full border transition ease-in-out duration-1000 [&.active]:border-[#864FBC] rounded-xl my-2 first:mt-0 last:mb-0',
        className,
      )}
      {...props}>
      {/* hover */}
      <div className="flex flex-row items-center justify-center px-3 py-2 cursor-move">
        <ChevronsUpDown color="#ffffff" size="20px" />
      </div>
      {/* input */}
      <div className="flex flex-col items-start justify-start gap-3 w-full">
        <Input type="text" placeholder="Group title" defaultValue="" />
      </div>
    </div>
  )
}

function Divider({ className, vertical, ...props }) {
  return <div className={cn('bg-neutral-800 my-1', className, vertical ? 'w-[1px] h-full' : 'w-full h-[1px]')} {...props}></div>
}

function Section({ className, children, ...props }) {
  return (
    <div className={cn('flex-initial flex flex-col gap-1 justify-start items-start pr-5 w-96', className)} {...props}>
      {children}
    </div>
  )
}

function SectionTitle({ className, children, ...props }) {
  return (
    <div className={cn('flex flex-row gap-3 justify-end items-center w-full h-12', className)} {...props}>
      {children}
    </div>
  )
}

function Field({ className, children, ...props }) {
  return (
    <div
      className={cn(
        'flex flex-row h-min justify-center items-start p-2 pl-0 w-full border transition ease-in-out duration-1000 [&.active]:border-[#864FBC] rounded-xl my-2 first:mt-0 last:mb-0',
        className,
      )}
      {...props}>
      <div className="flex self-center flex-row items-center justify-center px-3 py-2 cursor-move">
        <ChevronsUpDown color="#ffffff" size="20px" />
      </div>

      <div className="flex flex-col items-start justify-start gap-3 w-full">{children}</div>
    </div>
  )
}

export default function Home() {
  let availableFieldTypes = [
    'text',
    'hidden',
    'button',
    'number',
    'slider',
    'dropdown',
    'checkbox',
    'googleFont',
    'colorpicker',
    'audio-input',
    'sound-input',
    'video-input',
  ]

  return (
    <main className="min-h-screen h-screen max-h-screen bg-slate-950 flex flex-row justify-between items-start px-24 py-20 overflow-hidden">
      <Section className="h-full">
        <SectionTitle>
          <p className="text-zinc-50 text-sm">Add group</p>
          <div className="grid place-items-center size-10">
            <Plus color="#ffffff" size="20px" />
          </div>
        </SectionTitle>

        <Divider />

        <ScrollArea className="w-full pr-5">
          <Group className={'active'} />
          <Group />
        </ScrollArea>
      </Section>

      <Section className="h-full">
        <SectionTitle>
          <p className="text-zinc-50 text-base font-bold flex-1">[GROUP]</p>
          <p className="text-zinc-50 text-sm">Add field</p>
          <div className="grid place-items-center size-10">
            <Plus color="#ffffff" size="20px" />
          </div>
        </SectionTitle>

        <Divider />

        <ScrollArea className="w-full pr-5">
          <Field className={'active'}>
            <InputWithLabel label="Field type">
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  {availableFieldTypes.map((name) => (
                    <SelectItem key={name} value={name}>
                      {name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </InputWithLabel>

            <InputWithLabel label="Label" htmlFor="label">
              <Input type="text" placeholder="Field label" defaultValue="" id="label" />
            </InputWithLabel>

            <InputWithLabel label="Value" htmlFor="value">
              <Input type="text" placeholder="Field value" defaultValue="" id="value" />
            </InputWithLabel>
          </Field>

          <Field>
            <InputWithLabel label="Field type">
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  {availableFieldTypes.map((name) => (
                    <SelectItem key={name} value={name}>
                      {name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </InputWithLabel>

            <InputWithLabel label="Label" htmlFor="label">
              <Input type="text" placeholder="Field label" defaultValue="" id="label" />
            </InputWithLabel>

            <InputWithLabel label="Value" htmlFor="value">
              <Input type="text" placeholder="Field value" defaultValue="" id="value" />
            </InputWithLabel>
          </Field>
          <Field>
            <InputWithLabel label="Field type">
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  {availableFieldTypes.map((name) => (
                    <SelectItem key={name} value={name}>
                      {name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </InputWithLabel>

            <InputWithLabel label="Label" htmlFor="label">
              <Input type="text" placeholder="Field label" defaultValue="" id="label" />
            </InputWithLabel>

            <InputWithLabel label="Value" htmlFor="value">
              <Input type="text" placeholder="Field value" defaultValue="" id="value" />
            </InputWithLabel>
          </Field>
          <Field>
            <InputWithLabel label="Field type">
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  {availableFieldTypes.map((name) => (
                    <SelectItem key={name} value={name}>
                      {name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </InputWithLabel>

            <InputWithLabel label="Label" htmlFor="label">
              <Input type="text" placeholder="Field label" defaultValue="" id="label" />
            </InputWithLabel>

            <InputWithLabel label="Value" htmlFor="value">
              <Input type="text" placeholder="Field value" defaultValue="" id="value" />
            </InputWithLabel>
          </Field>
        </ScrollArea>
      </Section>

      <Section className={'flex-1 h-full'}>
        <Editor theme="vs-dark" height="100%" defaultLanguage="json" defaultValue="" />
      </Section>
    </main>
  )
}

function InputWithLabel({ className, children, label, htmlFor, ...props }) {
  return (
    <div className={cn('grid w-full max-w-sm items-center gap-1.5', className)} {...props}>
      <Label className="ml-2" htmlFor={htmlFor}>
        {label}
      </Label>
      {children}
    </div>
  )
}
