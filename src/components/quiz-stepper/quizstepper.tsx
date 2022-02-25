import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import axios from 'axios';
import Modalsuccess from '../modal-success/modalsuccess';
import { Modal } from '@mui/material';
import { Navigate, useNavigate } from 'react-router-dom';

export interface Step {
  question: string;
  image: string;
  value: number;
  alternatives: string[];
}

export interface Answer {
  number_question: string;
  answer: string;
}

const questions: Step[] = [
  { question: '¿Cuál debería ser el nivel de estudios de mi candidato?', image: 'images-questions/Question_001.jpg', value: 1, alternatives: ['Secundaria completa', 'Estudios universitarios truncos', 'Estudios universitarios completos', 'Estudios de Postgrado', 'Carrera Técnica'] },
  { question: '¿Cuál debe ser la experiencia laboral de mi candidato ideal?', image: 'images-questions/Question_002.jpg', value: 2, alternatives: ['Administración de empresas', 'Militar', 'Abogado', 'Ingeniería/Arquitectura', 'Economista'] },
  { question: '¿Cuál debe ser el rango de edad ideal de mi candidato?', image: 'images-questions/Question_003.jpg', value: 3, alternatives: [' 30-40', '41-50', '51-60', '61-70', '71 a más'] },
  { question: '¿Cuál debería ser la antigüedad del partido de mi candidato ideal?', image: 'images-questions/Question_004.jpg', value: 4, alternatives: ['Menor a 1 año', 'De 1 a 2 años', 'De 3 a 4 años', 'De 5 a 6 años', 'De 6 años a más'] },
  { question: '¿Mi candidato ideal debería tener experiencia en política?', image: 'images-questions/Question_005.jpg', value: 5, alternatives: ['SI', 'NO'] },
  { question: ' ¿Cuál es el punto más importante del Plan de Gobierno de mi candidato?', image: 'images-questions/Question_006.jpg', value: 6, alternatives: ['Mejoramiento del transporte', 'Seguridad Ciudadana', 'Lucha contra la corrupción', 'Educación / Poblaciones vulnerables', 'Infraestructura'] },
];

const steps = ['', '', '', '', '', ''];

const urlPOST = 'https://ptsv2.com/t/eeqyb-1645741102/post';

const Quizstepper = () => {

  const [answer1, setAnswer1] = useState<Answer>();
  const [answer2, setAnswer2] = useState<Answer>();
  const [answer3, setAnswer3] = useState<Answer>();
  const [answer4, setAnswer4] = useState<Answer>();
  const [answer5, setAnswer5] = useState<Answer>();
  const [answer6, setAnswer6] = useState<Answer>();

  const answersSheet = [];

  const [open, setOpen] = useState<boolean>(false);

  const navigate = useNavigate();

  const getAnswers = (string: string, answer: string) => {
    let number: string = string.split(' ')[0];
    let response: string = answer;
    switch (number) {
      case '1':
        setAnswer1({ number_question: number, answer: response });
        break;
      case '2':
        setAnswer2({ number_question: number, answer: response });
        break;
      case '3':
        setAnswer3({ number_question: number, answer: response });
        break;
      case '4':
        setAnswer4({ number_question: number, answer: response });
        break;
      case '5':
        setAnswer5({ number_question: number, answer: response });
        break;
      case '6':
        setAnswer6({ number_question: number, answer: response });
        break;
      default:
        break;
    }
  }

  const showAnswers = () => {
    /* console.log(answer1);
    console.log(answer2);
    console.log(answer3);
    console.log(answer4);
    console.log(answer5);
    console.log(answer6); */
  }

  const submitAnswers = () => {
    console.log('Ha finalizado el formulario');
    let answersArray: any[] = [];
    answersArray.push(answer1);
    answersArray.push(answer2);
    answersArray.push(answer3);
    answersArray.push(answer4);
    answersArray.push(answer5);
    answersArray.push(answer6);
    console.log(answersArray);
    let answers_quiz = {
      'id': (Math.random() * 1000000000000000000),
      'answers': answersArray,
    }
    console.log(answers_quiz);
    setOpenModal(true);
    axios.post(urlPOST, answers_quiz).then(res => {
      if (res) {
        console.log('Se envió la data del cuestionario al método POST');
      } else {
        console.log('Error al enviar el formulario');
      }
    });
  }

  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState<{
    [k: number]: boolean;
  }>({});

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    if ((activeStep + 1) !== 6) {
      const newActiveStep =
        isLastStep() && !allStepsCompleted()
          ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
          : activeStep + 1;
      setActiveStep(newActiveStep);
    } else {
      console.log('acabaste');
      submitAnswers();
    }
  };

  const [openModal, setOpenModal] = useState(false);

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step: number) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };


  const handleClose = () => {
    setOpenModal(false);
  }

  const closeModal = () => {
    handleClose();
    navigate('/');
  }

  return (
    <div>
      <Modal
        onBackdropClick={closeModal}
        open={openModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{
          backgroundColor: 'whitesmoke',
          marginTop: 20,
          marginBottom: 40,
          marginLeft: 50,
          marginRight: 50,
          padding: 4,
          textAlign: 'center',
        }}>
          <Typography sx={{ textAlign: 'center', fontWeight: 700 }} id="modal-modal-title" variant="h6" component="h2">
            ENCUESTA FINALIZADA
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Simpatizas con: Popi Olivera
          </Typography>
          <div>
            <img src="https://www.expreso.com.pe/wp-content/uploads/2021/04/Diseno-sin-titulo-26.jpg" alt="" />
          </div>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Ha finalizado la encuesta. Agradecemos tu tiempo y confiamos en que tus respuestas aportarán a nuestra investigación.
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2, textAlign: 'right' }}>
            Atte. Equipo betsson
          </Typography>
          <div className='row'>
            <div className='col-md-12 button-rigth'>
              <Button sx={{ backgroundColor: 'orange', marginTop: 2 }} variant="contained" onClick={closeModal}>CERRAR</Button>
            </div>
          </div>
        </Box>
      </Modal>
      <Box sx={{ width: '100%' }}>
        <Stepper nonLinear activeStep={activeStep}>
          {steps.map((label, index) => (
            <Step key={Math.random() + 1} completed={completed[index]}>
              <StepButton color="inherit" onClick={handleStep(index)}>
                {label}
              </StepButton>
            </Step>
          ))}
        </Stepper>
        <div>
          {allStepsCompleted() ? (
            <React.Fragment>
              <Typography sx={{ mt: 2, mb: 1 }}>
                All steps completed - you&apos;re finished
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <Box sx={{ flex: '1 1 auto' }} />
                <Button onClick={handleReset}>Reset</Button>
              </Box>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <div style={{ marginTop: '40px', }} className='row'>
                <div className='col-md-6'>
                  <Typography sx={{ mt: 2, mb: 1, fontWeight: 700 }}>Pregunta {activeStep + 1}</Typography>
                  <Typography>{questions[activeStep].question}</Typography>
                  <FormControl>
                    {/* <FormLabel id="demo-radio-buttons-group-label">Seleccione una opción</FormLabel> */}
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      defaultValue=""
                      name="radio-buttons-group"
                    >
                      {
                        questions[activeStep].alternatives.map(string => {
                          return (
                            <div>
                              <FormControlLabel onChange={() => {
                                /* console.log((activeStep + 1) + ' ' + string); */
                                getAnswers(activeStep + 1 + ' ' + string, string);
                                showAnswers();
                              }} value={string} control={<Radio />} label={string} />
                            </div>
                          );
                        })
                      }
                    </RadioGroup>
                  </FormControl>
                </div>
                <div className='col-md-6'>
                  <img src={questions[activeStep].image} alt="imagen" />
                </div>
              </div>

              <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                {/* <Button
                  color="inherit"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                >
                  ANTERIOR
                </Button> */}
                <Box sx={{ flex: '1 1 auto' }} />
                <Button variant="contained" onClick={handleNext} sx={{ mr: 1 }}>
                  {activeStep + 1 === 6 ? 'GUARDAR' : 'SIGUIENTE'}
                </Button>
                {/* {activeStep !== steps.length &&
                  (completed[activeStep] ? (
                    <Typography variant="caption" sx={{ display: 'inline-block' }}>
                      Step {activeStep + 1} already completed
                    </Typography>
                  ) : (
                    <Button onClick={handleComplete}>
                      {completedSteps() === totalSteps() - 1
                        ? 'Finish'
                        : 'Complete Step'}
                    </Button>
                  ))} */}
              </Box>
            </React.Fragment>
          )}
        </div>
      </Box>
    </div>
  )
}

export default Quizstepper