import { createContext } from 'react'
import type { Dictionary } from '../i18n/locales/en'

export type ToastKey = keyof Dictionary['toast']
export type ToastTone = 'success' | 'error' | 'info'

export interface ToastApi {
  notify: (key: ToastKey, tone?: ToastTone) => void
}

export const ToastContext = createContext<ToastApi | null>(null)
