export const fieldTypes = {
  'text': (value) => value,
  'hidden': (value) => value,
  'button': (value) => value,
  'number': (value) => parseFloat(value) || 0,
  'slider': (value) => parseFloat(value) || 0,
  'dropdown': (value) => value,
  'checkbox': (value) => new Boolean(value),
  'googleFont': (value) => value,
  'colorpicker': (value) => value,
  'audio-input': (value) => value,
  'sound-input': (value) => value,
  'video-input': (value) => value,
}

export const customFieldTypes = ['gradient', 'array', '']
