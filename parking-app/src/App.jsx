import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import GlobalProvider from './context/GlobalProvider';
import Login from './components/Login';
import Dashboard from './pages/Dashboard';
import RegisterVehicle from './pages/RegisterVehicle';
import ParkingMap from './pages/ParkingMap';

function App() {

  return (
    <>
    <BrowserRouter>
      <GlobalProvider>
        <Routes>
         <Route path='/' element={<Login />} />
         <Route path='/Dashboard' element={<Dashboard />} />
         <Route path='/RegisterVehicle' element={<RegisterVehicle />} />
         <Route path='/ParkingMap' element={<ParkingMap />} />
        </Routes>
      </GlobalProvider>
    </BrowserRouter>
    </>
  )
}

export default App



























{/* <BrowserRouter>
  <GlobalProvider>
    <Menu />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/dashboard/*" element={<DashboardPage />}>
        <Route path="indicadores" element={<p>Indicadores</p>} />
        <Route path="metricas" element={<p>Metricas</p>} />
        <Route path="graficos" element={<p>Graficos</p>} />
      </Route>
      <Route path="/users" element={<UsersPage />} />
      <Route path="/user/:id" element={<UserPage />} />
      <Route path="/*" element={<NotFoundPage />} />
    </Routes>
  </GlobalProvider>
</BrowserRouter> */}