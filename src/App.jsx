import { useState, useEffect } from 'react'
import Header from './components/Header'
import VinilosGrid from './components/VinilosGrid'
import ModalVinilo from './components/ModalVinilo'
import FormularioContacto from './components/FormularioContacto'
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

  return (
    <>
      <Header busqueda={busqueda} setBusqueda={setBusqueda} />
      
      <VinilosGrid 
        items={vinilosFiltrados} 
        isLoading={isLoading} 
        setViniloSeleccionado={setViniloSeleccionado} 
      />

      <FormularioContacto />

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