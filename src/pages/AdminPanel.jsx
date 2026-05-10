import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FaEdit, FaTrash, FaPlus, FaTimes } from 'react-icons/fa'
import { useAuth } from '../context/AuthContext'
import { getVinilos, crearVinilo, actualizarVinilo, eliminarVinilo } from '../api/vinilos'
import Spinner from '../components/Spinner'

const FORM_VACIO = { titulo: '', artista: '', genero: '', anio: '', precio: '', imagen: '', stock: '', descripcion: '' }

const AdminPanel = () => {
  const { usuario } = useAuth()
  const navigate = useNavigate()

  const [vinilos, setVinilos] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [form, setForm] = useState(FORM_VACIO)
  const [editandoId, setEditandoId] = useState(null)
  const [mostrarForm, setMostrarForm] = useState(false)
  const [guardando, setGuardando] = useState(false)

  useEffect(() => {
    if (!usuario) { navigate('/login'); return }
    if (usuario.rol !== 'admin') { navigate('/'); return }
    fetchVinilos()
  }, [usuario])

  const fetchVinilos = async () => {
    setIsLoading(true)
    try {
      const data = await getVinilos()
      setVinilos(data)
    } catch {
      toast.error('Error al cargar los vinilos')
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const abrirCrear = () => {
    setForm(FORM_VACIO)
    setEditandoId(null)
    setMostrarForm(true)
  }

  const abrirEditar = (vinilo) => {
    setForm({
      titulo: vinilo.titulo || '',
      artista: vinilo.artista || '',
      genero: vinilo.genero || '',
      anio: vinilo.anio || '',
      precio: vinilo.precio || '',
      imagen: vinilo.imagen || '',
      stock: vinilo.stock || '',
      descripcion: vinilo.descripcion || '',
    })
    setEditandoId(vinilo._id)
    setMostrarForm(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setGuardando(true)
    try {
      const datos = {
        ...form,
        anio: Number(form.anio),
        precio: Number(form.precio),
        stock: Number(form.stock),
      }
      if (editandoId) {
        await actualizarVinilo(editandoId, datos, usuario.token)
        toast.success('Vinilo actualizado')
      } else {
        await crearVinilo(datos, usuario.token)
        toast.success('Vinilo creado')
      }
      setMostrarForm(false)
      fetchVinilos()
    } catch {
      toast.error('Error al guardar el vinilo')
    } finally {
      setGuardando(false)
    }
  }

  const handleEliminar = async (id) => {
    if (!window.confirm('¿Eliminar este vinilo?')) return
    try {
      await eliminarVinilo(id, usuario.token)
      toast.success('Vinilo eliminado')
      fetchVinilos()
    } catch {
      toast.error('Error al eliminar')
    }
  }

  if (isLoading) return <Spinner />

  return (
    <div className="container my-5">
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
        <h2 className="retro-title mb-0">Panel de Administración</h2>
        <button className="btn btn-dark border-cyan fw-bold" style={{ color: 'var(--neon-cyan)' }} onClick={abrirCrear}>
          <FaPlus className="me-2" />Nuevo Vinilo
        </button>
      </div>

      {mostrarForm && (
        <div className="bg-black p-4 rounded border border-magenta mb-4 shadow-lg">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="retro-title mb-0">{editandoId ? 'Editar Vinilo' : 'Nuevo Vinilo'}</h5>
            <button className="btn btn-sm btn-outline-secondary" onClick={() => setMostrarForm(false)}>
              <FaTimes />
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Título *</label>
                <input name="titulo" className="form-control" value={form.titulo} onChange={handleChange} required />
              </div>
              <div className="col-md-6">
                <label className="form-label">Artista *</label>
                <input name="artista" className="form-control" value={form.artista} onChange={handleChange} required />
              </div>
              <div className="col-md-4">
                <label className="form-label">Género</label>
                <input name="genero" className="form-control" value={form.genero} onChange={handleChange} />
              </div>
              <div className="col-md-4">
                <label className="form-label">Año</label>
                <input name="anio" type="number" className="form-control" value={form.anio} onChange={handleChange} />
              </div>
              <div className="col-md-4">
                <label className="form-label">Precio (MXN) *</label>
                <input name="precio" type="number" className="form-control" value={form.precio} onChange={handleChange} required min="0" />
              </div>
              <div className="col-md-4">
                <label className="form-label">Stock</label>
                <input name="stock" type="number" className="form-control" value={form.stock} onChange={handleChange} min="0" />
              </div>
              <div className="col-md-8">
                <label className="form-label">URL de imagen</label>
                <input name="imagen" className="form-control" value={form.imagen} onChange={handleChange} placeholder="https://..." />
              </div>
              <div className="col-12">
                <label className="form-label">Descripción</label>
                <textarea name="descripcion" className="form-control" rows="2" value={form.descripcion} onChange={handleChange} />
              </div>
            </div>
            <button type="submit" className="btn btn-dark border-cyan fw-bold mt-3 px-4" style={{ color: 'var(--neon-cyan)' }} disabled={guardando}>
              {guardando ? 'Guardando...' : editandoId ? 'ACTUALIZAR' : 'CREAR'}
            </button>
          </form>
        </div>
      )}

      <div className="table-responsive">
        <table className="table table-dark table-hover align-middle">
          <thead>
            <tr className="border-bottom border-secondary">
              <th>Imagen</th>
              <th>Título</th>
              <th>Artista</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {vinilos.map((v) => (
              <tr key={v._id} className="border-bottom border-secondary">
                <td>
                  <img src={v.imagen} alt={v.titulo} style={{ width: '50px', height: '50px', objectFit: 'contain' }} />
                </td>
                <td>{v.titulo}</td>
                <td>{v.artista}</td>
                <td>${v.precio} MXN</td>
                <td>
                  <span className={`badge ${v.stock > 0 ? 'bg-success' : 'bg-danger'}`}>
                    {v.stock > 0 ? v.stock : 'Agotado'}
                  </span>
                </td>
                <td>
                  <div className="d-flex gap-2">
                    <button className="btn btn-sm btn-outline-warning" onClick={() => abrirEditar(v)}>
                      <FaEdit />
                    </button>
                    <button className="btn btn-sm btn-outline-danger" onClick={() => handleEliminar(v._id)}>
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AdminPanel
