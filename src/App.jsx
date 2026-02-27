import { useState, useEffect } from 'react'
import Header from './components/Header'
import VinilosGrid from './components/VinilosGrid'
import './index.css'

function App() {
  const [vinilos, setVinilos] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [busqueda, setBusqueda] = useState('')
  const [viniloSeleccionado, setViniloSeleccionado] = useState(null)

  useEffect(() => {
    setTimeout(() => {
      fetch('/vinilo.json')
        .then(response => response.json())
        .then(data => {
          setVinilos(data)
          setIsLoading(false)
        })
        .catch(error => console.error("Error:", error))
    }, 500)
  }, [])

  const vinilosFiltrados = vinilos.filter(v =>
    v.album.toLowerCase().includes(busqueda.toLowerCase()) ||
    v.artista.toLowerCase().includes(busqueda.toLowerCase())
  )

  const enviarMensaje = (e) => {
    e.preventDefault()
    alert("¡Mensaje enviado con éxito! Te contactaremos pronto.")
    e.target.reset()
  }

  return (
    <>
      <Header busqueda={busqueda} setBusqueda={setBusqueda} />
      
      <VinilosGrid 
        items={vinilosFiltrados} 
        isLoading={isLoading} 
        setViniloSeleccionado={setViniloSeleccionado} 
      />

      <div className="container my-5 pb-5 border-top border-secondary pt-5">
        <h3 className="retro-title text-center mb-4" style={{ color: 'var(--neon-cyan)', textShadow: '0 0 10px var(--neon-cyan)' }}>¿Buscas un vinilo en especial?</h3>
        <div className="row justify-content-center">
          <div className="col-md-6">
            <form onSubmit={enviarMensaje} className="bg-black p-4 rounded border border-magenta shadow-lg">
              <div className="mb-3">
                <label className="form-label text-white">Tu Nombre</label>
                <input type="text" className="form-control bg-dark text-white border-secondary" placeholder="Ej. Gustavo Cerati" pattern="[A-Za-zÀ-ÿ\s]+" required />
              </div>
              <div className="mb-3">
                <label className="form-label text-white">Tu Correo</label>
                <input type="email" className="form-control bg-dark text-white border-secondary" placeholder="correo@ejemplo.com" required />
              </div>
              <div className="mb-3">
                <label className="form-label text-white">Mensaje / Álbum que buscas</label>
                <textarea className="form-control bg-dark text-white border-secondary" rows="3" required></textarea>
              </div>
              <button type="submit" className="btn btn-dark w-100 border-cyan fw-bold" style={{ color: 'var(--neon-cyan)' }}>ENVIAR MENSAJE</button>
            </form>
          </div>
        </div>
      </div>

      {viniloSeleccionado && (
        <div className="modal show fade d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.8)' }}>
          <div className="modal-dialog modal-xl modal-dialog-centered">
            <div className="modal-content bg-dark text-white border-magenta shadow-lg">
              <div className="modal-header border-bottom border-secondary">
                <h5 className="modal-title retro-title text-magenta">Detalles del Álbum</h5>
                <button type="button" className="btn-close btn-close-white" onClick={() => setViniloSeleccionado(null)}></button>
              </div>
              <div className="modal-body">
                <div className="row p-3">
                  <div className="col-md-6 d-flex justify-content-center align-items-center mb-4 p-3">
                    <img src={viniloSeleccionado.imagen} className="img-fluid rounded border-cyan shadow-lg" style={{ maxHeight: '400px', objectFit: 'contain' }} alt={viniloSeleccionado.album} />
                  </div>
                  <div className="col-md-6">
                    <h2 className="retro-title text-magenta">{viniloSeleccionado.album}</h2>
                    <p className="fs-5">Tienda: <span className="text-cyan">{viniloSeleccionado.artista}</span></p>
                    <hr className="border-secondary" />
                    <h3 className="text-white mb-0">{viniloSeleccionado.precio}</h3>
                    <p className="text-danger fw-bold mt-2 fs-5">Fuera de Stock.</p>
                    <div className="bg-black p-3 border border-secondary rounded mt-4">
                      <p className="mb-1"><strong>Género:</strong> {viniloSeleccionado.genero}</p>
                      <p className="mb-1"><strong>Año:</strong> {viniloSeleccionado.anio}</p>
                      <p className="small text-white-50 mt-2">{viniloSeleccionado.descripcion}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default App