import { useState, useEffect } from 'react'
import Header from './components/Header'
import VinilosGrid from './components/VinilosGrid'
import ModalVinilo from './components/ModalVinilo'
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
        <ModalVinilo 
          vinilo={viniloSeleccionado} 
          cerrarModal={() => setViniloSeleccionado(null)} 
        />
      )}
    </>
  )
}

export default App