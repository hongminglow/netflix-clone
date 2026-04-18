import { useCallback } from 'react'
import { useStore } from '../store'

export function useMyList(profileId: string) {
  const { myLists, addToList, removeFromList } = useStore()
  const ids = myLists[profileId] || []

  const has = useCallback((id: string) => ids.includes(id), [ids])

  const toggle = useCallback(
    (id: string) => {
      if (has(id)) removeFromList(profileId, id)
      else addToList(profileId, id)
    },
    [has, profileId, removeFromList, addToList],
  )

  const remove = useCallback((id: string) => removeFromList(profileId, id), [profileId, removeFromList])

  return { ids, has, toggle, remove }
}

