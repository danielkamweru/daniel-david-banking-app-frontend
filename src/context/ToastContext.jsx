import { createContext, useContext, useState, useCallback } from 'react'

const ToastContext = createContext(null)

export const useToast = () => {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within ToastProvider')
  return ctx
}

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([])

  const remove = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }, [])

  const showToast = useCallback(({ title = 'Success', message = '', type = 'success', duration = 3000 }) => {
    const id = Date.now() + Math.random()
    setToasts(prev => [...prev, { id, title, message, type }])
    setTimeout(() => remove(id), duration)
  }, [remove])

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div style={{ position: 'fixed', top: 16, right: 16, zIndex: 9999 }}>
        {toasts.map(t => (
          <div key={t.id}
               style={{
                 marginBottom: 10,
                 minWidth: 280,
                 maxWidth: 360,
                 background: 'rgba(15,23,42,0.95)',
                 border: '1px solid rgba(255,255,255,0.12)',
                 color: '#fff',
                 borderRadius: 12,
                 boxShadow: '0 10px 30px rgba(0,0,0,0.25)'
               }}>
            <div style={{ padding: '10px 14px' }}>
              <div style={{ fontWeight: 600, color: t.type === 'success' ? '#64FFDA' : t.type === 'error' ? '#f87171' : '#60a5fa' }}>{t.title}</div>
              {t.message && <div style={{ fontSize: 14, opacity: 0.9, marginTop: 4 }}>{t.message}</div>}
            </div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}
