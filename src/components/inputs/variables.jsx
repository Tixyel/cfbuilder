import InputWithLabel from '@/components/ui/input with label'
import ColorpickerInput from '@/components/inputs/colorpicker'
import GoogleFontInput from '@/components/inputs/googleFont'
import TextInput from '@/components/inputs/text'
import CheckboxInput from './checkbox'
import { Dropdown } from './dropdown'
import InputCounter from '../ui/input counter'

export default function Variable({ type, index = '', onChange, value, field, ...props }) {
  const variables = {
    'googleFont': <GoogleFontInput value={value} index={index} id="value" onChange={onChange} />,
    'colorpicker': <ColorpickerInput value={value} index={index} onChange={onChange} />,
    'checkbox': <CheckboxInput value={value} index={index} onChange={onChange} />,
    'dropdown': <Dropdown value={value} index={index} onChange={onChange} {...props} />,
    'number': <InputCounter value={value} index={index} onChange={onChange} step={field.step || 1} min={field.min} max={field.max} />,
    'slider': <InputCounter value={value} index={index} onChange={onChange} step={field.step || 1} min={field.min} max={field.max} />,
  }

  return (
    <InputWithLabel label="Value" htmlFor="value">
      {variables[type] || <TextInput index={index} onChange={onChange} value={value} type={type} />}
    </InputWithLabel>
  )
}
