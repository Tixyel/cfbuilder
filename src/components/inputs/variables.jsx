import InputWithLabel from '@/components/ui/input with label'
import ColorpickerInput from '@/components/inputs/colorpicker'
import GoogleFontInput from '@/components/inputs/googleFont'
import TextInput from '@/components/inputs/text'
import CheckboxInput from './checkbox'
import { Dropdown } from './dropdown'

export default function Variable({ type, index = '', onChange, value, ...props }) {
  const variables = {
    'googleFont': <GoogleFontInput value={value} index={index} id="value" onChange={onChange} />,
    'colorpicker': <ColorpickerInput value={value} index={index} onChange={onChange} />,
    'checkbox': <CheckboxInput value={value} index={index} onChange={onChange} />,
    'dropdown': <Dropdown value={value} index={index} onChange={onChange} {...props} />,
  }

  return (
    <InputWithLabel label="Value" htmlFor="value">
      {variables[type] || <TextInput index={index} onChange={onChange} value={value} type={type} />}
    </InputWithLabel>
  )
}
