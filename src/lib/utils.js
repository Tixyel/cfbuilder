import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { noGroup } from '@/lib/group'

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function jsonFieldsToGroups(json) {
  return Object.values(json).reduce((acc, value) => {
    let object = { id: value.group, name: value.group }
    if (!value?.group) object = { id: noGroup, name: noGroup }

    !acc.some(({ id }) => id == object.id) && (acc = [...acc, object])

    return acc
  }, [])
}

export function jsonFieldsToFields(json) {
  return Object.entries(json).reduce((acc, [key, { type, label, value, group, options }]) => {
    acc = [...acc, { id: key, key, type, label, value, options, group }]

    return acc
  }, [])
}

export function updateJson(fields) {
  return Object.values(fields).reduce((acc, { key, type, label, value, options, group }) => {
    acc[key] = { type, label, value, options, group }

    return acc
  }, {})
}
