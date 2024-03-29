import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { noGroup } from '@/lib/group'
import { fieldTypes } from './fieldTypes'

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function jsonFieldsToGroups(json) {
  return Array.from(
    Object.values(json)
      .reduce((acc, field) => {
        typeof field == 'object' && acc.add(field?.group?.name || field?.group || noGroup)

        return acc
      }, new Set())
      .keys(),
  ).map((group) => {
    return {
      id: group,
      name: group,
    }
  })
}

export function jsonFieldsToFields(json, groups = jsonFieldsToGroups(json)) {
  return Object.entries(json).reduce((acc, [key, field]) => {
    if (field) {
      let { type, label, value, group, options, min, max, step } = field

      acc = [
        ...acc,
        {
          id: field.key || key,
          key: field.key || key,
          type,
          label,
          value,
          options,
          min,
          max,
          step,
          group: groups.find(({ name }) => name == group || (name == noGroup && !group)),
        },
      ]
    }

    return acc
  }, [])
}

export function updateJson(fields) {
  return Object.values(fields).reduce((acc, { key, type, label, value, options, group, min, max, step }) => {
    acc[key] = {
      type,
      label,
      value: Object.keys(fieldTypes).some((t) => t == type) ? fieldTypes[type](value) : value.toString(),
      options,
      min,
      max,
      step,
      group: group.name == noGroup ? undefined : group.name,
    }

    return acc
  }, {})
}

export function concatJson(group, groups, values, fields) {
  return Object.entries({
    [group.name]: values,
    ...Object.values(fields)
      .filter((item) => {
        return item?.group?.id != group.id || (group.id == noGroup && !item?.group?.id)
      })
      .reduce((acc, value) => {
        let name = value.group?.name || noGroup

        acc[name] = [...(acc[name] || []), value]

        return acc
      }, {}),
  })
    .sort(([a], [b]) => groups.findIndex(({ id }) => id == a) - groups.findIndex(({ id }) => id == b))
    .reduce((acc, [_, value]) => (acc = [...acc, ...value]), [])
}

export function reorderGroupsInJson(groups, fields) {
  return Object.values(groups).reduce((acc, { id }) => {
    acc = [...acc, ...fields.filter((item) => (item.group?.id || noGroup) == id)]

    return acc
  }, [])
}
