'use client'

import { useEffect, useState } from 'react'
import { templateField } from '@/lib/template'

import Groups from '@/containers/sessions/groups'
import Fields from '@/containers/sessions/fields'
import Result from '@/containers/sessions/result'

import { noGroupObj } from '@/lib/group'
import { cn, jsonFieldsToFields, jsonFieldsToGroups, updateJson } from '@/lib/utils'

export default function Home() {
  const [json, setJson] = useState(() => {
      if (typeof window != 'undefined' || typeof window != undefined) {
        let item = JSON.parse(localStorage.getItem('json'))

        if (item) return item
      } else return templateField
    }),
    [groups, setGroups] = useState(() => {
      if (typeof window != 'undefined' || typeof window != undefined) {
        let item = JSON.parse(localStorage.getItem('groups'))

        if (item) return item
      } else return []
    }),
    [fields, setFields] = useState(() => {
      if (typeof window != 'undefined' || typeof window != undefined) {
        let item = JSON.parse(localStorage.getItem('fields'))

        if (item) return item
      } else return []
    }),
    [group, selectGroup] = useState(groups[0] || noGroupObj),
    [state, setState] = useState(false)

  function updateContent(jSon = json) {
    setFields(jsonFieldsToFields(jSon))
    setGroups(jsonFieldsToGroups(jSon))
  }

  useEffect(() => {
    let items = JSON.parse(localStorage.getItem('json'))
    if (Object.values(items).length) setState(!state)

    !groups.some(({ id }) => id == group.id) && selectGroup(groups[0] || noGroupObj)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => updateContent(), [state])

  useEffect(() => localStorage.setItem('json', JSON.stringify(json, null, 2)), [json])
  useEffect(() => localStorage.setItem('groups', JSON.stringify(groups)), [groups])
  useEffect(() => localStorage.setItem('fields', JSON.stringify(fields)), [fields])

  return (
    <main
      className={cn(
        'flex-1 gap-6 pb-20 overflow-x-hidden z-20 overflow-hidden',
        'flex justify-between flex-row items-start',
        'sm:justify-start sm:flex-col sm:items-center sm:overflow-y-scroll',
        'lg:justify-between lg:flex-row lg:items-start lg:overflow-hidden lg:px-24',
      )}>
      <Groups
        groups={groups}
        setGroups={setGroups}
        group={group}
        selectGroup={selectGroup}
        fields={fields}
        updateJson={(e) => {
          setJson(updateJson(e || fields))
        }}
      />
      <Fields
        fields={fields}
        setFields={setFields}
        group={group}
        groups={groups}
        callback={(e) => {
          setJson(updateJson(e || fields))

          setState(!state)
        }}
      />
      <Result json={json} setJson={setJson} onClick={updateContent} />
    </main>
  )
}
