import { useId, useState } from 'react'

type Item = {
  question: string
  answer: string
}

type Props = {
  items: Item[]
}

export function FaqAccordion({ items }: Props) {
  const baseId = useId()
  const [open, setOpen] = useState<number | null>(0)

  return (
    <ul className="faqList">
      {items.map((it, idx) => {
        const isOpen = open === idx
        const panelId = `${baseId}_${idx}_panel`
        const buttonId = `${baseId}_${idx}_button`

        return (
          <li key={panelId} className={`faqItem ${isOpen ? 'isOpen' : ''}`}>
            <button
              id={buttonId}
              className="faqQ"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => setOpen((v) => (v === idx ? null : idx))}
              type="button"
            >
              <span className="faqQText">{it.question}</span>
              <span className="faqQIcon" aria-hidden="true">
                {isOpen ? (
                  <svg viewBox="0 0 24 24">
                    <path
                      d="M6.3 5l12.7 12.7-1.3 1.3L5 6.3 6.3 5Zm12.7 1.3L6.3 19 5 17.7 17.7 5l1.3 1.3Z"
                      fill="currentColor"
                    />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24">
                    <path
                      d="M12 5v14m-7-7h14"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                )}
              </span>
            </button>
            <div
              id={panelId}
              className="faqA"
              role="region"
              aria-labelledby={buttonId}
            >
              <div className="faqAInner">{it.answer}</div>
            </div>
          </li>
        )
      })}
    </ul>
  )
}

