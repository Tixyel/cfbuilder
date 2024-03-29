import { fieldTypes } from '@/lib/fieldTypes'
import InputWithLabel from '@/components/ui/input with label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export default function FieldTypeInput({ value, setType, onChange, index, label = 'Field type', placeholder = 'Select field type', ...props }) {
  return (
    <InputWithLabel label={label}>
      <Select
        value={value}
        id="type"
        onValueChange={(value) => {
          onChange({ target: { value, id: 'type' } }, index)

          setType(value)
        }}
        {...props}>
        <SelectTrigger className="w-full ">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {Object.keys(fieldTypes).map((name) => (
            <SelectItem key={name} value={name}>
              {name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </InputWithLabel>
  )
}
