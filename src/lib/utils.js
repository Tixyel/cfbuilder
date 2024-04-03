import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { noGroup } from '@/lib/placeholders'
import { Field, Group } from './fieldClasses'

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function convertJsonToFieldClass(json) {
  if (json) {
    return Object.entries(json)
      .reduce((acc, [key, values]) => {
        acc = [...acc, { key, ...values }]

        return acc
      }, [])
      .map((values, index) => new Field({ ...values, index }))
  } else return []
}

export function convertJsonToGroupClass(json) {
  if (json) {
    const fields = convertJsonToFieldClass(json)

    return Array.from(
      Object.entries(fields).reduce((acc, [_, field]) => {
        acc.add(field.group?.name || field?.group || undefined)

        return acc
      }, new Set()),
    ).map((group, index) => new Group({ name: group || noGroup, index }))
  } else return []
}

export function validFieldToJSON(fields) {
  if (fields) {
    return Object.values(fields)
      .map((field) => field?.getValidJson())
      .reduce((acc, [key, value]) => {
        if (key) acc[key] = value

        return acc
      }, {})
  } else return {}
}
