'use client'

import { Plus } from 'lucide-react'

import { ScrollArea } from '@/components/ui/scroll-area'
import { Field, Group } from '@/components/editor/blocks'
import Section from '@/components/editor/section'
import Divider from '@/components/ui/divider'
import Monaco from '@/components/editor/monaco'

import { cn } from '@/lib/utils'
import SortableList from '@/components/sortable/SortableList'
import { useEffect, useMemo, useReducer, useState } from 'react'
import SortableItem from '@/components/sortable/SortableItem'

export default function Home() {
  const [json, setJson] = useState({
      '[field 1]': { type: 'text', label: '', value: '', group: '[Group 1]' },
      '[field 2]': { type: 'text', label: '', value: '', group: '[Group 1]' },
      '[field 3]': { type: 'text', label: '', value: '', group: '[Group 1]' },
      '[field 4]': { type: 'text', label: '', value: '', group: '[Group 1]' },
      '[field 5]': { type: 'text', label: '', value: '', group: '[Group 1]' },
      '[field 6]': { type: 'text', label: '', value: '', group: '[Group 1]' },
      '[field 7]': { type: 'text', label: '', value: '', group: '[Group 2]' },
      '[field 8]': { type: 'text', label: '', value: '', group: '[Group 2]' },
      '[field 9]': { type: 'text', label: '', value: '', group: '[Group 3]' },
    }),
    [groups, setGroups] = useState(
      Object.values(json).reduce((acc, value) => {
        let object = { id: value.group, name: value.group }
        !acc.some(({ id }) => id == object.id) && (acc = [...acc, object])

        return acc
      }, []),
    ),
    [fields, setFields] = useState([]),
    [group, selectGroup] = useState({})

  useEffect(() => {
    setGroups(
      Object.values(json).reduce((acc, value) => {
        let object = { id: value.group, name: value.group }
        !acc.some(({ id }) => id == object.id) && (acc = [...acc, object])

        return acc
      }, []),
    )
  }, [json])

  useEffect(() => {
    setFields(
      Object.entries(json).reduce((acc, [key, { type, label, value, group }]) => {
        acc = [...acc, { id: key, key, type, label, value, group }]

        return acc
      }, []),
    )
  }, [json])

  function updateJson(e) {
    let newJson = Object.values(e || fields).reduce((acc, { id, key, type, label, value, options, group }) => {
      acc[key] = {
        type,
        label,
        value,
        options,
        group: group,
      }

      return acc
    }, {})

    setJson(newJson)
  }

  function handleInnerClick(e) {
    e.stopPropagation()
    if (e.detail == 2) {
      let thisGroup = groups.find(({ name }) => name == e.target.value)
      if (thisGroup) selectGroup(thisGroup)
    }
  }

  return (
    <main className="flex-1 bg-slate-950 flex flex-row justify-between gap-6 items-start px-24 pb-20 overflow-hidden">
      <Section className="h-full flex-[0.5]">
        <Section.title>
          <p className="text-zinc-50 text-sm">Add group</p>
          <div className="grid place-items-center size-10 cursor-pointer">
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
                  <Group onClick={handleInnerClick} key={name} name={name} className={group.id == id ? 'active' : ''} />
                </SortableItem>
              )
            }}
          />
        </ScrollArea>
      </Section>

      <Section className="h-full flex-[0.5]">
        <Section.title>
          <p className="text-zinc-50 text-base font-bold flex-1">{group.name}</p>
          <p className="text-zinc-50 text-sm">Add field</p>
          <div className="grid place-items-center size-10  cursor-pointer">
            <Plus color="#ffffff" size="20px" />
          </div>
        </Section.title>

        <Divider />

        <ScrollArea className="w-full px-3">
          <SortableList
            items={fields.map((item) => {
              let { id, key, type, label, value } = item

              return { id, key, type, label, value, group: item.group, visible: item.group == group.id }
            })}
            onChange={(e) => {
              setFields(e)
              updateJson(e)
            }}
            renderItem={(item) => {
              let { id, key, type, label, value, visible = true } = item

              return (
                <SortableItem id={id} className={cn('my-3 first:mt-0 last:mb-0', visible ? '' : 'hidden transition-none')}>
                  <Field
                    onChange={(e, index) => {
                      let field = index,
                        name = e.target.id,
                        value = e.target.value

                      let newFields = fields

                      newFields[fields.findIndex(({ id }) => id == field)][name] = value

                      setFields(newFields)
                      updateJson(fields)
                    }}
                    index={id}
                    Key={key}
                    type={type}
                    label={label}
                    value={value}></Field>
                </SortableItem>
              )
            }}
          />
        </ScrollArea>
      </Section>

      <Section className={'flex-1 h-full rounded-xl overflow-hidden pr-0'}>
        <Monaco
          onChange={(e) => setJson(JSON.parse(e))}
          options={{ minimap: { enabled: false }, wordWrap: 'on' }}
          width="100%"
          height="100%"
          defaultLanguage="json"
          value={JSON.stringify(json, null, 2)}
        />
      </Section>
    </main>
  )
}
