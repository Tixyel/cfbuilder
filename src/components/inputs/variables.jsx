import InputWithLabel from '@/components/ui/input with label'
import ColorpickerInput from '@/components/inputs/colorpicker'
import GoogleFontInput from '@/components/inputs/googleFont'
import TextInput from '@/components/inputs/text'
import { Input } from '../ui/input'

export default function Variable({ type, index = '', onChange, value }) {
  const variables = {
    'googleFont': <GoogleFontInput value={value} index={index} id="value" onChange={onChange} />,
    'colorpicker': <ColorpickerInput value={value} index={index} onChange={onChange} />,
    'checkbox': <Input type="checkbox" value={value} index={index} oonChange={onChange} />,
  }

  return (
    <InputWithLabel label="Value" htmlFor="value">
      {variables[type] || <TextInput index={index} onChange={onChange} value={value} type={type} />}
    </InputWithLabel>
  )
}
