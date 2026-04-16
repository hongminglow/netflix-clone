import { useCallback, useEffect, useState } from 'react'

type Setter<T> = (next: T | ((prev: T) => T)) => void

export function useLocalStorageState<T>(key: string, initial: T): [T, Setter<T>] {
  const read = useCallback((): T => {
    const raw = window.localStorage.getItem(key)
    if (!raw) return initial
    try {
      return JSON.parse(raw) as T
    } catch {
      return initial
    }
  }, [initial, key])

  const [value, setValue] = useState<T>(() => read())

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key !== key) return
      setValue(read())
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [key, read])

  const set: Setter<T> = useCallback((next) => {
    setValue((prev) => (typeof next === 'function' ? (next as any)(prev) : next))
  }, [])

  return [value, set]
}

