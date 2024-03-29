//

import { Field } from '@/components/editor/blocks'
import Section from '@/components/editor/section'
import SortableItem from '@/components/sortable/SortableItem'
import SortableList from '@/components/sortable/SortableList'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import Divider from '@/components/ui/divider'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ScrollArea } from '@/components/ui/scroll-area'
import { noGroup } from '@/lib/group'
import { cn } from '@/lib/utils'
import { Plus } from 'lucide-react'

export default function Fields({ fields, setFields, updateJson, groups, group }) {
  return (
    <Section className="h-full flex-[0.5]">
      <Section.title>
        <p className="text-zinc-50 text-base font-bold flex-1">{group.name}</p>
        <p className="text-zinc-50 text-sm">Add field</p>

        <Dialog>
          <DialogTrigger>
            <div className="grid place-items-center size-10  cursor-pointer">
              <Plus color="#ffffff" size="20px" />
            </div>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add field</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Key
                </Label>
                <Input id="key" defaultValue="[field 0]" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Username
                </Label>
                <Input id="username" defaultValue="@peduarte" className="col-span-3" />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </Section.title>

      <Divider />

      <ScrollArea className="w-full px-3">
        <SortableList
          items={fields.filter((item) => item.group == group.id || (group.id == noGroup && !item.group))}
          onChange={(e) => {
            e = Object.entries({
              [group.id]: e,
              ...Object.values(fields)
                .filter((item) => item.group != group.id || (group.id == noGroup && !item.group))
                .reduce((acc, value) => {
                  !acc[value.group || noGroup] && (acc[value.group || noGroup] = [])

                  acc[value.group || noGroup] = [...acc[value.group || noGroup], value]

                  return acc
                }, {}),
            })
              .sort(([a], [b]) => groups.findIndex(({ id }) => id == a) - groups.findIndex(({ id }) => id == b))
              .reduce((acc, [_, value]) => (acc = [...acc, ...value]), [])

            setFields(e)
            updateJson(e)
          }}
          renderItem={(item) => {
            let { id, key, type, label, value } = item

            return (
              <SortableItem id={id} className={cn('my-3 first:mt-0 last:mb-0')}>
                <Field
                  onChange={(e, index) => {
                    let field = index,
                      name = e.target.id,
                      value = e.target.value

                    let newFields = fields

                    newFields[fields.findIndex(({ id }) => id == field)][name] = value

                    setFields(newFields)
                    updateJson(fields)
                  }}
                  index={id}
                  Key={key}
                  type={type}
                  label={label}
                  value={value}></Field>
              </SortableItem>
            )
          }}
        />
      </ScrollArea>
    </Section>
  )
}
