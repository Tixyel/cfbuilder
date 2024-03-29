import InputWithLabel from '@/components/ui/input with label'
import ColorpickerInput from '@/components/inputs/colorpicker'
import GoogleFontInput from '@/components/inputs/googleFont'
import TextInput from '@/components/inputs/text'

export default function Variable({ type, index, onChange, value }) {
  const variables = {
    'googleFont': (
      <GoogleFontInput
        value={value}
        index={index}
        id="value"
        onChange={onChange}
        // onValueChange={(value) => onChange({ target: { value, id: 'value' } }, index)}
      />
    ),
    'colorpicker': <ColorpickerInput value={value} index={index} onChange={onChange} />,
  }

  return (
    <InputWithLabel label="Value" htmlFor="value">
      {variables[type] || <TextInput index={index} onChange={onChange} value={value} type={type} />}
    </InputWithLabel>
  )
}