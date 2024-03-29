import { Group } from '@/components/editor/blocks'
import Section from '@/components/editor/section'
import SortableItem from '@/components/sortable/SortableItem'
import SortableList from '@/components/sortable/SortableList'
import Divider from '@/components/ui/divider'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Plus } from 'lucide-react'
import { noGroup } from '@/lib/group'
import { concatJson, reorderGroupsInJson } from '@/lib/utils'

export default function Groups({ groups, setGroups, group, selectGroup, updateJson, fields }) {
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

      <ScrollArea className="w-full px-3">
        <SortableList
          items={groups}
          onChange={(groups) => {
            setGroups(groups)

            updateJson(reorderGroupsInJson(groups, fields))
          }}
          renderItem={(item) => {
            let { id, name } = item

            return (
              <SortableItem id={id} className="my-3 first:mt-0 last:mb-0">
                <Group
                  id={id}
                  select={select}
                  onChange={(e) => {
                    let group = { id: e.target.parentNode.parentNode.id, name: e.target.value },
                      newGroups = groups,
                      currentFields = fields
                        .filter((item) => item.group.id == group.id || (group.id == noGroup && !item.group.id))
                        .map((item) => {
                          item.group.id != noGroup && (item.group.name = group.name)
                          return item
                        }),
                      newJson = concatJson(group, groups, currentFields, fields)

                    newGroups[groups.findIndex(({ id }) => id == group.id)].name = group.name

                    setGroups(newGroups)
                    updateJson(reorderGroupsInJson(groups, newJson))
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
