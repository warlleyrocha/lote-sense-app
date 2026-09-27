import { useSyncExternalStore } from 'react'
import { defaultReference, type References } from './constants'

// Condições de referência escolhidas pelo produtor, guardadas no aparelho até existir API.
const STORAGE_KEY = 'lotesense:reference'

function load(): References {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) return { ...defaultReference, ...(JSON.parse(stored) as Partial<References>) }
  } catch {
    // Armazenamento indisponível ou valor corrompido: segue com o padrão.
  }
  return defaultReference
}

let current = load()
const listeners = new Set<() => void>()

export const getReference = () => current

export function setReference(next: References) {
  current = next
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  } catch {
    // Sem persistência, a mudança vale só para esta sessão.
  }
  listeners.forEach((listener) => listener())
}

export const resetReference = () => setReference(defaultReference)

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export const useReference = () => useSyncExternalStore(subscribe, getReference)
