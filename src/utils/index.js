export const defaultValue = (value, defaultValue) => {
  switch (value) {
    case 'null':
    case 'undefined':
    case null:
    case undefined:
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
