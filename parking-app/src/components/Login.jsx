import { useState, useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { TextField, Button, Container, Typography, Avatar  } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import styles from "./Login.module.css";
import { useNavigate, useParams } from "react-router-dom";
import HeaderTitle from "./HeaderTitle";

const Login = () => {
    
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();
    const {userData} = useContext(GlobalContext);

    
    const handleLogin = (e) => {
      e.preventDefault();
      console.log("Datos Usuario: ", userData);
      if (!username || !password) {
          setError('Por favor, completa todos los campos');
          return;
      }
  
      if (username === userData.username && password === userData.password) {
        console.log("Credenciales correctas");
          setError('');
          navigate("/Dashboard", { replace: true });
      } else {
          setError('Credenciales incorrectas');
          setPassword('');
      }
    };

return (
    <Container component="main" maxWidth="xs" className={styles.pageContainer}>
      <HeaderTitle />
      <div className={styles.loginForm}>
        <Typography variant="h4" className={styles.title}>
          Bienvenido
        </Typography>
        <Avatar className={styles.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <form onSubmit={handleLogin}>
          <div className={styles.formControl}>
            <TextField
              label="Usuario"
              variant="outlined"
              fullWidth
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className={styles.formControl}>
            <TextField
              label="Contraseña"
              variant="outlined"
              type="password"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className={styles.formControl}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Ingresar
            </Button>
          </div>
          {error && (
            <Typography variant="body2" className={styles.error}>
              {error}
            </Typography>
          )}
        </form>
      </div>
    </Container>
  );
};

export default Login;