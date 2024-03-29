'use client'

import { Plus } from 'lucide-react'

import { ScrollArea } from '@/components/ui/scroll-area'
import { Field, Group } from '@/components/editor/blocks'
import Section from '@/components/editor/section'
import Monaco from '@/components/editor/monaco'
import { Button } from '@/components/ui/button'
import Divider from '@/components/ui/divider'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import SortableList from '@/components/sortable/SortableList'
import SortableItem from '@/components/sortable/SortableItem'

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { templateField as template } from '@/lib/template'
import Groups from '@/containers/sessions/groups'
import { noGroup } from '@/lib/group'
import Fields from '@/containers/sessions/fields'
import Result from '@/containers/sessions/result'

export default function Home() {
  const [json, setJson] = useState(template),
    [groups, setGroups] = useState(
      Object.values(json).reduce((acc, value) => {
        let object = { id: value.group, name: value.group }
        !acc.some(({ id }) => id == object.id) && (acc = [...acc, object])

        return acc
      }, []),
    ),
    [fields, setFields] = useState(
      Object.entries(json).reduce((acc, [key, { type, label, value, group, options }]) => {
        acc = [...acc, { id: key, key, type, label, value, options, group }]

        return acc
      }, []),
    ),
    [group, selectGroup] = useState(groups[0] || { id: noGroup, name: noGroup })

  useEffect(
    () => apply(),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )

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

  function apply() {
    setGroups(
      Object.values(json).reduce((acc, value) => {
        let object = { id: value.group, name: value.group }

        if (!value?.group) object = { id: noGroup, name: noGroup }

        !acc.some(({ id }) => id == object.id) && (acc = [...acc, object])

        return acc
      }, []),
    )

    setFields(
      Object.entries(json).reduce((acc, [key, { type, label, value, options, group }]) => {
        acc = [...acc, { id: key, key, type, label, value, options, group }]

        return acc
      }, []),
    )
  }

  return (
    <main className="flex-1 flex flex-row justify-between gap-6 items-start px-24 pb-20 overflow-hidden z-20">
      <Groups groups={groups} setGroups={setGroups} group={group} selectGroup={selectGroup} />

      <Fields fields={fields} setFields={setFields} updateJson={updateJson} groups={groups} group={group} />

      <Result json={json} setJson={setJson} onClick={apply} />
    </main>
  )
}
