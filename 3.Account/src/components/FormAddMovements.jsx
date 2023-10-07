import { useEffect, useState } from "react";
import uuid4 from "uuid4";
import styles from './FormAddMovements.module.css';

function FormAddMovements({movimientos, editMovimiento, setMovimientos, setEditMovimiento, setMovimientosAux}) {

    const [tipo, setTipo] = useState("ingreso");
    const [nombre, setNombre] = useState("");
    const [cantidad, setCantidad] = useState(0);

    const handleSubmit = (e) => {
        e.preventDefault();
        if(editMovimiento)
        {
            handleEditMovimiento(editMovimiento);
        }
        else{
            const newMovimiento = { id: uuid4(), tipo, nombre, cantidad };
            setMovimientos([...movimientos, newMovimiento]);
            setMovimientosAux([...movimientos, newMovimiento]);
            resetFieldsForm();
        }
    }

    const resetFieldsForm = () => {
        setNombre("");
        setCantidad(0);
        setTipo("ingreso");
    }

    const handleEditMovimiento = (movimiento) => {
        const newMovimientos = movimientos.map( item => item.id === movimiento.id ? { ...movimiento, tipo, nombre, cantidad } : item );
        setMovimientos(newMovimientos);
        setMovimientosAux(newMovimientos);
        setEditMovimiento(null);
    }

    useEffect(() => {
      if(editMovimiento){
        setTipo(editMovimiento.tipo);
        setNombre(editMovimiento.nombre);
        setCantidad(editMovimiento.cantidad);
      }
      else
      {
        resetFieldsForm();
      }
    }, [editMovimiento])
    

    return (
        <div className={`container ${styles.formContainer}`}>
          <div className={`row ${styles.formRow}`}>
            <div>
                <div className={`formHeader ${styles.formHeader}`}>
                    <h4>Agregar Movimientos</h4>
                </div>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="moveType" className={styles.formLabel}>
                    Tipo
                    </label>
                    <select
                    name="moveType"
                    id="moveType"
                    value={tipo}
                    onChange={(e) => setTipo(e.target.value)}
                    className={`form-select ${styles.formSelect}`}
                    >
                      <option value="-1">Seleccione una opción</option>
                      <option value="ingreso">Ingreso</option>
                      <option value="gasto">Gasto</option>
                    </select>
                    <label htmlFor="moveName" className={styles.formLabel}>
                    Nombre
                    </label>
                    <input
                    type="text"
                    name="moveName"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    className={`form-control ${styles.formInput}`}
                    />
                    <label htmlFor="amount" className={styles.formLabel}>
                    Cantidad
                    </label>
                    <input
                    type="number"
                    name="amount"
                    value={cantidad}
                    onChange={(e) => setCantidad(parseFloat(e.target.value))}
                    className={`form-control ${styles.formInput}`}
                    />
                    <button type="submit" className={`btn btn-primary ${styles.formButton}`}>
                    {editMovimiento ? 'Editar' : 'Agregar'}
                    </button>
                </form>
            </div>
          </div>
        </div>
      );
}

export default FormAddMovements