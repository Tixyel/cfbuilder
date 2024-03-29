'use client'

import { useEffect, useState } from 'react'
import { templateField } from '@/lib/template'

import Groups from '@/containers/sessions/groups'
import Fields from '@/containers/sessions/fields'
import Result from '@/containers/sessions/result'

import { noGroupObj } from '@/lib/group'
import { jsonFieldsToFields, jsonFieldsToGroups, updateJson } from '@/lib/utils'
import { toast } from 'sonner'

export default function Home() {
  const [json, setJson] = useState(templateField),
    [groups, setGroups] = useState([]),
    [fields, setFields] = useState([]),
    [group, selectGroup] = useState(groups[0] || noGroupObj),
    [state, setState] = useState(false)

  function updateContent(jSon = json) {
    setFields(jsonFieldsToFields(jSon))
    setGroups(jsonFieldsToGroups(jSon))
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => updateContent(), [state])

  useEffect(() => {
    !groups.some(({ id }) => id == group.id) && selectGroup(groups[0] || noGroupObj)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <main className="flex-1 flex flex-row justify-between gap-6 items-start px-24 pb-20 overflow-hidden z-20">
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
