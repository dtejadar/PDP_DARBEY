import React, { useEffect, useState } from 'react';
import { Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions, Box } from '@mui/material';
import { DeliveryDining, ElectricCar } from '@mui/icons-material';

import moment from 'moment';

const ReleaseVehicleInfo = ({ releaseData, onClose }) => {
  const [duration, setDuration] = useState('');

  useEffect(() => {
    if (releaseData.dateIngreso && releaseData.hourIngreso) {
        const fechaIngreso = moment(`${releaseData.dateIngreso} ${releaseData.hourIngreso}`, 'ddd MMM DD YYYY HH:mm:ss [GMT]ZZ');
      const fechaSalida = moment();
  
      console.log("Fecha de ingreso:", fechaIngreso.format()); // Verifica si la fecha de ingreso se está interpretando correctamente
      console.log("Fecha de salida:", fechaSalida.format()); // Verifica si la fecha de salida se está interpretando correctamente
  
      const duracion = moment.duration(fechaSalida.diff(fechaIngreso));
      console.log("Duración:", duracion); // Verifica si la duración se calcula correctamente
  
      const horas = duracion.hours();
      const minutos = duracion.minutes();
      const segundos = duracion.seconds();
  
      const duracionString = `${horas}h ${minutos}m ${segundos}s`;
  
      setDuration(duracionString);
    }
  }, [releaseData.dateIngreso, releaseData.hourIngreso]);
  

  return (
    <Dialog open={true} onClose={onClose} maxWidth="lg">
      <DialogTitle sx={{background: '#0089ff', color: 'white', display: 'flex', justifyContent: 'center'}}>{`Información de salida de ${releaseData.typeVehicle}`}</DialogTitle>
      <DialogContent sx={{ width: 500, height: 400, display: 'row', alignContent: 'center' }}>
        <Typography variant="h5" sx={{margin: '25px 0px 5px 70px', fontFamily: "'Roboto', sans-serif !important"}}>{`Se ha liberado la celda de ${releaseData.typeVehicle} ${releaseData.id}`}</Typography>
        <Box sx={{ marginLeft: '6em', marginTop: '3em'}}>
          {(
            releaseData.typeVehicle === 'Moto' ? <DeliveryDining fontSize="large" sx={{margin: '0px 0px 35px 120px'}} /> : 
                                                 <ElectricCar fontSize="large" sx={{margin: '0px 0px 35px 120px'}} />
          )}
          <Typography variant="subtitle1">{`Placa: ${releaseData.vehiclePlate}`}</Typography>
          <Typography variant="subtitle1">{`Propietario: ${releaseData.ownerName}`}</Typography>
          <Typography variant="subtitle1">{`Fecha de ingreso: ${moment(releaseData.dateIngreso).format('DD-MM-YYYY')}`}</Typography>        
          <Typography variant="subtitle1">{`Hora de ingreso: ${moment(releaseData.hourIngreso, 'HH:mm:ss').format('HH:mm:ss')}`}</Typography>
          <Typography variant="subtitle1">{`Fecha de salida: ${moment().format('DD-MM-YYYY HH:mm:ss')}`}</Typography>
          <Typography variant="subtitle1">{`Hora de salida: ${moment().format('HH:mm:ss')}`}</Typography>
          <Typography variant="subtitle1">{`Duración en el parqueadero: ${duration}`}</Typography>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cerrar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ReleaseVehicleInfo;
