import { Alert, Box, Button, Card, CardActions, CardContent, Snackbar, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { PreventiveMaintenance } from '../../interfaces/PreventiveMaintenance';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Createview = () => {

  const url = 'https://decor-infra.programmersarmy.net/api/maintenances';

  const token = localStorage.getItem('token');

  const config = {
    headers: {
      'Authorization': `Bearer ${token}`,
    }
  }

  const [showToast, setShowToast] = useState(false);

  const addItem = () => {
    console.log('adding...');
    const temp: PreventiveMaintenance = {
      branch_location: 1,
      title: title,
      date: dateValue?.getTime().toString().substring(0, 9),
      description: description,
      reminder1: reminder1Value?.getTime().toString().substring(0, 9),
      reminder2: reminder2Value?.getTime().toString().substring(0, 9),
    };
    console.log(temp);
    axios.post(url, temp, config).then(res => {
      console.log(res);
      if (res.status === 201) {
        navigate('/list');
      } else {
        if (res.status === 400) {
          setShowToast(true);
          const timer = setTimeout(() => setShowToast(false), 3000);
        }
      }
    })
  }

  const navigate = useNavigate();

  const [branch_location, setBranch_location] = useState<number | null>(null);
  const [title, setTitle] = useState<string | null>(null);
  const [description, setDescription] = useState<string | null>(null);
  const [dateValue, setDateValue] = useState<Date | null>(null);
  const [reminder1Value, setReminder1Value] = useState<Date | null>(null);
  const [reminder2Value, setReminder2Value] = useState<Date | null>(null);


  const handleChangeBranchLocation = (newValue: number | null) => {
    setBranch_location(newValue);
  };

  const handleChangeTitle = (newValue: string | null) => {
    setTitle(newValue);
  };

  const handleChangeDescription = (newValue: string | null) => {
    setDescription(newValue);
  };

  const handleChangeDateValue = (newValue: Date | null) => {
    setDateValue(newValue);
  };

  const handleChangeReminder1Value = (newValue: Date | null) => {
    setReminder1Value(newValue);
  };

  const handleChangeReminder2Value = (newValue: Date | null) => {
    setReminder2Value(newValue);
  };

  return (
    <div>
      <Snackbar
        open={showToast}
        onClose={() => { console.log('closed') }}
        key={'a'}
      >
        <Alert severity="warning">Verifique las credenciales ingresadas.</Alert>
      </Snackbar>
      <div>
        <Card sx={{
          paddingLeft: 3,
          paddingRight: 3,
          maxWidth: 1820,
          minHeight: 900,
          marginBottom: 5,
          marginTop: 5,
          marginLeft: 10,
          marginRight: 10,
          opacity: 0.98,
        }}>
          <CardContent>
            <Typography sx={{ fontWeight: 600 }} gutterBottom variant="h5" component="div" align='left'>
              Registro de Mantenimiento Preventivo
            </Typography>
            <hr />
            <Typography sx={{ marginBottom: 2 }} variant="body2" color="text.secondary" align='left'>
              Complete los campos del formulario.
            </Typography>
            <div className='row'>
              <div className='col-md-6 spaced'>
                <TextField fullWidth id="username" label="Sede y Ubicación" variant="outlined" onChange={(e) => { console.log('') }} />
              </div>
              <div className='col-md-6 spaced'>
                <TextField fullWidth id="password" label="Dirección" variant="outlined" onChange={(e) => { setBranch_location(parseInt(e.target.value)) }} />
              </div>
              <div className='col-md-12 spaced'>
                <TextField fullWidth id="username" label="Título" variant="outlined" onChange={(e) => { setTitle(e.target.value) }} />
              </div>
              <div className='col-md-12 spaced'>
                <TextField fullWidth id="password" label="Descripción" variant="outlined" onChange={(e) => { setDescription(e.target.value) }} />
              </div>

            </div>

            <div className='row'>
              <div className='col-md-3 spaced'>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DesktopDatePicker
                    label="Fecha programada"
                    inputFormat="dd/MM/yyyy"
                    value={dateValue}
                    onChange={handleChangeDateValue}
                    renderInput={(params: any) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </div>
              <div className='col-md-3 spaced'>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DesktopDatePicker
                    label="Fecha recordatorio 1"
                    inputFormat="dd/MM/yyyy"
                    value={reminder1Value}
                    onChange={handleChangeReminder1Value}
                    renderInput={(params: any) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </div>
              <div className='col-md-3 spaced'>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DesktopDatePicker
                    label="Fecha recordatorio 2"
                    inputFormat="dd/MM/yyyy"
                    value={reminder2Value}
                    onChange={handleChangeReminder2Value}
                    renderInput={(params: any) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </div>
            </div>
            <div className='col-md-12 spaced button-right fullWidth'>
              <Button sx={{ fontWeight: 700 }} variant="contained" onClick={addItem}>AGREGAR</Button>
            </div>
          </CardContent>
          {/* </CardActionArea> */}
          <CardActions>

          </CardActions>
        </Card>

      </div>
    </div>
  )
}

export default Createview