import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FaTrash, FaMinus, FaPlus, FaShoppingCart } from 'react-icons/fa'
import { useAuth } from '../context/AuthContext'
import { getCarrito, actualizarItem, eliminarItem, vaciarCarrito, confirmarCompra } from '../api/carrito'
import Spinner from '../components/Spinner'

const Carrito = () => {
  const { usuario } = useAuth()
  const navigate = useNavigate()

  const [carrito, setCarrito] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [procesando, setProcesando] = useState(false)

  useEffect(() => {
    if (!usuario) {
      navigate('/login')
      return
    }
    fetchCarrito()
  }, [usuario])

  const fetchCarrito = async () => {
    setIsLoading(true)
    try {
      const data = await getCarrito(usuario.token)
      setCarrito(data)
    } catch {
      toast.error('Error al cargar el carrito')
    } finally {
      setIsLoading(false)
    }
  }

  const handleActualizar = async (viniloId, nuevaCantidad) => {
    if (nuevaCantidad < 1) return
    try {
      await actualizarItem(viniloId, nuevaCantidad, usuario.token)
      fetchCarrito()
    } catch {
      toast.error('Error al actualizar cantidad')
    }
  }

  const handleEliminar = async (viniloId) => {
    try {
      await eliminarItem(viniloId, usuario.token)
      toast.success('Producto eliminado del carrito')
      fetchCarrito()
    } catch {
      toast.error('Error al eliminar producto')
    }
  }

  const handleVaciar = async () => {
    if (!window.confirm('¿Vaciar todo el carrito?')) return
    try {
      await vaciarCarrito(usuario.token)
      toast.success('Carrito vaciado')
      fetchCarrito()
    } catch {
      toast.error('Error al vaciar el carrito')
    }
  }

  const handleConfirmar = async () => {
    if (!window.confirm('¿Confirmar la compra?')) return
    setProcesando(true)
    try {
      const data = await confirmarCompra(usuario.token)
      if (data.message) {
        toast.success('¡Compra confirmada! Gracias por tu pedido.')
        fetchCarrito()
      } else {
        toast.error(data.message || 'Error al procesar la compra')
      }
    } catch {
      toast.error('Error al procesar la compra')
    } finally {
      setProcesando(false)
    }
  }

  if (isLoading) return <Spinner />

  const items = carrito?.items || []

  return (
    <div className="container my-5">
      <h2 className="retro-title text-center mb-4">
        <FaShoppingCart className="me-2" />
        Mi Carrito
      </h2>

      {items.length === 0 ? (
        <div className="text-center py-5">
          <p className="text-white-50 fs-5">Tu carrito está vacío.</p>
          <button className="btn btn-dark border-cyan mt-2" style={{ color: 'var(--neon-cyan)' }} onClick={() => navigate('/')}>
            Ver catálogo
          </button>
        </div>
      ) : (
        <>
          <div className="table-responsive">
            <table className="table table-dark table-borderless align-middle">
              <thead>
                <tr className="border-bottom border-secondary">
                  <th>Álbum</th>
                  <th>Precio unit.</th>
                  <th>Cantidad</th>
                  <th>Subtotal</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => {
                  const vinilo = item.vinilo
                  const viniloId = typeof vinilo === 'object' ? vinilo._id : vinilo
                  const titulo = typeof vinilo === 'object' ? vinilo.titulo : 'Vinilo'
                  const imagen = typeof vinilo === 'object' ? vinilo.imagen : ''
                  return (
                    <tr key={viniloId} className="border-bottom border-secondary">
                      <td>
                        <div className="d-flex align-items-center gap-3">
                          {imagen && (
                            <img src={imagen} alt={titulo} style={{ width: '55px', height: '55px', objectFit: 'contain' }} />
                          )}
                          <span>{titulo}</span>
                        </div>
                      </td>
                      <td>${item.precioUnitario} MXN</td>
                      <td>
                        <div className="d-flex align-items-center gap-2">
                          <button className="btn btn-sm btn-outline-secondary" onClick={() => handleActualizar(viniloId, item.cantidad - 1)}>
                            <FaMinus />
                          </button>
                          <span className="px-2">{item.cantidad}</span>
                          <button className="btn btn-sm btn-outline-secondary" onClick={() => handleActualizar(viniloId, item.cantidad + 1)}>
                            <FaPlus />
                          </button>
                        </div>
                      </td>
                      <td>${(item.precioUnitario * item.cantidad).toLocaleString('es-MX')} MXN</td>
                      <td>
                        <button className="btn btn-sm btn-outline-danger" onClick={() => handleEliminar(viniloId)}>
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          <div className="d-flex justify-content-between align-items-center mt-4 flex-wrap gap-3">
            <button className="btn btn-outline-secondary" onClick={handleVaciar}>
              Vaciar carrito
            </button>
            <div className="text-end">
              <p className="fs-4 fw-bold mb-2" style={{ color: 'var(--neon-cyan)' }}>
                Total: ${carrito?.total?.toLocaleString('es-MX') || 0} MXN
              </p>
              <button
                className="btn btn-dark border-cyan fw-bold px-4"
                style={{ color: 'var(--neon-cyan)' }}
                onClick={handleConfirmar}
                disabled={procesando}
              >
                {procesando ? 'Procesando...' : 'CONFIRMAR COMPRA'}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Carrito
