const ViniloItem = ({ vinilo, setViniloSeleccionado }) => {
  const precio = typeof vinilo.precio === 'number'
    ? `$${vinilo.precio.toLocaleString('es-MX')} MXN`
    : vinilo.precio

  return (
    <div className="col">
      <div className="flip-card" onClick={() => setViniloSeleccionado(vinilo)}>
        <div className="flip-card-inner">
          <div className="flip-card-front">
            <img src={vinilo.imagen} alt={vinilo.titulo} className="img-fluid" />
          </div>
          <div className="flip-card-back">
            <h5 className="card-back-title">{vinilo.titulo}</h5>
            <p className="card-back-text"><strong>Artista:</strong> {vinilo.artista}</p>
            <div className="mt-3 fs-5 text-highlight">{precio}</div>
            <button className="btn btn-sm btn-outline-light mt-2">VER MÁS</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ViniloItem
