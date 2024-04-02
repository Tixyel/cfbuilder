import { Field } from '@/components/editor/blocks'
import Section from '@/components/editor/section'
import SortableItem from '@/components/sortable/SortableItem'
import SortableList from '@/components/sortable/SortableList'
import Divider from '@/components/ui/divider'
import { ScrollArea } from '@/components/ui/scroll-area'
import { noGroup, newGroup } from '@/lib/placeholders'
import { cn, validFieldToJSON } from '@/lib/utils'
import AddField from '@/components/editor/addField'

export function Fields({ global, fields, setFields, groups, setGroups, group }) {
  async function onClickAdd(group, field) {
    let currentGroup = global.getGroup(group.id) || { id: group?.id || group, name: group?.name || group }

    field.group = !currentGroup ? newGroup : currentGroup.name
    currentGroup.name == noGroup && (field.group = undefined)

    field.index = 1000

    global.addField(field)
  }

  return (
    <Section className="h-full flex-[0.5] max-h-screen">
      <Section.title>
        <p className="text-zinc-50 text-base font-bold flex-1">{group?.name}</p>
        <AddField fields={fields} groups={groups} group={group} onAdd={onClickAdd} />
      </Section.title>

      <Divider />

      <ScrollArea className="w-full px-2 pr-4">
        <SortableList
          items={global?.listGroupFields(group, global.fields || fields)}
          onChange={(currentFields) => {
            setFields(currentFields, group)
          }}
          renderItem={(item) => {
            return (
              <SortableItem id={item.id} className={cn('my-3 first:mt-0 last:mb-0')}>
                <Field
                  global={global}
                  fields={fields}
                  index={item.id}
                  field={item}
                  onChange={(id, value, where) => {
                    global.getField(id)[where] = value

                    global.run(validFieldToJSON(global.fields))
                  }}></Field>
              </SortableItem>
            )
          }}
        />
      </ScrollArea>
    </Section>
  )
}
