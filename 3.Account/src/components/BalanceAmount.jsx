import styles from "./BalanceAmount.module.css";

function BalanceAmount({saldoInicial, saldoFinal, setSaldoInicial, setSaldoFinal}) {
  
  return (
    <div className={styles.balanceContainer}>
      <span className={styles.label}>Saldo Inicial:</span>
      <input
        type="number"
        className={styles.inputField}
        value={saldoInicial}
        onChange={(e) => setSaldoInicial(parseFloat(e.target.value))}
      />
      <span className={styles.label}>Saldo Final:</span>
      <input
        type="number"
        className={`${styles.inputField} ${styles.readOnlyInput}`}
        value={saldoFinal}
        readOnly
      />
    </div>
  )
}

export default BalanceAmount