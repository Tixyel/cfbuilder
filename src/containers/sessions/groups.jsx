//

import { Group } from '@/components/editor/blocks'
import Section from '@/components/editor/section'
import SortableItem from '@/components/sortable/SortableItem'
import SortableList from '@/components/sortable/SortableList'
import Divider from '@/components/ui/divider'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Plus } from 'lucide-react'
import { noGroup } from '@/lib/group'

export default function Groups({ groups, setGroups, group, selectGroup }) {
  function handleInnerClick(key) {
    if (key == noGroup) return selectGroup({ id: noGroup, name: noGroup })
    else {
      let thisGroup = groups.find(({ name }) => name == key)
      if (thisGroup) return selectGroup(thisGroup)
    }
  }

  return (
    <Section className="h-full flex-[0.5]">
      <Section.title>
        <p className="text-zinc-50 text-sm">Add group</p>
        <div className="grid place-items-center size-10 cursor-pointer">
          <Plus color="#ffffff" size="20px" />
        </div>
      </Section.title>

      <Divider />

      <ScrollArea className="w-full px-3">
        <SortableList
          items={[...groups]}
          onChange={(e) => {
            setGroups(e)
            updateJson(
              Object.values(e).reduce((acc, { id, name }) => {
                if (id) {
                  let object = fields
                    .filter(({ group }) => group == id)
                    .map((item) => {
                      item.group = name
                      return item
                    })

                  acc = [...acc, ...object]
                }

                return acc
              }, []),
              true,
            )
          }}
          renderItem={(item) => {
            let { id, name } = item

            return (
              <SortableItem id={id} className="my-3 first:mt-0 last:mb-0">
                <Group select={handleInnerClick} key={name} Key={id} name={name} className={group.id == id ? 'active' : ''} />
              </SortableItem>
            )
          }}
        />
      </ScrollArea>
    </Section>
  )
}
