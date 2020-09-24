export const defaultValue = (value, defaultValue) => {
  switch (value) {
    case 'null':
    case 'undefined':
    case null:
    case undefined:
    case '':
      return defaultValue
    default:
      return value
  }
}

export const formatSize = (size) => {
  if (typeof size !== 'number') size = NaN
  let count = 0
  while (size >= 1024) {
    size /= 1024
    count++
  }
  size = size.toFixed(2)
  size += [' B', ' KB', ' MB', ' GB', ' TB'][count]
  return size
}

export const trim = (str, char, type) => {
  if (char) {
    if (type === 'left') {
      return str.replace(new RegExp('^\\' + char + '+', 'g'), '')
    } else if (type === 'right') {
      return str.replace(new RegExp('\\' + char + '+$', 'g'), '')
    }
    return str.replace(new RegExp('^\\' + char + '+|\\' + char + '+$', 'g'), '')
  }
  return str.replace(/^\s+|\s+$/g, '')
}

export const isEmpty = (obj) => [Object, Array].includes((obj || {}).constructor) && !Object.entries(obj || {}).length
