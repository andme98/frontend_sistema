import * as React from 'react';
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

export interface Step {
  question: string;
  image: string;
  value: number;
  alternatives: string[];
}

const questions: Step[] = [
  { question: '¿Cuál debería ser el nivel de estudios de mi candidato?', image: 'images-questions/Question_001.jpg', value: 1, alternatives: ['Secundaria completa','Estudios universitarios truncos','Estudios universitarios completos','Estudios de Postgrado','Carrera Técnica'] },
  { question: '¿Cuál debe ser la experiencia laboral de mi candidato ideal?', image: 'images-questions/Question_002.jpg', value: 2, alternatives: ['Administración de empresas','Militar','Abogado','Ingeniería/Arquitectura','Economista'] },
  { question: '¿Cuál debe ser el rango de edad ideal de mi candidato?', image: 'images-questions/Question_003.jpg', value: 3, alternatives: [' 30-40','41-50','51-60','61-70','71 a más'] },
  { question: '¿Cuál debería ser la antigüedad del partido de mi candidato ideal?', image: 'images-questions/Question_004.jpg', value: 4, alternatives: ['Menor a 1 año','De 1 a 2 años','De 3 a 4 años','De 5 a 6 años','De 6 años a más'] },
  { question: '¿Mi candidato ideal debería tener experiencia en política?', image: 'images-questions/Question_005.jpg', value: 5, alternatives: ['SI','NO'] },
  { question: ' ¿Cuál es el punto más importante del Plan de Gobierno de mi candidato?', image: 'images-questions/Question_006.jpg', value: 6, alternatives: ['Mejoramiento del transporte','Seguridad Ciudadana','Lucha contra la corrupción','Educación / Poblaciones vulnerables','Infraestructura'] },
];

const steps = ['', '', '', '', '', ''];

const Quizstepper = () => {

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
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
        // find the first step that has been completed
        steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

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
  return (
    <div>
      <Box sx={{ width: '100%' }}>
        <Stepper nonLinear activeStep={activeStep}>
          {steps.map((label, index) => (
            <Step key={Math.random()} completed={completed[index]}>
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
                      defaultValue="female"
                      name="radio-buttons-group"
                    >
                      {
                        questions[activeStep].alternatives.map(string => {
                          return(
                            <div>
                              <FormControlLabel value={string} control={<Radio />} label={string} />
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
                <Button
                  color="inherit"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                >
                  ANTERIOR
                </Button>
                <Box sx={{ flex: '1 1 auto' }} />
                <Button variant="contained" onClick={handleNext} sx={{ mr: 1 }}>
                  SIGUIENTE
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