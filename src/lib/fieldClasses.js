import { noGroup } from './placeholders'
import { convertJsonToGroupClass, convertJsonToFieldClass, validFieldToJSON } from './utils'

class Field {
  constructor(options) {
    this.key = options.key || ''
    this.type = options.type || ''
    this.label = options.label || ''
    this.value = options.value || ''

    this.options = options.options || undefined
    this.step = options.step || undefined
    this.min = options.min || undefined
    this.max = options.max || undefined

    this.group = options.group || undefined

    this.id = options.index.toString() + this.key.toString()
  }

  getValidJson() {
    return [
      this.key,
      {
        type: this.type,
        label: this.label,
        value: this.value,
        options: this.options,
        step: this.step,
        min: this.min,
        max: this.max,
        group: this.group?.name || this.group,
      },
    ]
  }

  setKey(key = this.key) {
    this.key = key.toString()
    return this
  }

  setType(type = this.type) {
    this.type = type.toString()
    return this
  }

  setLabel(label = this.label) {
    this.label = label.toString()
    return this
  }

  setValue(value = this.value) {
    this.value = value
    return this
  }

  setGroup(group = this.group) {
    this.group = group.toString()
    return this
  }

  setOptions(options = this.options) {
    this.options = new Object(options)
    return this
  }

  setStep(step = this.step) {
    this.step = parseFloat(step)
    return this
  }

  setMin(min = this.min) {
    this.min = parseFloat(min)
    return this
  }

  setMax(max = this.max) {
    this.max = parseFloat(max)
    return this
  }
}

class Global {
  constructor(options) {
    this.json = options.json || {}
    this.fields = convertJsonToFieldClass(options.json)
    this.groups = convertJsonToGroupClass(options.json)

    this.execute = options.run
  }

  setFields(fields = this.fields) {
    this.fields = fields

    this.reorder()

    this.run(validFieldToJSON(this.fields))
  }

  setGroups(groups = this.groups) {
    this.groups = groups

    this.reorder()

    this.run(validFieldToJSON(this.fields))
  }

  addField(field = {}) {
    field = new Field(field)

    let index = this.fields.indexOf(this.listGroupFields(this.getGroupByName(field.group || noGroup))[0])

    this.fields.splice(index, 0, field)

    let groups = convertJsonToGroupClass(validFieldToJSON(this.fields))

    this.setGroups(groups)
    this.setFields(this.fields)
    this.reorder(groups, this.fields)

    this.run(validFieldToJSON(this.fields))

    return { groups, fields: this.fields }
  }

  removeField(fieldId) {
    let index = this.fields.indexOf(this.getField(fieldId))

    this.fields.splice(index, 1)

    this.merge(validFieldToJSON(this.fields))
    this.reorder()

    this.run(validFieldToJSON(this.fields))
  }

  moveField(fieldId, newGroup) {
    newGroup = this.getGroupByName(newGroup)

    let field = this.getField(fieldId)

    if (newGroup && field) {
      let actualIndex = this.fields.indexOf(field),
        newIndex = this.fields.indexOf(this.listGroupFields(newGroup)[0])

      this.getField(fieldId).group = newGroup

      this.fields.splice(actualIndex, 1)
      this.fields.splice(newIndex > 0 ? newIndex - 1 : newIndex, 0, field)

      this.merge(validFieldToJSON(this.fields))
      this.reorder()

      this.run(validFieldToJSON(this.fields))
    }
  }

  run(valid) {
    this.execute(valid)

    this.json = valid
  }

  merge(valid, set = true) {
    let fields = convertJsonToFieldClass(valid),
      groups = convertJsonToGroupClass(valid)

    if (set) {
      this.fields = fields
      this.groups = groups
    } else return { fields, groups }
  }

  reorder(groups = this.groups, fields = this.fields, set = true) {
    let sorted = Object.values(groups).reduce((acc, { name }) => {
      let filter = fields.filter((item) => (item.group || noGroup) === name)

      acc = [...acc, ...filter]
      return acc
    }, [])

    this.run(validFieldToJSON(this.fields))

    if (!set) return sorted

    this.fields = sorted
    return this
  }

  listGroupFields(group = this.groups[0], fields = this.fields) {
    return Object.values(fields).filter((item) => (item.group || noGroup) === group.name)
  }

  assembleFields(group = this.groups[0], groups = this.groups, gFields = this.listGroupFields(), fields = this.fields) {
    let newFields = Object.entries({
      [group.name]: gFields,
      ...Object.values(fields)
        .filter((item) => (item.group || noGroup) !== group.name)
        .reduce((acc, value) => {
          let group = value.group || noGroup

          acc[group] = [...(acc[group] || []), value]
          return acc
        }, {}),
    }).reduce((acc, [_, value]) => (acc = [...acc, ...value]), [])

    return this.reorder(groups, newFields, false)
  }

  getGroup(id) {
    return this.groups.find((item) => item.id === id)
  }

  getGroupByName(name) {
    return this.groups.find((item) => item.name == name)
  }

  getField(id) {
    return this.fields.find((item) => item.id === id)
  }

  getFieldByKey(key) {
    return this.fields.find((item) => (item.key = key))
  }
}

class Group {
  constructor(options) {
    this.name = options.name || noGroup

    this.id = options.index.toString() + this.name.toString()
  }

  setName(name = this.name) {
    this.name = name.toString()
  }
}

export { Global, Field, Group }
