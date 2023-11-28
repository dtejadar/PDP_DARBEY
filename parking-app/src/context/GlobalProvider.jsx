/* eslint-disable react/prop-types */
import { useState } from "react";
import { GlobalContext } from "./GlobalContext";

const GlobalProvider = ({ children }) => {

const [userData, setUserData] = useState({
    username: 'admin',
    password: 'admin123'
});

const [parkingData, setParkingData] = useState([
  {
    id: 1,
    typeVehicle: 'Carro',
    available: true,
    userId: ''
  },
  {
    id: 2,
    typeVehicle: 'Carro',
    available: true,
    userId: ''
  },
  {
    id: 3,
    typeVehicle: 'Carro',
    available: true,
    userId: ''
  },
  {
    id: 4,
    typeVehicle: 'Carro',
    available: true,
    userId: ''
  },
  {
    id: 5,
    typeVehicle: 'Carro',
    available: true,
    userId: ''
  },
  {
    id: 6,
    typeVehicle: 'Moto',
    available: true,
    userId: ''
  },
  {
    id: 7,
    typeVehicle: 'Moto',
    available: true,
    userId: ''
  },
  {
    id: 8,
    typeVehicle: 'Moto',
    available: true,
    userId: ''
  },
  {
    id: 9,
    typeVehicle: 'Moto',
    available: true,
    userId: ''
  },
  {
    id: 10,
    typeVehicle: 'Moto',
    available: true,
    userId: ''
  }
]);

const [vehicles, setVehicles] = useState([
  {
    ownerName: 'Darbey Tejada Ruiz',
    documentType: 'cc',
    documentNumber: '1017244721',
    vehicleType: 'car',
    modelOrCylinder: '2023',
    brand: 'Mazda',
    vehiclePlate: 'MXM123',
  },
  {
    ownerName: 'Darbey Tejada Ruiz',
    documentType: 'cc',
    documentNumber: '1017244721',
    vehicleType: 'motorcycle',
    modelOrCylinder: '250',
    brand: 'Suzuki',
    vehiclePlate: 'OJO01G',
  }
]);

const HandleRegisterVehicle = (data) => {
    setVehicles((prevVehicles) => {
        const updatedVehicles = [...prevVehicles, data];
        return updatedVehicles;
      });
}

  return (
    <GlobalContext.Provider
      value={{ userData, HandleRegisterVehicle, vehicles, parkingData, setParkingData }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
