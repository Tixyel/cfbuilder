'use client'

import { Plus } from 'lucide-react'

import { ScrollArea } from '@/components/ui/scroll-area'
import { Field, Group } from '@/components/editor/blocks'
import Section from '@/components/editor/section'
import Divider from '@/components/ui/divider'
import Monaco from '@/components/editor/monaco'

import { cn } from '@/lib/utils'
import SortableList from '@/components/sortable/SortableList'
import { useState } from 'react'
import SortableItem from '@/components/sortable/SortableItem'

export default function Home() {
  let json = {
    '[teste 1]': { type: 'text', label: '', value: '', group: '[Group 1]' },
    '[teste 2]': { type: 'text', label: '', value: '', group: '[Group 1]' },
    '[teste 3]': { type: 'text', label: '', value: '', group: '[Group 1]' },
    '[teste 4]': { type: 'text', label: '', value: '', group: '[Group 1]' },
    '[teste 5]': { type: 'text', label: '', value: '', group: '[Group 1]' },
    '[teste 6]': { type: 'text', label: '', value: '', group: '[Group 1]' },
    '[teste 7]': { type: 'text', label: '', value: '', group: '[Group 2]' },
    '[teste 8]': { type: 'text', label: '', value: '', group: '[Group 2]' },
    '[teste 9]': { type: 'text', label: '', value: '', group: '[Group 3]' },
  }

  const [fields, setFields] = useState(
      new Array(10).fill('').map((_, index) => ({ id: index + 1, key: `[teste ${index + 1}]`, type: '', label: '', value: '' })),
    ),
    [groups, setGroups] = useState(new Array(3).fill('').map((_, index) => ({ id: index + 1, name: `[Group ${index + 1}]` })))

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
          <SortableList
            items={groups}
            onChange={setGroups}
            renderItem={(item) => {
              let { id, name } = item

              return (
                <SortableItem id={id} className="my-3 first:mt-0 last:mb-0">
                  <Group key={name} name={name} className={id == 1 ? 'active' : ''} />
                </SortableItem>
              )
            }}
          />
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
          <SortableList
            items={fields}
            onChange={setFields}
            renderItem={(item) => {
              let { id, key, type, label, value } = item

              return (
                <SortableItem id={id} className="my-3 first:mt-0 last:mb-0">
                  <Field index={id} Key={key} type={type} label={label} value={value} className={cn(id == 1 ? 'active' : '')}></Field>
                </SortableItem>
              )
            }}
          />
        </ScrollArea>
      </Section>

      <Section className={'flex-1 h-full rounded-xl overflow-hidden pr-0'}>
        <Monaco
          options={{ minimap: { enabled: false }, wordWrap: 'on' }}
          width="100%"
          height="100%"
          defaultLanguage="json"
          defaultValue={JSON.stringify(json, null, 2)}
        />
      </Section>
    </main>
  )
}
