import styles from './TransactionItem.module.css';
import { BsTrash, BsPencil, BsPatchPlusFill, BsPatchMinusFill  } from 'react-icons/bs'; 

function TransactionItem({ movimiento, deleteMovimiento, setEditMovimiento }) {
  const tipoClass = movimiento.tipo === 'ingreso' ? styles.typeIngreso : styles.typeGasto;
  return (
    <div className={`${styles.transactionItem} ${tipoClass}`}>
        {tipoClass === styles.typeIngreso ? (
          <BsPatchPlusFill size={24} color="green"  />
        ) : (
          <BsPatchMinusFill size={24} color="red" />
        )}
        <label className={styles.labelNameTransactionItem}>{movimiento.nombre}</label>
        <input
        type="number"
        readOnly
        value={movimiento.cantidad}
        className={`form-control ${styles.amountInput} ${tipoClass}`} // Aplica la clase condicional aquí
      />
      <div className={styles.buttonContainer}>
        <button
          onClick={() => deleteMovimiento(movimiento)}
          className={`btn btn-danger ${styles.actionButton}`}
        >
          <BsTrash />
        </button>
        <button
          onClick={() => setEditMovimiento(movimiento)}
          className={`btn btn-primary ${styles.actionButton}`}
        >
          <BsPencil />
        </button>
      </div>
    </div>
  )
}

export default TransactionItem