import React, { useContext } from 'react';
import Sidebar from '../components/Sidebar';
import { GlobalContext } from '../context/GlobalContext';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Typography } from '@mui/material';

const Dashboard = () => {
  const { parkingData } = useContext(GlobalContext);

  // Calcular el número de parqueaderos disponibles
  const availableParkingSpaces = parkingData.filter((space) => space.available).length;

  // Calcular la ocupación del parqueadero
  const totalSpaces = parkingData.length;
  const occupiedSpaces = totalSpaces - availableParkingSpaces;

  // Datos para el gráfico de ocupación
  const chartData = [
    { name: 'Ocupado', Celdas: occupiedSpaces },
    { name: 'Disponible', Celdas: availableParkingSpaces },
  ];

  return (
    <>
      <Sidebar />
      <Typography variant='h4' sx={{marginBottom: 5}}>Bienvenido - Admin</Typography>

      {/* Mostrar contador de parqueaderos disponibles */}
      <Typography>Total celdas: {totalSpaces}</Typography>
      <Typography>Celdas disponibles: {availableParkingSpaces}</Typography>

      {/* Mostrar gráfico de ocupación */}
      <ResponsiveContainer width="80%" height={400}>
        <BarChart data={chartData}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Celdas" fill="#007bff" />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};

export default Dashboard;
