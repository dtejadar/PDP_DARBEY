import React, { forwardRef, useContext, useEffect, useState } from 'react';
import styles from '../components/RegisterVehicle.module.css';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button, 
  TextField, 
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Box } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { GlobalContext } from "../context/GlobalContext";
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';

const AddVehicleParking = forwardRef(({ vehicle, parkingData, setParkingData, onClose }, ref) => {
  const navigate = useNavigate();
  const { vehicles } = useContext(GlobalContext);
  
  const [filterData, setFilterData] = useState('');
  const [vehiclesFiltered, setvehiclesFiltered] = useState([]);
  const [showButtonRegister, setshowButtonRegister] = useState(false);
  const [vehicleSelected, setVehicleSelected] = useState(null);
  const [vehiclePlateSelected, setVehiclePlateSelected] = useState('');
  const [celdasVehicleType, setCeldasVehicleType] = useState([]);
  const [celdaSeleted, setCeldaSeleted] = useState('');
  
  const handleAddVehicle = () => {
    // Verifica que haya al menos un vehículo seleccionado y una celda seleccionada
    if (vehicleSelected && celdaSeleted !== '') {
      // Realiza una copia del estado actual
      const updatedParkingData = [...parkingData];

      // Encuentra la celda correspondiente en la copia del estado
      const updatedCelda = updatedParkingData.find((celda) => celda.id === celdaSeleted);

      const vehicleAlreadyParked = updatedParkingData.some(
        (celdaParking) =>
          celdaParking.vehiclePlate === vehicleSelected.vehiclePlate && !celdaParking.available
      );

      if (updatedCelda && !vehicleAlreadyParked) {
        updatedCelda.userId = vehicleSelected.documentNumber;
        updatedCelda.ownerName = vehicleSelected.ownerName;
        updatedCelda.vehiclePlate = vehicleSelected.vehiclePlate;
        updatedCelda.date = new Date();
        updatedCelda.time = new Date().toLocaleTimeString();
        updatedCelda.available = false;

        setParkingData(updatedParkingData);
      }

      onClose();
    }
  };

  const searchUserVehicle = (input) => {
    const filteredByDocument = vehicles.filter((vehicleItem) => vehicleItem.documentNumber === input);
    const filteredByPlate = vehicles.filter((vehicleItem) => vehicleItem.vehiclePlate === input);

    let filteredResults = [];

    if (filteredByDocument.length > 0) {
      filteredResults = filteredByDocument;
    } else if (filteredByPlate.length > 0) {
      filteredResults = filteredByPlate;
    } else {
      setvehiclesFiltered([]);
      setshowButtonRegister(true);
      return;
    }

    // Filtrar los resultados para excluir los vehículos que ya están en el parqueadero
    const filteredResultsNotInParking = filteredResults.filter(
      (result) => !parkingData.some((celda) => celda.vehiclePlate === result.vehiclePlate)
    );

    setvehiclesFiltered(filteredResultsNotInParking);
    setshowButtonRegister(filteredResultsNotInParking.length === 0);
  };

  const handleVehicleSelected = (selectedPlate) => {
    const selectedVehicle = vehiclesFiltered.find((vehicleItem) => vehicleItem.vehiclePlate === selectedPlate);
    // setVehicleSelected((prevSelectedVehicles) => [...prevSelectedVehicles, selectedVehicle]);
    setVehicleSelected(selectedVehicle);
    setVehiclePlateSelected(selectedVehicle ? selectedVehicle.vehiclePlate : '');
  }

  useEffect(() => {
    if(vehicleSelected && vehicleSelected.vehicleType !== vehicle.typeVehicle) {
      filterCeldasParking();
    }
  }, [vehicleSelected])

  const filterCeldasParking = () => {
    const celdasFiltradas = parkingData.filter((celda) => 
    (celda.typeVehicle === (vehicleSelected.vehicleType === 'motorcycle' ? 'Moto' : 'Carro')) && celda.available
  );
    setCeldasVehicleType(celdasFiltradas);
  }

  const handleInputChange = (e) => {
    const inputValue = e.target.value.toUpperCase();
    setFilterData(inputValue);
  };


  return (
    <Dialog open={true} onClose={onClose} ref={ref} maxWidth="lg">
      <DialogTitle>Ingresar Vehículo</DialogTitle>
      <DialogContent sx={{width: 500, height: 400}}>
        <Box sx={{ width: 1, marginBottom: 2 }}>
          <TextField 
            sx={{marginTop: 1}} 
            id="outlined-search" 
            label="Placa ó cédula" 
            type="search" 
            value={filterData}
            onChange={(e) => handleInputChange(e)} 
          />
        </Box>
        <Box sx={{width: 1 }}>
          <Button sx={{width: 1}} variant="contained" onClick={() => searchUserVehicle(filterData) } endIcon={<SearchIcon />}>Buscar</Button>
        </Box>
        {
          vehiclesFiltered.length > 0 && (
            <Box sx={{ '& > :not(style)': { m: 2, display: 'flex', alignItems: 'center' } }}>
               <FormControl variant="standard">
                  <TextField
                  id="input-with-icon-textfield"
                  label="Propietario"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountCircle />
                      </InputAdornment>
                    ),
                  }}
                  variant="standard"
                  value={vehiclesFiltered.length > 0 ? vehiclesFiltered[0].ownerName : ''}
                  aria-readonly
                />
               </FormControl>
            </Box>
          )
        }
        {          
          vehiclesFiltered.length > 0 && (          
          <FormControl fullWidth className={styles.formControl}>
            <InputLabel id="document-type-label">
              {
                vehicleSelected ? vehicleSelected.vehiclePlate 
                  : 
                vehiclesFiltered.length > 1 ? "Vehiculos del propietario" : `${vehicle.typeVehicle}(s) del propietario`
              }
            </InputLabel>
            <Select
              labelId="vehicles-label"
              id="vehicles-type"
              value={vehiclePlateSelected}
              onChange={(e) => handleVehicleSelected(e.target.value)}
            >
              {                
                vehiclesFiltered.map((vehicleData) => (
                  <MenuItem key={vehicleData.vehiclePlate} value={vehicleData.vehiclePlate}>
                    {`${vehicleData.vehicleType === "car" ? "Carro" : "Moto"} - ${vehicleData.vehiclePlate}`}
                  </MenuItem>
                ))
              }
            </Select>
          </FormControl>
          )
        }
        {
          celdasVehicleType.length > 0 && (
            <FormControl fullWidth className={styles.formControl}>
              <InputLabel id="celdas-type-label">{vehicleSelected ? `Celdas de ${vehicleSelected.vehicleType === "motorcycle" ? "Moto" : "Carro"} disponibles` : ''}</InputLabel>
              <Select
                labelId="celdas-label"
                id="celdas-type"
                value={celdaSeleted}
                onChange={(e) => setCeldaSeleted(e.target.value)}
              >
                {                
                  celdasVehicleType.map((celdaItem) => (
                    <MenuItem key={celdaItem.id} value={celdaItem.id}>
                      {`Celda de ${vehicleSelected.vehicleType === "motorcycle" ? "Moto" : "Carro"} - ${celdaItem.id}`}
                    </MenuItem>
                  ))
                }
              </Select>
            </FormControl>
          )
        }
        {showButtonRegister && (
          <Box sx={{display: 'flex', marginTop: 2 }}>
            <Button sx={{margin: 'auto'}} variant="contained" onClick={() => navigate('/RegisterVehicle')}>Registrar vehículo</Button>
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={handleAddVehicle} disabled={!vehicleSelected || !celdaSeleted}>
          {`Ingresar ${vehicleSelected ? (vehicleSelected.vehicleType === "motorcycle" ? "Moto" : "Carro") : vehicle.typeVehicle}`}
        </Button>
      </DialogActions>
    </Dialog>
  );
});

export default AddVehicleParking;
