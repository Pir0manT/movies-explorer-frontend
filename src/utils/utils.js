export const convertDuration = (duration) => {
  const hours = Math.trunc(duration / 60)
  const minutes = duration % 60
  const resultTime = []

  if (hours) resultTime.push(`${hours}ч`)
  if (minutes) resultTime.push(`${minutes}м`)

  return resultTime.join(' ')
}

export const apiEmulator = (isFail = false) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (isFail) reject(new Error('ошибка api.'))
      resolve('успех')
    }, 500)
  })
}
