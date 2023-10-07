import TransactionItem from "./TransactionItem"

function TransactionsList({movimientos, setMovimientos, setMovimientosAux, setEditMovimiento}) {

  const deleteMovimiento = ({id}) => {
    const newMovimientos = movimientos.filter(movimiento => movimiento.id !== id);
    setMovimientos(newMovimientos);
    setMovimientosAux(newMovimientos);
  }

  return (
    <div>    
        {
            movimientos.map(movimiento => (
                <TransactionItem key={movimiento.id} movimiento={movimiento} deleteMovimiento={deleteMovimiento} setEditMovimiento={setEditMovimiento} />
            ))
        }
    </div>
  )
}

export default TransactionsList