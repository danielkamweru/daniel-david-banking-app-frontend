import { AuthProvider } from './context/AuthContext'
import { NotificationProvider } from './context/NotificationContext'
import AppRouter from './router/AppRouter'
import { ToastProvider } from './context/ToastContext'

function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <ToastProvider>
          <AppRouter />
        </ToastProvider>
      </NotificationProvider>
    </AuthProvider>
  )
}

export default App
