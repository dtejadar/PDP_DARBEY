// Sidebar.jsx

import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import DriveEtaIcon from '@mui/icons-material/DriveEta';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import VisibilityIcon from '@mui/icons-material/Visibility';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom';
import styles from '../components/Sidebar.module.css'

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleToggleDrawer = () => {
    setOpen(!open);
  };

  const handleNavigate = (Path) => {
    navigate(Path);
  };

  return (
    <>
      <IconButton className={styles.menuButton} onClick={handleToggleDrawer} size="large">
        <MenuIcon />
      </IconButton>
      <Drawer  anchor="left" open={open} onClose={handleToggleDrawer}>
        <div className={styles.drawer} >
          <List sx={{background: '#034893 !important'}}>
            <ListItem button onClick={() => handleNavigate('/Dashboard')}>
              <ListItemIcon>
                <HomeIcon sx={{color: 'white'}}/>
              </ListItemIcon>
              <ListItemText primary="Inicio" />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <AddCircleOutlineIcon sx={{color: 'white'}} />
              </ListItemIcon>
              <ListItemText 
                primary="Registrar Vehículo" 
                onClick={() => handleNavigate('/RegisterVehicle')}
             />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <VisibilityIcon sx={{color: 'white'}} />
              </ListItemIcon>
              <ListItemText 
                primary="Visualizar Celdas" 
                onClick={() => handleNavigate('/ParkingMap')}
              />
            </ListItem>
          </List>
        </div>
      </Drawer>
    </>
  );
};

export default Sidebar;