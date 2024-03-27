'use client'

import { Plus } from 'lucide-react'

import { ScrollArea } from '@/components/ui/scroll-area'
import { Field, Group } from '@/components/editor/blocks'
import Section from '@/components/editor/section'
import Divider from '@/components/ui/divider'
import Monaco from '@/components/editor/monaco'

import { cn } from '@/lib/utils'

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
    ],
    groups = [{ name: 'Grupo teste' }, { name: 'Grupo teste 2' }],
    fields = [
      { key: '[teste]', type: 'text', label: '', value: '' },
      { key: '[teste 2]', type: 'text', label: '', value: '' },
      { key: '[teste 3]', type: 'text', label: '', value: '' },
    ]

  return (
    <main className="min-h-screen h-screen max-h-screen bg-slate-950 flex flex-row justify-between gap-6 items-start px-24 py-20 overflow-hidden">
      <Section className="h-full">
        <Section.title>
          <p className="text-zinc-50 text-sm">Add group</p>
          <div className="grid place-items-center size-10">
            <Plus color="#ffffff" size="20px" />
          </div>
        </Section.title>

        <Divider />

        <ScrollArea className="w-full px-3">
          {groups.map(({ name }, index) => (
            <Group key={name} name={name} className={cn(index == 0 ? 'active' : '')} />
          ))}
        </ScrollArea>
      </Section>

      <Section className="h-full">
        <Section.title>
          <p className="text-zinc-50 text-base font-bold flex-1">[GROUP]</p>
          <p className="text-zinc-50 text-sm">Add field</p>
          <div className="grid place-items-center size-10">
            <Plus color="#ffffff" size="20px" />
          </div>
        </Section.title>

        <Divider />

        <ScrollArea className="w-full px-3">
          {fields.map(({ key, type, label, value }, index) => (
            <Field key={index} index={index} name={key} type={type} label={label} value={value} availableFieldTypes={availableFieldTypes}></Field>
          ))}
        </ScrollArea>
      </Section>

      <Section className={'flex-1 h-full rounded-xl overflow-hidden pr-0'}>
        <Monaco options={{ minimap: { enabled: false }, wordWrap: 'on' }} width="100%" height="100%" defaultLanguage="json" defaultValue="" />
      </Section>
    </main>
  )
}
