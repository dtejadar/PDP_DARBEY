import React, {useContext, useState, useEffect} from 'react';
import { Paper, Grid, Typography, Button, Modal, Box, TextField, Snackbar, Alert } from '@mui/material';
import DriveEtaIcon from '@mui/icons-material/DriveEta';
import MotorcycleIcon from '@mui/icons-material/ElectricBike';
import style from '../components/ParkingMap.module.css';
import Sidebar from '../components/Sidebar';
import { GlobalContext } from "../context/GlobalContext";
import AddVehicleParking from '../components/AddVehicleParking';
import ReleaseVehicleInfo from '../components/ReleaseVehicleInfo';
import SearchIcon from '@mui/icons-material/Search';

const ParkingMap = () => {

  const { parkingData: initialParkingData, setParkingData } = useContext(GlobalContext);
  const [parkingData, setLocalParkingData] = useState(initialParkingData);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [releaseData, setReleaseData] = useState(null);
  const [filterData, setFilterData] = useState('');
  const [alertOpen, setAlertOpen] = useState(false);  
  const [messageAlert, setMessageAlert] = useState('');  
  const [typeMessage, setTypeMessage] = useState('error');

  useEffect(() => {
    setLocalParkingData(initialParkingData);
  }, [initialParkingData]);

  const handleModalOpen = (vehicle) => {
    setSelectedVehicle(vehicle);
    if(vehicle.available) {
      setModalOpen(true);
    }
    else {
      handleReleaseParkingCell(vehicle);
    }
  };

  const handleReleaseParkingCell = ({id}) => {
    const updatedParkingData = [...parkingData];
    const updatedCelda = updatedParkingData.find((celda) => celda.id === id );

    setReleaseData({
      typeVehicle: updatedCelda.typeVehicle,
      id: id,
      vehiclePlate: updatedCelda.vehiclePlate,
      ownerName: updatedCelda.ownerName,
      dateIngreso: updatedCelda.date,
      hourIngreso: updatedCelda.time,
    });

    if(updatedCelda) {
      updatedCelda.userId = '';
      updatedCelda.ownerName = '';
      updatedCelda.vehiclePlate = '';
      updatedCelda.date = null;
      updatedCelda.time = '';
      updatedCelda.available = true;

      setLocalParkingData(updatedParkingData);
    }
    
    setModalOpen(true);
  }

  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedVehicle(null);
    setReleaseData(null);
  };

  const handleInputChange = (e) => {
    const inputValue = e.target.value.toUpperCase();
    setFilterData(inputValue);
  };

  const handleCloseAlert = () => {
    setAlertOpen(false);
  };

  const searchUserVehicle = (input) => {

    // Verificar si el input comienza con un número
    const startsWithNumber = /^\d/.test(input);

    // Si el input está vacío, restaurar parkingData al estado original
    if (input.trim() === '') {
      setLocalParkingData(initialParkingData);
      return;
    }

    const filteredByUserId = initialParkingData.filter((vehicle) => vehicle.userId === input);
    const filteredByVehiclePlate = initialParkingData.filter((vehicle) => vehicle.vehiclePlate === input);
  
    const filteredResults = [...filteredByUserId, ...filteredByVehiclePlate];
  
    if (filteredResults.length > 0) {
      setLocalParkingData(filteredResults);
    } else {
      setTypeMessage('info');
      const messagePrefix = startsWithNumber
      ? `No existen vehiculos parqueados asociados al numero de documento: ${input}`
      : `No se encuentra el vehiculo parqueado con placa: ${input}`;
      setMessageAlert(messagePrefix);
      setAlertOpen(true);
    }
  };
  

  return (
    <div className={style.root}>
      <Sidebar />
      <Paper className={style.paper}>
        <Typography variant="h4" sx={{marginBottom: 1}}>
          Parking Map
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: 3 }}>
          <TextField 
            sx={{flex: 1/3, marginTop: 1, width: '120px'}} 
            id="outlined-search" 
            label="Placa ó cédula" 
            type="search" 
            value={filterData}
            onChange={(e) => handleInputChange(e)} 
          />
          <Button sx={{width: '150px', margin: '10px 0px 0px 12px', height: '50px'}} variant="contained" onClick={() => searchUserVehicle(filterData) } endIcon={<SearchIcon />}>Buscar</Button>
        </Box>
        <Grid container spacing={2} className={style.container}>
            {
                parkingData.map((vehicle) => (
                    <React.Fragment key={vehicle.id}>
                        {vehicle.id === 6 && (
                        <Grid item xs={12} className={style.parkingInto}>
                            <Typography variant="subtitle1">Entrada</Typography>
                        </Grid>
                        )}
                        <Grid
                            item
                            xs={2}
                            className={`${vehicle.typeVehicle === 'Carro' ? style.carParking : style.motorcycleParking} ${!vehicle.available ? style.vehicleNotAvailable : ''}`}
                        >
                            {vehicle.typeVehicle === 'Carro' ? (
                                <DriveEtaIcon fontSize="large" />
                            ) : (
                                <MotorcycleIcon fontSize="large" />
                            )}
                            <Typography variant="subtitle1">{`${vehicle.typeVehicle} ${vehicle.id}`}</Typography>
                            <Typography variant="subtitle1">{`${vehicle.vehiclePlate ? vehicle.vehiclePlate : '' }`}</Typography>
                            <Typography variant="subtitle1">{`${vehicle.ownerName ? vehicle.ownerName : '' }`}</Typography>
                            <Typography variant="subtitle1" sx={{marginBottom: 1}}>{`${vehicle.userId ? vehicle.userId : '' }`}</Typography>
                            <Button variant="contained" onClick={() => handleModalOpen(vehicle)}>{vehicle.available ? 'Ingresar' : 'Liberar'}</Button>
                        </Grid>
                    </React.Fragment>
                ))
            }
        </Grid>
      </Paper>
      <Modal open={modalOpen} onClose={handleModalClose}>
        {releaseData ? (
          <ReleaseVehicleInfo releaseData={releaseData} onClose={handleModalClose} />
        ) : (
          <AddVehicleParking
            vehicle={selectedVehicle}
            parkingData={parkingData}
            setParkingData={setParkingData}
            onClose={handleModalClose}
          />
        )}
      </Modal>
      <Snackbar open={alertOpen} autoHideDuration={7000} onClose={handleCloseAlert} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert onClose={handleCloseAlert} severity={typeMessage} sx={{ width: '100%' }}>
          {messageAlert}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ParkingMap;
