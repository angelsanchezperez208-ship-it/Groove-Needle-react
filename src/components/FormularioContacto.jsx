const FormularioContacto = () => {
  const enviarMensaje = (e) => {
    e.preventDefault()
    alert("¡Mensaje enviado con éxito! Te contactaremos pronto.")
    e.target.reset()
  }

  return (
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
  )
}

export default FormularioContacto