import { useCallback } from 'react'
import { useLocalStorageState } from './useLocalStorageState'

export function useMyList(profileId: string) {
  const [ids, setIds] = useLocalStorageState<string[]>(`nf.myList.${profileId}`, [])

  const has = useCallback((id: string) => ids.includes(id), [ids])

  const toggle = useCallback(
    (id: string) => {
      setIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [id, ...prev]))
    },
    [setIds],
  )

  const remove = useCallback((id: string) => setIds((prev) => prev.filter((x) => x !== id)), [setIds])

  return { ids, has, toggle, remove }
}

