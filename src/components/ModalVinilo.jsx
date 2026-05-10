import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FaShoppingCart } from 'react-icons/fa'
import { useAuth } from '../context/AuthContext'
import { agregarItem } from '../api/carrito'

const ModalVinilo = ({ vinilo, cerrarModal }) => {
  const { usuario } = useAuth()
  const navigate = useNavigate()
  const [agregando, setAgregando] = useState(false)

  if (!vinilo) return null

  const precio = typeof vinilo.precio === 'number'
    ? `$${vinilo.precio.toLocaleString('es-MX')} MXN`
    : vinilo.precio

  const hayStock = vinilo.stock > 0

  const handleAgregarAlCarrito = async () => {
    if (!usuario) {
      toast.info('Inicia sesión para agregar al carrito')
      navigate('/login')
      return
    }
    setAgregando(true)
    try {
      await agregarItem(vinilo._id, 1, usuario.token)
      toast.success(`"${vinilo.titulo}" agregado al carrito`)
    } catch {
      toast.error('Error al agregar al carrito')
    } finally {
      setAgregando(false)
    }
  }

  return (
    <div className="modal show fade d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.8)' }}>
      <div className="modal-dialog modal-xl modal-dialog-centered">
        <div className="modal-content bg-dark text-white border-magenta shadow-lg">
          <div className="modal-header border-bottom border-secondary">
            <h5 className="modal-title retro-title text-magenta">Detalles del Álbum</h5>
            <button type="button" className="btn-close btn-close-white" onClick={cerrarModal}></button>
          </div>
          <div className="modal-body">
            <div className="row p-3">
              <div className="col-md-6 d-flex justify-content-center align-items-center mb-4 p-3">
                <img
                  src={vinilo.imagen}
                  className="img-fluid rounded border-cyan shadow-lg"
                  style={{ maxHeight: '400px', objectFit: 'contain' }}
                  alt={vinilo.titulo}
                />
              </div>
              <div className="col-md-6">
                <h2 className="retro-title text-magenta">{vinilo.titulo}</h2>
                <p className="fs-5">Artista: <span className="text-cyan">{vinilo.artista}</span></p>
                <hr className="border-secondary" />
                <h3 className="text-white mb-0">{precio}</h3>

                {hayStock ? (
                  <p className="text-success fw-bold mt-2 fs-5">
                    En Stock ({vinilo.stock} disponibles)
                  </p>
                ) : (
                  <p className="text-danger fw-bold mt-2 fs-5">Agotado</p>
                )}

                <div className="bg-black p-3 border border-secondary rounded mt-3">
                  <p className="mb-1"><strong>Género:</strong> {vinilo.genero}</p>
                  <p className="mb-1"><strong>Año:</strong> {vinilo.anio}</p>
                  <p className="small text-white-50 mt-2">{vinilo.descripcion}</p>
                </div>

                <button
                  className="btn btn-dark border-cyan fw-bold w-100 mt-4"
                  style={{ color: 'var(--neon-cyan)' }}
                  onClick={handleAgregarAlCarrito}
                  disabled={!hayStock || agregando}
                >
                  <FaShoppingCart className="me-2" />
                  {agregando ? 'Agregando...' : hayStock ? 'AGREGAR AL CARRITO' : 'SIN STOCK'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModalVinilo
