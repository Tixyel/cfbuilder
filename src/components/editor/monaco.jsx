'use client'

import Editor, { useMonaco } from '@monaco-editor/react'
import { useEffect } from 'react'

export default function Monaco({ ...props }) {
  const monaco = useMonaco()

  useEffect(() => {
    if (monaco) {
      import('monaco-themes/themes/Blackboard.json').then((data) => {
        monaco.editor.defineTheme('Blackboard', data)
        monaco.editor.setTheme('Blackboard')
      })
    }
  }, [monaco])

  return <Editor theme="Blackboard" {...props} />
}
