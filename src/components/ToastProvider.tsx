import { useCallback, useMemo, useRef, useState, type ReactNode } from 'react'
import { useI18n } from '../i18n/useI18n'
import { Icon } from './Icon'
import { ToastContext, type ToastKey, type ToastTone } from './toastContext'


interface Toast {
  id: number
  /** Stored as a key so an open toast re-translates when the language changes. */
  key: ToastKey
  tone: ToastTone
}


const TOAST_MS = 5000

export function ToastProvider({ children }: { children: ReactNode }) {
  const { t } = useI18n()
  const [toasts, setToasts] = useState<Toast[]>([])
  const nextId = useRef(1)

  const dismiss = useCallback((id: number) => {
    setToasts((list) => list.filter((toast) => toast.id !== id))
  }, [])

  const notify = useCallback(
    (key: ToastKey, tone: ToastTone = 'success') => {
      const id = nextId.current++
      // Keep at most three toasts on screen.
      setToasts((list) => [...list.slice(-2), { id, key, tone }])
      window.setTimeout(() => dismiss(id), TOAST_MS)
    },
    [dismiss],
  )

  const api = useMemo(() => ({ notify }), [notify])

  return (
    <ToastContext.Provider value={api}>
      {children}
      <div className="toast-region" role="status" aria-live="polite" aria-label={t.a11y.notifications}>
        {toasts.map((toast) => (
          <div key={toast.id} className={`toast toast-${toast.tone}`}>
            <Icon name={toast.tone === 'error' ? 'alert' : toast.tone === 'info' ? 'info' : 'check'} />
            <p>{t.toast[toast.key]}</p>
            <button type="button" className="toast-close" onClick={() => dismiss(toast.id)} aria-label={t.a11y.dismiss}>
              <Icon name="close" size={16} />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}
