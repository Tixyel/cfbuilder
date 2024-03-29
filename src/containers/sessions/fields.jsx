import { Field } from '@/components/editor/blocks'
import Section from '@/components/editor/section'
import SortableItem from '@/components/sortable/SortableItem'
import SortableList from '@/components/sortable/SortableList'
import Divider from '@/components/ui/divider'
import { ScrollArea } from '@/components/ui/scroll-area'
import { noGroup, newGroup as newGroupName, newGroupObj } from '@/lib/group'
import { cn, concatJson, reorderGroupsInJson } from '@/lib/utils'
import AddField from '@/components/editor/addField'

export default function Fields({ fields, setFields, callback, groups, group }) {
  function onClickAdd(group, field) {
    let newFields = fields.filter((item) => item.group?.id == group || (group == noGroup && !item.group?.id)),
      thisGroup = groups.find(({ id }) => id == group),
      newGroups = groups

    if (!thisGroup) {
      thisGroup = newGroupObj
      newGroups.push(thisGroup)
    }

    newFields.unshift({ id: field?.key, ...field, group: thisGroup })

    callback(reorderGroupsInJson(newGroups, concatJson(thisGroup, newGroups, newFields, group == newGroupName ? [...fields, ...newFields] : fields)))
  }

  return (
    <Section className="h-full flex-[0.5] max-h-screen">
      <Section.title>
        <p className="text-zinc-50 text-base font-bold flex-1">{group.name}</p>
        <AddField fields={fields} groups={groups} group={group} onAdd={onClickAdd} />
      </Section.title>

      <Divider />

      <ScrollArea className="w-full px-2">
        <SortableList
          items={fields.filter((item) => item.group?.name == group.name || (group.name == noGroup && !item.group?.name))}
          onChange={(currentFields) => {
            currentFields = concatJson(group, groups, currentFields, fields)

            setFields(currentFields)
            callback(currentFields)
          }}
          renderItem={(item) => {
            let { id, key, type, label, value } = item

            return (
              <SortableItem id={id} className={cn('my-3 first:mt-0 last:mb-0')}>
                <Field
                  fields={fields}
                  onChange={(e, index) => {
                    let field = { id: e.target.id, value: e.target.value },
                      newFields = fields,
                      value = field.value

                    newFields[fields.findIndex(({ id }) => id == index)][field.id] = value

                    setFields(newFields)
                    callback(fields)
                  }}
                  remove={(id) => {
                    let newFields = fields,
                      index = fields.findIndex((item) => item.id == id)

                    if (index != undefined) {
                      newFields.splice(index, 1)

                      setFields(newFields)
                      callback(newFields)
                    }
                  }}
                  index={id}
                  fieldKey={key}
                  fieldKeyId={id}
                  type={type}
                  label={label}
                  value={value}
                  options={item.options}></Field>
              </SortableItem>
            )
          }}
        />
      </ScrollArea>
    </Section>
  )
}
