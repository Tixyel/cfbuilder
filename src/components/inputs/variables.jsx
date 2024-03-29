import InputWithLabel from '../ui/input with label'
import ColorpickerInput from './colorpicker'
import GoogleFontInput from './googleFont'
import TextInput from './text'

export default function Variable({ type, index, onChange, value }) {
  const variables = {
    'googleFont': (
      <GoogleFontInput value={value} index={index} id="value" onValueChange={(value) => onChange({ target: { value, id: 'value' } }, index)} />
    ),
    'colorpicker': <ColorpickerInput value={value} index={index} onChange={onChange} />,
  }

  return (
    <InputWithLabel label="Value" htmlFor="value">
      {variables[type] || <TextInput index={index} onChange={onChange} value={value} type={type} />}
    </InputWithLabel>
  )
}
