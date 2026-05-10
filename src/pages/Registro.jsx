import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { registrar } from '../api/usuarios'
import { useAuth } from '../context/AuthContext'

const Registro = () => {
  const navigate = useNavigate()
  const { usuario, guardarUsuario } = useAuth()

  const [formData, setFormData] = useState({ nombre: '', email: '', password: '' })
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
      const data = await registrar(formData)
      if (data.token) {
        guardarUsuario(data)
        toast.success('¡Cuenta creada con éxito!')
        navigate('/')
      } else {
        toast.error(data.message || 'Error al registrar cuenta')
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
            <h3 className="retro-title text-center mb-4">Crear Cuenta</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Nombre</label>
                <input
                  type="text"
                  name="nombre"
                  className="form-control"
                  placeholder="Tu nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  required
                />
              </div>
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
                  minLength={6}
                />
              </div>
              <button
                type="submit"
                className="btn btn-dark w-100 border-cyan fw-bold mt-2"
                style={{ color: 'var(--neon-cyan)' }}
                disabled={isLoading}
              >
                {isLoading ? 'Registrando...' : 'REGISTRARSE'}
              </button>
            </form>
            <p className="text-center text-white-50 mt-3 mb-0">
              ¿Ya tienes cuenta?{' '}
              <Link to="/login" style={{ color: 'var(--neon-cyan)' }}>
                Inicia sesión
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Registro
