import { useEffect, useState } from 'react'
import './App.css'
import uuid4 from "uuid4";
import FormAddMovements from './components/FormAddMovements'
import BalanceAmount from './components/BalanceAmount'
import TransactionsList from './components/TransactionsList'
import FilterTransactions from './components/FilterTransactions'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

function App() {
  const arrayTest = 
  [
    {id: uuid4(), tipo: "gasto", nombre: "cine", cantidad: 12000},
    {id: uuid4(), tipo: "gasto", nombre: "pago online", cantidad: 1000},
    {id: uuid4(), tipo: "gasto", nombre: "Pago online", cantidad: 1300},
    {id: uuid4(), tipo: "ingreso", nombre: "Salario", cantidad: 10500}
  ];
  const [saldoInicial, setSaldoInicial] = useState(0);
  const [saldoFinal, setSaldoFinal] = useState(0);
  const [movimientos, setMovimientos] = useState(arrayTest);
  const [movimientosAux, setMovimientosAux] = useState(movimientos);
  const [editMovimiento, setEditMovimiento] = useState(null)

  const calcularSaldoFinal = movimientosAux.reduce((total, movimiento) => {
    if(movimiento.tipo === 'ingreso'){
      return total + movimiento.cantidad;
    } 
    else{
      return total - movimiento.cantidad;
    }
    return total;
  }, saldoInicial);

  useEffect(() => {
    setSaldoFinal(calcularSaldoFinal);
  }, [saldoInicial, movimientosAux]);

  return (
      <div className="container-fluid">
      <div className="row">
        {/* Columna Izquierda: Formulario */}
        <div className="col-md-6">
          <BalanceAmount 
            saldoInicial={saldoInicial} 
            saldoFinal={saldoFinal} 
            setSaldoInicial={setSaldoInicial}
            setSaldoFinal={setSaldoFinal}
          />
          <FormAddMovements 
            movimientos={movimientos} 
            editMovimiento={editMovimiento}
            setMovimientos={setMovimientos} 
            setMovimientosAux={setMovimientosAux} 
            setEditMovimiento={setEditMovimiento}
          />
        </div>

        {/* Columna Derecha: Filtrado y Lista de Transacciones */}
        <div className="col-md-6">
          <FilterTransactions movimientos={movimientos} setMovimientos={setMovimientos} movimientosAux={movimientosAux} />
          <TransactionsList movimientos={movimientos} setMovimientos={setMovimientos} setMovimientosAux={setMovimientosAux} setEditMovimiento={setEditMovimiento} />
        </div>
      </div>
    </div>
  )
}

export default App
