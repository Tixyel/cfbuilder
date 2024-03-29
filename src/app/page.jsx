'use client'

import { useEffect, useState } from 'react'
import { templateField } from '@/lib/template'

import Groups from '@/containers/sessions/groups'
import Fields from '@/containers/sessions/fields'
import Result from '@/containers/sessions/result'

import { noGroup } from '@/lib/group'
import { jsonFieldsToFields, jsonFieldsToGroups, updateJson } from '@/lib/utils'

export default function Home() {
  const [json, setJson] = useState(templateField),
    [groups, setGroups] = useState(jsonFieldsToGroups(json)),
    [fields, setFields] = useState(jsonFieldsToFields(json, groups)),
    [group, selectGroup] = useState(groups[0] || { id: noGroup, name: noGroup })

  function updateContent() {
    setFields(jsonFieldsToFields(json))
    setGroups(jsonFieldsToGroups(json))
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => updateContent(), [])

  return (
    <main className="flex-1 flex flex-row justify-between gap-6 items-start px-24 pb-20 overflow-hidden z-20">
      <Groups
        groups={groups}
        setGroups={setGroups}
        group={group}
        selectGroup={selectGroup}
        fields={fields}
        updateJson={(e) => setJson(updateJson(e || fields))}
      />

      <Fields fields={fields} setFields={setFields} updateJson={(e) => setJson(updateJson(e || fields))} groups={groups} group={group} />

      <Result json={json} setJson={setJson} onClick={updateContent} />
    </main>
  )
}
