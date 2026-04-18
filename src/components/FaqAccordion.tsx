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
              <span 
                className="faqQIcon" 
                aria-hidden="true"
                style={{
                  transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                  transition: 'transform 0.25s ease'
                }}
              >
                <svg viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 4v16m-8-8h16"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                </svg>
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

