'use client'

import { useEffect, useState } from 'react'
import { templateField } from '@/lib/template'

import Groups from '@/containers/sessions/groups'
import Fields from '@/containers/sessions/fields'
import Result from '@/containers/sessions/result'

import { noGroupObj } from '@/lib/group'
import { cn, jsonFieldsToFields, jsonFieldsToGroups, updateJson } from '@/lib/utils'

export default function Home() {
  const [json, setJson] = useState(templateField),
    [groups, setGroups] = useState([]),
    [fields, setFields] = useState([]),
    [group, selectGroup] = useState(noGroupObj),
    [state, setState] = useState(false)

  function updateContent(jSon = json) {
    setFields(jsonFieldsToFields(jSon))
    setGroups(jsonFieldsToGroups(jSon))
  }

  useEffect(() => {
    if (window) {
      let Json = JSON.parse(localStorage.getItem('json'))

      Json && Json != null && JSON.stringify(Json) != JSON.stringify(templateField) && setJson(Json)
      setState(!state)
    }

    let items = JSON.parse(localStorage.getItem('json'))
    if (items && Object.values(items).length) setState(!state)

    selectGroup((groups || [])[0] || noGroupObj)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    updateContent()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state])

  useEffect(() => {
    let item = JSON.stringify(json, null, 2)
    localStorage.setItem('json', item || templateField)
  }, [json])

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
