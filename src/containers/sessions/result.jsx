import Monaco from '@/components/editor/monaco'
import Section from '@/components/editor/section'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'

export function Result({ json, setJson, onClick }) {
  function copyData() {
    navigator.clipboard.writeText(
      JSON.stringify(
        Object.entries(json).reduce((acc, [key, { value }]) => {
          if (value != undefined) acc[key] = value
          return acc
        }, {}),
      ),
    )

    toast.success('Field data copied successfully')
  }

  function copyFields() {
    navigator.clipboard.writeText(JSON.stringify(json, null, 2))

    toast.success('Fields copied successfully')
  }

  return (
    <Section
      className={cn(
        'flex-1 h-full min-h-[50%] sm:w-[90%] gap-4 max-h-screen rounded-xl overflow-hidden p-4 border border-purple bg-black/20 backdrop-blur',
        'lg:min-h-min',
      )}>
      <Section.title>
        <p className="text-zinc-50 text-base font-bold flex-1 ml-5 w-full">Result</p>
        <p className="text-zinc-50 ml-5 text-xs">{json && Object.keys(json).length} fields</p>
        <Button onClick={() => onClick(json)} className="hover:border-transparent transition duration-700 border-purple" variant="outline">
          Apply
        </Button>
      </Section.title>

      <div className="flex h-full w-full rounded-xl overflow-hidden">
        <Monaco
          className="flex-1 h-full"
          onChange={(e) => setJson(JSON.parse(e))}
          options={{
            minimap: { enabled: false },
            wordWrap: 'on',
            unicodeHighlight: {
              invisibleCharacters: false,
            },
          }}
          width="100%"
          height="100%"
          defaultLanguage="json"
          value={JSON.stringify(json, null, 2)}
        />
      </div>
      <div className="flex flex-row w-full justify-end gap-5">
        <Button onClick={copyData} className="hover:border-transparent transition duration-700 hover:border-purple" variant="outline">
          Copy field data
        </Button>
        <Button onClick={copyFields} className="hover:border-transparent transition duration-700 hover:border-purple" variant="outline">
          Copy fields
        </Button>
      </div>
    </Section>
  )
}
