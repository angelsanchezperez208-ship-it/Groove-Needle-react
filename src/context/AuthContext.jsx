import { createContext, useContext, useState } from 'react'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(() => {
    try {
      const saved = localStorage.getItem('usuario_gn')
      return saved ? JSON.parse(saved) : null
    } catch {
      return null
    }
  })

  const guardarUsuario = (data) => {
    localStorage.setItem('usuario_gn', JSON.stringify(data))
    setUsuario(data)
  }

  const cerrarSesion = () => {
    localStorage.removeItem('usuario_gn')
    setUsuario(null)
  }

  return (
    <AuthContext.Provider value={{ usuario, guardarUsuario, cerrarSesion }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
