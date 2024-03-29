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
        acc.add(field.group || noGroup)

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
  return Object.entries(json).reduce((acc, [key, { type, label, value, group, options, min, max, step }]) => {
    acc = [
      ...acc,
      { id: key, key, type, label, value, options, min, max, step, group: groups.find(({ name }) => name == group || (name == noGroup && !group)) },
    ]

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
      .filter((item) => item.group.id != group.id || (group.id == noGroup && !item.group.id))
      .reduce((acc, value) => {
        let name = value.group.name

        acc[name] = [...(acc[name] || []), value]

        return acc
      }, {}),
  })
    .sort(([a], [b]) => groups.findIndex(({ id }) => id == a) - groups.findIndex(({ id }) => id == b))
    .reduce((acc, [_, value]) => (acc = [...acc, ...value]), [])
}

export function reorderGroupsInJson(values, fields) {
  return Object.values(values).reduce((acc, { id }) => {
    acc = [...acc, ...fields.filter((item) => (item.group.id || noGroup) == id)]

    return acc
  }, [])
}
