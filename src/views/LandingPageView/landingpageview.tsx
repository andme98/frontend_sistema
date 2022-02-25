import { Button, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom';

const Landingpageview = () => {

    const navigate = useNavigate();

    const navigateButton = () => {
        console.log('redirecting...');
        navigate('/encuesta');
    }

    return (
        <div>
            <div className='absolute'>
                <img className='landing-img' src="https://www.incimages.com/uploaded_files/image/1920x1080/getty_537463312_393055.jpg" alt="" />
            </div>
            <div className='row margined-top absolute'>
                <div className='col-md-4 col-sm-10 col-lg-4 margined'>
                    <Typography sx={{ color: '#FF5F00', fontWeight: 700, fontSize: 50 }}>
                        ¿CUÁL ES TU CANDIDATO IDEAL?
                    </Typography>
                    <Typography >
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                        consequat. 
                    </Typography>
                    <div>
                        <Button onClick={navigateButton} sx={{ backgroundColor: '#FF5F00', marginTop: 2 }} variant="contained">PARTICIPA AQUÍ</Button>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Landingpageview