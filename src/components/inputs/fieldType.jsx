import { fieldTypes } from '@/lib/fieldTypes'
import InputWithLabel from '../ui/input with label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'

export default function FieldTypeInput({
  className,
  type,
  setType,
  onChange,
  index,
  label = 'Field type',
  placeholder = 'Select field type',
  ...props
}) {
  return (
    <InputWithLabel label={label}>
      <Select
        value={type}
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
          {fieldTypes.map((name) => (
            <SelectItem key={name} value={name}>
              {name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </InputWithLabel>
  )
}
