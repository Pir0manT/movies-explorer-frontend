import { useCallback, useRef } from 'react'

export function useDebouncedFunction(func, delay = 400) {
  const ref = useRef(null)

  return useCallback(
    (...args) => {
      clearTimeout(ref.current)
      ref.current = setTimeout(() => func(...args), delay)
    },
    [func, delay]
  )
}
