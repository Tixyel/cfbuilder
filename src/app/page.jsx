'use client'

import { Plus } from 'lucide-react'

import { ScrollArea } from '@/components/ui/scroll-area'
import { Field, Group } from '@/components/editor/blocks'
import Section from '@/components/editor/section'
import Monaco from '@/components/editor/monaco'
import { Button } from '@/components/ui/button'
import Divider from '@/components/ui/divider'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import SortableList from '@/components/sortable/SortableList'
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

  // useEffect(() => {
  //   setGroups(
  //     Object.values(json).reduce((acc, value) => {
  //       let object = { id: value.group, name: value.group }
  //       !acc.some(({ id }) => id == object.id) && (acc = [...acc, object])

  //       return acc
  //     }, []),
  //   )
  // }, [json])

  // useEffect(() => {
  //   setFields(
  //     Object.entries(json).reduce((acc, [key, { type, label, value, group }]) => {
  //       acc = [...acc, { id: key, key, type, label, value, group }]

  //       return acc
  //     }, []),
  //   )
  // }, [json])

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

  function addGroup() {}
  function addField() {
    console.log('abacate')
  }

  function apply() {
    setGroups(
      Object.values(json).reduce((acc, value) => {
        let object = { id: value.group, name: value.group }
        !acc.some(({ id }) => id == object.id) && (acc = [...acc, object])
        return acc
      }, []),
    )
    setFields(
      Object.entries(json).reduce((acc, [key, { type, label, value, group }]) => {
        acc = [...acc, { id: key, key, type, label, value, group }]

        return acc
      }, []),
    )
  }

  return (
    <main className="flex-1 flex flex-row justify-between gap-6 items-start px-24 pb-20 overflow-hidden z-20">
      <Section className="h-full flex-[0.5]">
        <Section.title>
          <p className="text-zinc-50 text-sm">Add group</p>
          <div className="grid place-items-center size-10 cursor-pointer" onClick={addGroup}>
            <Plus color="#ffffff" size="20px" />
          </div>
        </Section.title>

        <Divider />

        <ScrollArea className="w-full px-3">
          <SortableList
            items={groups}
            onChange={(e) => {
              setGroups(e)
              updateJson(
                Object.values(e).reduce((acc, { id, name }) => {
                  let object = fields
                    .filter(({ group }) => group == id)
                    .map((item) => {
                      item.group = name
                      return item
                    })

                  acc = [...acc, ...object]
                  return acc
                }, []),
                true,
              )
            }}
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
          <div className="grid place-items-center size-10  cursor-pointer" onClick={addField}>
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

      <Section className={'flex-1 h-full gap-4   rounded-xl overflow-hidden p-4 border border-[#864FBC] bg-black/20 backdrop-blur'}>
        <Section.title>
          <p className="text-zinc-50 text-base font-bold flex-1 ml-5 w-full">Result</p>
          <Button onClick={apply} className="hover:border-transparent transition duration-700 border-[#864FBC]" variant="outline">
            Apply
          </Button>
        </Section.title>
        <div className="h-full w-full rounded-xl overflow-hidden">
          <Monaco
            onChange={(e) => setJson(JSON.parse(e))}
            options={{ minimap: { enabled: false }, wordWrap: 'on' }}
            width="100%"
            height="100%"
            defaultLanguage="json"
            value={JSON.stringify(json, null, 2)}
          />
        </div>
      </Section>
    </main>
  )
}
