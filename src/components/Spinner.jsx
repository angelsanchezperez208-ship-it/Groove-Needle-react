const Spinner = () => {
  return (
    <div className="d-flex justify-content-center my-5">
      <div className="spinner-border" style={{ color: 'var(--neon-cyan)', width: '4rem', height: '4rem' }} role="status">
        <span className="visually-hidden">Cargando...</span>
      </div>
    </div>
  )
}

export default Spinner