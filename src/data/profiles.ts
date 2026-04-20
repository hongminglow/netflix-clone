import { image } from '@/data/catalog'

export type Profile = { id: string; name: string; avatarUrl: string }

export const defaultProfiles: Profile[] = [
  {
    id: 'p1',
    name: 'Alex',
    avatarUrl: image(
      'minimal avatar, friendly face, bold color blocks, soft shading, dark background, high contrast, no text, square crop',
      'square',
    ),
  },
  {
    id: 'p2',
    name: 'Sam',
    avatarUrl: image(
      'minimal avatar, profile portrait, warm highlights, dark background, graphic style, no text, square crop',
      'square',
    ),
  },
  {
    id: 'p3',
    name: 'Kids',
    avatarUrl: image(
      'minimal avatar, playful mascot character, bright colors, dark background, simple shapes, no text, square crop',
      'square',
    ),
  },
  {
    id: 'p4',
    name: 'Guest',
    avatarUrl: image(
      'minimal avatar, calm neutral portrait, monochrome with red accent, dark background, no text, square crop',
      'square',
    ),
  },
]
