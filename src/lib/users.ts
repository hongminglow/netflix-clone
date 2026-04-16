export type User = {
  id: string
  email: string
  password: string
  createdAt: number
}

const key = 'nf.users'

function uid() {
  return `u_${Math.random().toString(16).slice(2)}_${Date.now().toString(16)}`
}

export function getUsers(): User[] {
  const raw = window.localStorage.getItem(key)
  if (!raw) return []
  try {
    const parsed = JSON.parse(raw) as User[]
    if (!Array.isArray(parsed)) return []
    return parsed
  } catch {
    return []
  }
}

export function setUsers(next: User[]) {
  window.localStorage.setItem(key, JSON.stringify(next))
}

export function findUserByEmail(email: string) {
  const e = email.trim().toLowerCase()
  return getUsers().find((u) => u.email.toLowerCase() === e) ?? null
}

export function createUser(email: string, password: string): User {
  const e = email.trim().toLowerCase()
  const users = getUsers()
  const u: User = { id: uid(), email: e, password, createdAt: Date.now() }
  setUsers([u, ...users])
  return u
}

export function verifyUser(email: string, password: string) {
  const u = findUserByEmail(email)
  if (!u) return null
  if (u.password !== password) return null
  return u
}

