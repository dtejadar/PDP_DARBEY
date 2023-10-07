import { useState } from "react";
import styles from './FilterTransactions.module.css';
import { BsSearch } from 'react-icons/bs'; 

const FilterTransactions = ({movimientos, setMovimientos, movimientosAux}) => {
  const [tipoFiltro, setTipoFiltro] = useState("todos");

  const handleFilterMovimientos = (e) => {
    const filterMovimientos = movimientos.filter(movimiento => movimiento.nombre.toLowerCase().includes(e.toLowerCase()));
    setMovimientos((filterMovimientos.length > 0) && e ? filterMovimientos : movimientosAux);
  }  

  const handleTypeFilterMovimientos = (e) => {
    setTipoFiltro(e)
    const filterMovimientos = e != 'todos' ? movimientosAux.filter(movimiento => movimiento.tipo === e) : movimientosAux;
    setMovimientos((filterMovimientos.length > 0) && e ? filterMovimientos : movimientosAux);    
  }

  return (
    <div className={styles.filterContainer}>
      <label className={styles.label}>Buscador</label>
      <div className={styles.searchBar}>
        <input
          type="text"
          name="searchTransactions"
          onChange={(e) => handleFilterMovimientos(e.target.value)}
          className={`form-control ${styles.input} ${styles['input_search']}`}
        />
        <div className={styles.searchIcon}>
          <BsSearch />
        </div>
      </div>
      <fieldset className={styles.fieldset}>
        <legend>Elige un tipo</legend>
        <label className={styles.radioLabel}>
          <input
            type="radio"
            name="text"
            value="todos"
            checked={tipoFiltro === "todos"}
            onChange={(e) => handleTypeFilterMovimientos(e.target.value)}
            className={styles.radioButton}
          /> Todos
        </label>
        <label className={styles.radioLabel}>
          <input
            type="radio"
            name="text"
            value="gasto"
            onChange={(e) => handleTypeFilterMovimientos(e.target.value)}
            className={styles.radioButton}
          /> Gastos
        </label>
        <label className={styles.radioLabel}>
          <input
            type="radio"
            name="text"
            value="ingreso"
            onChange={(e) => handleTypeFilterMovimientos(e.target.value)}
            className={styles.radioButton}
          /> Ingresos
        </label>
      </fieldset>
    </div>
  );
}

export default FilterTransactions