'use client'

import { useEffect, useState } from 'react'
import { templateField } from '@/lib/template'

import { Groups as GroupsSection } from '@/containers/sessions/groups'
import { Fields as FieldsSection } from '@/containers/sessions/fields'
import { Result as ResultSection } from '@/containers/sessions/result'

import { noGroupObj } from '@/lib/placeholders'
import { cn } from '@/lib/utils'

import { Global } from '@/lib/fieldClasses'

function saveState(json = templateField) {
  if ([undefined, 'undefined'].some((e) => window != e) && window) return localStorage.setItem('json', JSON.stringify(json, null, 2))
  else return null
}

function getState() {
  if ([undefined, 'undefined'].some((e) => window != e) && window) return JSON.parse(localStorage.getItem('json'))
  else return templateField
}

export default function Home() {
  const [json, setJson] = useState(templateField),
    [global, setGlobal] = useState(new Global({ json: json, run: setJson }))

  const [fields, setFields] = useState([]),
    [groups, setGroups] = useState([]),
    [group, selectGroup] = useState(groups[0] || noGroupObj)

  useEffect(() => {
    let lastJson = getState()

    if (lastJson && JSON.stringify(lastJson) != JSON.stringify(json) && Object.values(lastJson).length) {
      setJson(lastJson)
      setGlobal(new Global({ json: lastJson, run: setJson }))
    }

    saveState(json)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => json && Object.values(json).length && saveState(json), [json])

  useEffect(() => setFields(global.fields), [global.fields])

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
