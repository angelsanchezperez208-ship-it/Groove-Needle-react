const ModalVinilo = ({ vinilo, cerrarModal }) => {
  if (!vinilo) return null; // Medida de seguridad por si no hay vinilo seleccionado

  return (
    <div className="modal show fade d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.8)' }}>
      <div className="modal-dialog modal-xl modal-dialog-centered">
        <div className="modal-content bg-dark text-white border-magenta shadow-lg">
          <div className="modal-header border-bottom border-secondary">
            <h5 className="modal-title retro-title text-magenta">Detalles del Álbum</h5>
            {/* Usamos la función cerrarModal al hacer clic */}
            <button type="button" className="btn-close btn-close-white" onClick={cerrarModal}></button>
          </div>
          <div className="modal-body">
            <div className="row p-3">
              <div className="col-md-6 d-flex justify-content-center align-items-center mb-4 p-3">
                <img src={vinilo.imagen} className="img-fluid rounded border-cyan shadow-lg" style={{ maxHeight: '400px', objectFit: 'contain' }} alt={vinilo.album} />
              </div>
              <div className="col-md-6">
                <h2 className="retro-title text-magenta">{vinilo.album}</h2>
                <p className="fs-5">Tienda: <span className="text-cyan">{vinilo.artista}</span></p>
                <hr className="border-secondary" />
                <h3 className="text-white mb-0">{vinilo.precio}</h3>
                <p className="text-danger fw-bold mt-2 fs-5">Fuera de Stock.</p>
                <div className="bg-black p-3 border border-secondary rounded mt-4">
                  <p className="mb-1"><strong>Género:</strong> {vinilo.genero}</p>
                  <p className="mb-1"><strong>Año:</strong> {vinilo.anio}</p>
                  <p className="small text-white-50 mt-2">{vinilo.descripcion}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModalVinilo