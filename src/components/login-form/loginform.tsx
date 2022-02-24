import React, { useEffect, useState } from 'react'
import { Alert, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Snackbar, TextField, Typography } from '@mui/material'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { SnackbarProvider, VariantType, useSnackbar } from 'notistack';


const Loginform = () => {

  const url = 'https://decor-infra.programmersarmy.net/api/auth/login';

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [showToast, setShowToast] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (username && password) {
      /* console.log(username + ' ' + password); */
    }
  }, [username, password])

  const authenticate = () => {
    axios.post(url, { 'username': username, 'password': password }).then(res => {

      console.log(res.data.token);
      const token = res.data.token;
      localStorage.setItem('token', token);
      console.log(localStorage.getItem('token'));
      token !== undefined ? navigate("/list") : console.log('No token!!');
    }, err => {
      setShowToast(true);
      const timer = setTimeout(() => setShowToast(false), 3000);
    })
  }

  return (
    <div>
      <Snackbar
        open={showToast}
        onClose={() => { console.log('closed') }}
        key={'a'}
      >
        <Alert severity="warning">Verifique las credenciales ingresadas.</Alert>
      </Snackbar>

      <Card sx={{ maxWidth: 345, minHeight: 300, marginTop: 10, marginLeft: 10, opacity: 0.95 }}>
        <CardMedia
          sx={{ backgroundColor: 'black' }}
          component="img"
          width="40"
          image="./logowhite1.png"
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" align='center'>
            Iniciar Sesión
          </Typography>
          <Typography variant="body2" color="text.secondary" align='center'>
            Ingrese su usuario y contraseña para acceder al sistema.
          </Typography>
          <div className='col-md-12 spaced'>
            <TextField sx={{ minWidth: 300 }} id="username" label="Username" variant="outlined" onChange={(e) => { setUsername(e.target.value) }} />
          </div>
          <div className='col-md-12 spaced'>
            <TextField sx={{ minWidth: 300 }} id="password" label="Password" variant="outlined" type="password" onChange={(e) => { setPassword(e.target.value) }} />
          </div>
        </CardContent>
        {/* </CardActionArea> */}
        <CardActions>
          <div className='col-md-12 spaced fullWidth'>
            <Button sx={{ minWidth: 320 }} variant="contained" onClick={authenticate}>INICIAR SESIÓN</Button>
          </div>
        </CardActions>
      </Card>

      {/* <div className='row centered'>
        <div className='text-center'>
          <Typography variant="h5" gutterBottom component="div">
            Inicio de Sesión
          </Typography>
        </div>
        <div className='col-md-12 spaced'>
          <TextField id="username" label="Username" variant="outlined" onChange={(e) => { setUsername(e.target.value) }} />
        </div>
        <div className='col-md-12 spaced'>
          <TextField id="password" label="Password" variant="outlined" type="password" onChange={(e) => { setPassword(e.target.value) }} />
        </div>
        <div className='col-md-12 spaced fullWidth'>
          <Button variant="contained" onClick={authenticate}>INICIAR SESIÓN</Button>
        </div>
      </div> */}

    </div>
  )
}

export default Loginform
