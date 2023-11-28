import styles from '../components/RegisterVehicle.module.css';
import React, { useState, useContext, useEffect } from 'react';
import { GlobalContext } from "../context/GlobalContext";
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
} from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Sidebar from '../components/Sidebar';

const RegisterVehicle = () => {
  const [vehicleType, setVehicleType] = useState('car'); // 'car' or 'motorcycle'
  const [ownerName, setOwnerName] = useState('');
  const [documentType, setDocumentType] = useState('cc'); // Default to 'Cédula de Ciudadanía'
  const [documentNumber, setDocumentNumber] = useState('');
  const [modelOrCylinder, setModelOrCylinder] = useState(''); 
  const [brand, setBrand] = useState(''); 
  const [vehiclePlate, setVehiclePlate] = useState('');
  const [alertOpen, setAlertOpen] = useState(false);
  const [messageAlert, setMessageAlert] = useState('');  
  const [typeMessage, setTypeMessage] = useState('error');
  
  const navigate = useNavigate();
  const {HandleRegisterVehicle, vehicles} = useContext(GlobalContext);

  useEffect(() => {
    console.log("Vehiculos actuales:", vehicles);
  }, [vehicles]);

  const handleVehiclePlateChange = (input) => {
    const formattedInput = input.toUpperCase();
  
    let formattedPlate = '';
    if (vehicleType === 'car') {
      // Formato para carros: 3 letras + 3 números
      const carPlateRegex = /^[A-Z]{3}\d{3}$/;
      if (carPlateRegex.test(formattedInput)) {
        formattedPlate = formattedInput;
      }
    } else if (vehicleType === 'motorcycle') {
      // Formato para motos: 3 letras + 2 números + 1 letra
      const motorcyclePlateRegex = /^[A-Z]{3}\d{2}[A-Z]$/;
      if (motorcyclePlateRegex.test(formattedInput)) {
        formattedPlate = formattedInput;
      }
    }
    setVehiclePlate(formattedPlate);
  };

  const handleDocumentNumberChange = (input) => {
    let formattedInput = input;
    if(documentType === 'cc') {
        formattedInput = input.replace(/\D/g, '').slice(0, 10);
    }
    setDocumentNumber(formattedInput);
  };

  const handleRegistration = () => {
    console.log(`Registrando ${vehicleType}`);
    const vehicleData = {
        ownerName,
        documentType,
        documentNumber,
        vehicleType,
        modelOrCylinder,
        brand,
        vehiclePlate,
      };

     const existingVehicle = vehicles.find((vehicle) => vehicle.vehiclePlate === vehicleData.vehiclePlate);

     if (existingVehicle) {
        setMessageAlert('Ya existe un vehículo registrado con la placa ', vehiclePlate);
        setAlertOpen(true);
     } else if(!documentNumber || !modelOrCylinder || !vehiclePlate) {
        setMessageAlert('Existen campos obligatorios por completar');
        setAlertOpen(true);
    } else {
       HandleRegisterVehicle(vehicleData);
       resetFields();
       setTypeMessage('success');
       setMessageAlert('Registro exitoso!');
       setAlertOpen(true);
     }
  };

  const resetFields = () => {
    setOwnerName('');
    setDocumentType('cc');
    setDocumentNumber('');
    setModelOrCylinder('');
    setBrand('');
    setVehiclePlate('');
  };

  const handleCloseAlert = () => {
    setAlertOpen(false);
  };

  const handleInputChange = (e) => {
    const inputValue = e.target.value.toUpperCase();
    setVehiclePlate(inputValue);
  };

  return (
    <Container className={styles.registerVehicleContainer}>
    <Sidebar />
      <Typography variant="h4" sx={{marginBottom: 2}}>Registrar Vehículo</Typography>
      <FormControl fullWidth className={styles.formControl}>
        <InputLabel id="vehicle-type-label">Tipo de Vehículo</InputLabel>
        <Select
          labelId="vehicle-type-label"
          id="vehicle-type"
          value={vehicleType}
          onChange={(e) => setVehicleType(e.target.value)}
        >
          <MenuItem value="car">Carro</MenuItem>
          <MenuItem value="motorcycle">Moto</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth className={styles.formControl}>
        <TextField
          id="owner-name"
          label="Nombre del Propietario"
          value={ownerName}
          onChange={(e) => setOwnerName(e.target.value)}
        />
      </FormControl>
      <FormControl fullWidth className={styles.formControl}>
        <InputLabel id="document-type-label">Tipo de Documento</InputLabel>
        <Select
          labelId="document-type-label"
          id="document-type"
          value={documentType}
          onChange={(e) => setDocumentType(e.target.value)}
        >
          <MenuItem value="cc">Cédula de Ciudadanía</MenuItem>
          <MenuItem value="passport">Pasaporte</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth className={styles.formControl}>
        <TextField
          id="document-number"
          label="Número de Documento"          
          type='text'
          value={documentNumber}
          onChange={(e) => handleDocumentNumberChange(e.target.value)}
        />
      </FormControl>
      <FormControl fullWidth className={styles.formControl}>
        <TextField
          id="model-cylinder"
          label={vehicleType === 'car' ? 'Modelo' : 'Cilindraje'}
          type={vehicleType === 'car' ? 'text' : 'number'}
          value={modelOrCylinder}
          onChange={(e) => setModelOrCylinder(e.target.value)}
        />
      </FormControl>
      <FormControl fullWidth className={styles.formControl}>
        <InputLabel id="brand-label">Marca</InputLabel>
        <Select
          labelId="brand-label"
          id="brand-veicle"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
        >
            {vehicleType === 'car' ? (
                [
                    <MenuItem key="mazda" value="mazda">Mazda</MenuItem>,
                    <MenuItem key="renault" value="renault">Renault</MenuItem>,
                    <MenuItem key="audi" value="audi">Audi</MenuItem>,
                    <MenuItem key="toyota" value="toyota">Toyota</MenuItem>,
                    <MenuItem key="kia" value="kia">Kia</MenuItem>,
                ]
                ) : (
                [
                    <MenuItem key="honda" value="honda">Honda</MenuItem>,
                    <MenuItem key="yamaha" value="yamaha">Yamaha</MenuItem>,
                    <MenuItem key="suzuki" value="suzuki">Suzuki</MenuItem>,
                    <MenuItem key="akt" value="akt">Akt</MenuItem>,
                    <MenuItem key="ducati" value="ducati">Ducati</MenuItem>,
                    ]
                )}          
        </Select>
      </FormControl>
      <FormControl fullWidth className={styles.formControl}>  
        <TextField
          id="vehicle-plate"
          label="Placa del Vehículo"
          value={vehiclePlate}
          onBlur={() => handleVehiclePlateChange(vehiclePlate)}
          onChange={(e) => handleInputChange(e)}
        />
      </FormControl>
      <Button variant="contained" color="primary" onClick={handleRegistration}>
        Registrar {vehicleType === 'car' ? 'Carro' : 'Moto'}
      </Button>
      <Button sx={{marginLeft: 2}} variant="contained" color="primary" onClick={() => navigate('/ParkingMap')}>Visualizar Mapa</Button>
      <Snackbar open={alertOpen} autoHideDuration={7000} onClose={handleCloseAlert} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert onClose={handleCloseAlert} severity={typeMessage} sx={{ width: '100%' }}>
          {messageAlert}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default RegisterVehicle;