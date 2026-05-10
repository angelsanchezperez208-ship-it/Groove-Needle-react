import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { login } from '../api/usuarios'
import { useAuth } from '../context/AuthContext'

const Login = () => {
  const navigate = useNavigate()
  const { usuario, guardarUsuario } = useAuth()

  const [formData, setFormData] = useState({ email: '', password: '' })
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (usuario) navigate('/')
  }, [usuario, navigate])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const data = await login(formData)
      if (data.token) {
        guardarUsuario(data)
        toast.success(`¡Bienvenido, ${data.nombre}!`)
        navigate('/')
      } else {
        toast.error(data.message || 'Credenciales incorrectas')
      }
    } catch {
      toast.error('Error al conectar con el servidor')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="bg-black p-4 rounded border border-magenta shadow-lg">
            <h3 className="retro-title text-center mb-4">Iniciar Sesión</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Correo electrónico</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="correo@ejemplo.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Contraseña</label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <button
                type="submit"
                className="btn btn-dark w-100 border-cyan fw-bold mt-2"
                style={{ color: 'var(--neon-cyan)' }}
                disabled={isLoading}
              >
                {isLoading ? 'Ingresando...' : 'ENTRAR'}
              </button>
            </form>
            <p className="text-center text-white-50 mt-3 mb-0">
              ¿No tienes cuenta?{' '}
              <Link to="/registro" style={{ color: 'var(--neon-cyan)' }}>
                Regístrate
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
