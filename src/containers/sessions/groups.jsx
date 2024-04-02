import { Group } from '@/components/editor/blocks'
import Section from '@/components/editor/section'
import SortableItem from '@/components/sortable/SortableItem'
import SortableList from '@/components/sortable/SortableList'
import Divider from '@/components/ui/divider'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Plus } from 'lucide-react'
import { noGroup } from '@/lib/placeholders'
import { concatJson, reorderGroupsInJson, validFieldToJSON } from '@/lib/utils'

export function Groups({ global, groups, setGroups, group, selectGroup, updateJson, fields }) {
  function select(key) {
    if (key == noGroup) return selectGroup({ id: noGroup, name: noGroup })
    else {
      let thisGroup = groups.find(({ id }) => id == key)
      if (thisGroup) return selectGroup(thisGroup)
    }
  }

  return (
    <Section className="h-full flex-[0.5] max-h-screen sm:w-full">
      <Section.title>
        <p className="w-full text-zinc-50 text-sm">Group list</p>
      </Section.title>

      <Divider />

      <ScrollArea className="w-full px-2 pr-4">
        <SortableList
          items={groups}
          onChange={(groups) => setGroups(groups)}
          renderItem={(item) => {
            let { id, name } = item

            return (
              <SortableItem id={id} className="my-3 first:mt-0 last:mb-0">
                <Group
                  id={id}
                  select={select}
                  onChange={(value, key) => {
                    let currentGroup = global.getGroup(key),
                      currentFields = global.listGroupFields(currentGroup),
                      newName = value.length ? value : '⁯⁯'

                    if (global.groups.some((item) => item.name === newName && item.id != currentGroup.id)) return false
                    else if (newName.length) {
                      global.getGroup(key).name = newName
                      currentFields.map((item) => item.id).forEach((id) => (global.getField(id).group = newName))

                      let valid = validFieldToJSON(global.fields)
                      global.run(valid)

                      return true
                    } else return false
                  }}
                  groupKey={id}
                  name={name}
                  className={group.id == id ? 'active' : ''}
                />
              </SortableItem>
            )
          }}
        />
      </ScrollArea>
    </Section>
  )
}
