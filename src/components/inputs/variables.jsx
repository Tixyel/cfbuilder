import InputWithLabel from '@/components/ui/input with label'
import ColorpickerInput from '@/components/inputs/colorpicker'
import GoogleFontInput from '@/components/inputs/googleFont'
import TextInput from '@/components/inputs/text'
import { Input } from '../ui/input'
import { Checkbox } from '../ui/checkbox'

export default function Variable({ type, index = '', onChange, value }) {
  const variables = {
    'googleFont': <GoogleFontInput value={value} index={index} id="value" onChange={onChange} />,
    'colorpicker': <ColorpickerInput value={value} index={index} onChange={onChange} />,
    'checkbox': (
      <Checkbox className="w-full h-8" value={value} index={index} onCheckedChange={(value) => onChange({ target: { value, id: 'value' } }, index)} />
    ),
  }

  return (
    <InputWithLabel label="Value" htmlFor="value">
      {variables[type] || <TextInput index={index} onChange={onChange} value={value} type={type} />}
    </InputWithLabel>
  )
}
