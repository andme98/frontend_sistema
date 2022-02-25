import Quizstepper from '../../components/quiz-stepper/quizstepper'
import React, { useEffect, useState } from 'react'
import { Alert, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Snackbar, TextField, Typography } from '@mui/material'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Quizview = () => {
  return (
    <div>
      <Card sx={{ opacity: 0.95 }}>
        {/* <CardMedia
          sx={{ backgroundColor: 'black' }}
          component="img"
          width="40"
          image=""
          alt="green iguana"
        /> */}
        <CardContent>
          <div className='row'>
            <div className='col-md-12 stepper-centered'>
              <Quizstepper />
            </div>
          </div>
        </CardContent>
        {/* </CardActionArea> */}
        <CardActions>
        </CardActions>
      </Card>
    </div>


  )
}

export default Quizview