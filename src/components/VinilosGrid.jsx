import ViniloItem from './ViniloItem'
import Spinner from './Spinner'

const VinilosGrid = ({ items, isLoading, setViniloSeleccionado }) => {
  return isLoading ? (
    <Spinner />
  ) : (
    <div className="container my-5">
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {items.map((vinilo) => (
          <ViniloItem key={vinilo.id} vinilo={vinilo} setViniloSeleccionado={setViniloSeleccionado} />
        ))}
      </div>
    </div>
  )
}

export default VinilosGrid