import { useEffect, type ReactNode } from 'react'

type Props = {
  open: boolean
  title?: string
  onClose: () => void
  children: ReactNode
}

export function Modal({ open, title, onClose, children }: Props) {
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose, open])

  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  if (!open) return null

  return (
    <div className="nfModal" role="dialog" aria-modal="true" aria-label={title}>
      <button className="nfModalBackdrop" onClick={onClose} aria-label="Close" />
      <div className="nfModalPanel">
        <button className="nfModalClose" onClick={onClose} aria-label="Close">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M6.3 5l12.7 12.7-1.3 1.3L5 6.3 6.3 5Zm12.7 1.3L6.3 19 5 17.7 17.7 5l1.3 1.3Z"
              fill="currentColor"
            />
          </svg>
        </button>
        {children}
      </div>
    </div>
  )
}
