import logo from '../assets/logo.png';

const Header = ({ busqueda, setBusqueda }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-retro-cyan py-3 shadow-lg">
      <div className="container">
        <a className="navbar-brand d-flex align-items-center" href="#">
          <img src={logo} alt="Logo" width="50" className="me-2 rounded-circle border border-dark" />
          <span className="retro-title-header">Groove & Needle</span>
        </a>
        <form className="d-flex search-box" onSubmit={(e) => e.preventDefault()}>
          <input 
            className="form-control me-2 border-dark" 
            type="text" 
            placeholder="Buscar álbum o artista..." 
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)} 
          />
          <button className="btn btn-dark" type="button">
            <i className="fa-solid fa-magnifying-glass text-cyan-icon"></i>
          </button>
        </form>
      </div>
    </nav>
  )
}

export default Header