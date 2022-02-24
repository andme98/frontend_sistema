import { Button, Card, CardActions, CardContent, CardHeader, TextField, Typography } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { DesktopDatePicker, LocalizationProvider } from '@mui/lab';

const Listview = () => {

  const url = 'https://decor-infra.programmersarmy.net/api/maintenances';

  const [data, setData] = useState<any>();

  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  const addItem = () => {
    token ? navigate("/create") : console.log('No token!!');
  }

  const config = {
    headers: {
      'Authorization': `Bearer ${token}`,
    }
  }

  const [rows, setRows] = useState<any>([]);

  const loadList = async () => {
    console.log(token);
    const response = await axios.get(url, config).then(res => {

      console.log(res.data.data);
      const datasource: any[] = res.data.data;
      setRows(datasource);
      console.log(datasource);
      setData(datasource);
    })
  }

  useEffect(() => {
    loadList();
  }, [])

  /* function createData(
    branch_id: string,
    branch_location_address: string,
    created_at: number,
    date: number,
    title: string,
    branch_location_name: string,
    status_name: string,
  ) {
    return { branch_id, branch_location_address, created_at, date, title, branch_location_name, status_name };
  } */

  return (
    <div>
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
            <Typography variant="h5" sx={{ fontWeight: 600 }} gutterBottom component="div">Listado de Mantenimientos Preventivos</Typography>
            <div className=' button-right'>
              <Button sx={{ maxWidth: 100, fontWeight: 700, marginBottom: 2 }} variant="contained" onClick={addItem}>NUEVO</Button>
            </div>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 400, backgroundColor: 'whitesmoke' }} aria-label="simple table">
                <TableHead sx={{ backgroundColor: '#495959', color: 'whitesmoke' }}>
                  <TableRow>
                    <TableCell sx={{ color: 'whitesmoke', fontWeight: '700' }} align="center">Num. Mant.</TableCell>
                    <TableCell sx={{ color: 'whitesmoke', fontWeight: '700' }} align="center">Fecha</TableCell>
                    <TableCell sx={{ color: 'whitesmoke', fontWeight: '700' }} align="center">Título</TableCell>
                    <TableCell sx={{ color: 'whitesmoke', fontWeight: '700' }} align="right">Sede</TableCell>
                    <TableCell sx={{ color: 'whitesmoke', fontWeight: '700' }} align="right">Dirección</TableCell>
                    <TableCell sx={{ color: 'whitesmoke', fontWeight: '700' }} align="right">Estado</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row: any) => (
                    <TableRow
                      key={row.title}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell align="center" component="th" scope="row">
                        {row.branch_id}
                      </TableCell>
                      <TableCell align="center">{`${new Date(row.date).getDate()}/${new Date(row.date).getUTCMonth() + 1}/${new Date(row.date).getFullYear()}`}</TableCell>
                      <TableCell align="center">{row.title}</TableCell>
                      <TableCell align="right">{row.branch_name}</TableCell>
                      <TableCell align="right">{row.branch_location_address}</TableCell>
                      <TableCell align="right">{row.status_name}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
          {/* </CardActionArea> */}
          <CardActions>

          </CardActions>
        </Card>

      </div>
    </div>)
  {/* <div className='margin-centered'>
      <Typography variant="h5" sx={{ color: '#763909', fontWeight: '700'}}  gutterBottom component="div">Listado de Mantenimientos Preventivos</Typography>
      <div className=' button-right'>
        <Button sx={{ maxWidth: 100}} variant="contained" onClick={addItem}>NUEVO</Button>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 400, backgroundColor: 'whitesmoke' }} aria-label="simple table">
          <TableHead sx={{ backgroundColor: '#495959', color: 'whitesmoke'}}>
            <TableRow>
              <TableCell sx={{ color: 'whitesmoke', fontWeight: '700'}} align="center">Num. Mant.</TableCell>
              <TableCell sx={{ color: 'whitesmoke', fontWeight: '700'}} align="center">Fecha</TableCell>
              <TableCell sx={{ color: 'whitesmoke', fontWeight: '700'}} align="center">Título</TableCell>
              <TableCell sx={{ color: 'whitesmoke', fontWeight: '700'}} align="right">Sede</TableCell>
              <TableCell sx={{ color: 'whitesmoke', fontWeight: '700'}} align="right">Dirección</TableCell>
              <TableCell sx={{ color: 'whitesmoke', fontWeight: '700'}} align="right">Estado</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row: any) => (
              <TableRow
                key={row.title}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="center" component="th" scope="row">
                  {row.branch_id}
                </TableCell>
                <TableCell align="center">{`${new Date(row.date).getDate()}/${new Date(row.date).getUTCMonth() + 1}/${new Date(row.date).getFullYear()}`}</TableCell>
                <TableCell align="center">{row.title}</TableCell>
                <TableCell align="right">{row.branch_name}</TableCell>
                <TableCell align="right">{row.branch_location_address}</TableCell>
                <TableCell align="right">{row.status_name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div> )*/}

}

export default Listview