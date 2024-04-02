'use client'

import { useEffect, useState } from 'react'
import { templateField } from '@/lib/template'

import { Groups as GroupsSection } from '@/containers/sessions/groups'
import { Fields as FieldsSection } from '@/containers/sessions/fields'
import { Result as ResultSection } from '@/containers/sessions/result'

import { noGroupObj } from '@/lib/placeholders'
import { cn } from '@/lib/utils'

import { Global } from '@/lib/fieldClasses'

function saveState(json) {
  let item = JSON.stringify(json, null, 2)
  return localStorage.setItem('json', item || templateField)
}

function getState() {
  if (window) {
    return JSON.parse(localStorage.getItem('json'))
  } else return {}
}

export default function Home() {
  const [json, setJson] = useState(templateField),
    [global, setGlobal] = useState(new Global({ json: json, run: setJson }))

  const [fields, setFields] = useState([]),
    [groups, setGroups] = useState([]),
    [group, selectGroup] = useState(noGroupObj)

  useEffect(() => setJson(getState()), [])

  useEffect(() => saveState(json), [json])

  useEffect(() => {
    setFields(global.fields)
  }, [global.fields])

  useEffect(() => {
    setGroups(global.groups)
    global.reorder()

    !global.getGroup(group?.id) && selectGroup(global.groups[0])

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [global.groups])

  const updates = {
    groups: (newGroups) => {
      if (global.groups != newGroups) {
        global.setGroups(newGroups)
        setGroups(newGroups)
      }
    },

    fields: (newFields, currentGroup = group, direct = false) => {
      if (direct) return setFields(newFields)

      if (global.listGroupFields(currentGroup, fields) != newFields) {
        let assemble = global.assembleFields(currentGroup, groups, newFields, fields)

        global.setFields(assemble)
        setFields(assemble)
      }
    },
  }

  return (
    <main
      className={cn(
        'flex flex-1 gap-6 pb-20 overflow-x-hidden z-20 overflow-hidden',
        'justify-start flex-col items-center overflow-y-scroll',
        'sm:justify-start sm:flex-col sm:items-center sm:overflow-y-scroll',
        'lg:justify-between lg:flex-row lg:items-start lg:overflow-hidden lg:px-24',
      )}>
      <GroupsSection global={global} groups={groups} setGroups={updates.groups} group={group} selectGroup={selectGroup} fields={fields} />

      <FieldsSection global={global} fields={fields} setFields={updates.fields} group={group} groups={groups} setGroups={updates.groups} />

      <ResultSection global={global} json={json} setJson={setJson} onClick={(json) => setGlobal(new Global({ json, run: setJson }))} />
    </main>
  )
}
