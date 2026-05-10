import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FaShoppingCart, FaUserCircle, FaSignOutAlt, FaTools } from 'react-icons/fa'
import { useAuth } from '../context/AuthContext'
import logo from '../assets/logo.png'

const Header = () => {
  const { usuario, cerrarSesion } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    cerrarSesion()
    toast.success('Sesión cerrada')
    navigate('/')
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-retro-cyan py-3 shadow-lg">
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img src={logo} alt="Logo" width="50" className="me-2 rounded-circle border border-dark" />
          <span className="retro-title-header">Groove & Needle</span>
        </Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navMenu">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navMenu">
          <ul className="navbar-nav ms-auto align-items-center gap-2">
            {usuario ? (
              <>
                <li className="nav-item">
                  <span className="nav-link fw-bold text-dark">
                    <FaUserCircle className="me-1" />
                    {usuario.nombre}
                  </span>
                </li>
                <li className="nav-item">
                  <Link className="nav-link fw-bold text-dark" to="/carrito">
                    <FaShoppingCart className="me-1" />
                    Carrito
                  </Link>
                </li>
                {usuario.rol === 'admin' && (
                  <li className="nav-item">
                    <Link className="nav-link fw-bold text-dark" to="/admin">
                      <FaTools className="me-1" />
                      Admin
                    </Link>
                  </li>
                )}
                <li className="nav-item">
                  <button className="btn btn-dark btn-sm ms-2" onClick={handleLogout}>
                    <FaSignOutAlt className="me-1" />
                    Salir
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link fw-bold text-dark" to="/login">
                    Iniciar sesión
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="btn btn-dark btn-sm ms-1" to="/registro">
                    Registrarse
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Header
