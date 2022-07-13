import React, {useState, useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import RadioGroup from '@material-ui/core/RadioGroup';
import styled from 'styled-components';
import { Divider, Box, Button, CardContent, Card } from '@material-ui/core';
import {COLORS} from '../../styles/colors';

import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import StopIcon from '@material-ui/icons/Stop';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PauseIcon from '@material-ui/icons/Pause';

import Modal from '../../components/modal.component';

import ExerciseHook from '../../hooks/exercise.hook';

const CustomRadioGroup = styled(RadioGroup)`
    flex-direction: row;
`;

const CustomFormWrapper = styled('div')`
    display: flex;
    align-items: center;
    gap: 8px;
    margin-top: 8px;
`;

const TimeBar = styled('div')`
  width: 100%;
  height: 20px;
  background: #ccc;
`

const TimeBarWrapper = styled('div')`
  height: 100%;
  background: ${COLORS.primary};
  width: ${(props) => props.barWidth && props.barWidth}%;
  display: block;
`

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(0),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  root: {
    width: '100%',
    justifyContent: 'space-between',
    display: 'flex',
    paddingTop: theme.spacing(3)
  },
}));

export default function SignUp() {
  const classes = useStyles();
  const {
    exerciseData,
    allExercises,
    handleNewExercise,
    barWidth,
    handlePause,
    setShow,
    show,
    handleClose,
    cheat,
    handleFinishExercises
  } = ExerciseHook();

  return (
    <Container component="main" maxWidth="lg">
        
        <Typography component="h2" variant="h4" color="primary" gutterBottom>
          {exerciseData?.title}
        </Typography>
        
        <Typography>
          {exerciseData?.time} segundos || Repetições: {exerciseData?.repeatLimit}
        </Typography>
        
        <div className={classes.paper}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <Box pt={2}>
                        <img src={exerciseData?.image?.url} style={{width: '100%'}} alt="img" />
                    </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Box pt={2}>
                        <Typography>
                          {exerciseData?.description}
                        </Typography>
                        <br/>
                        <Divider />
                        <TimeBar>
                          <TimeBarWrapper barWidth={barWidth}></TimeBarWrapper>
                        </TimeBar>
                        <div className={classes.root}>
                            {exerciseData.prevId && (
                              <Button variant="contained" size='medium' color="default" onClick={() => handleNewExercise(exerciseData.prevId)}>
                                <SkipPreviousIcon />
                              </Button>
                            )}
                            {/* <Button variant="contained" size='medium' color="secondary">
                              <StopIcon />
                            </Button> */}
                            <Button variant="contained" size='medium' color="primary" onClick={() => handlePause(false)}>
                              <PlayArrowIcon />
                            </Button>
                            <Button variant="contained" size='medium' color="secondary" onClick={() => handlePause(true)}>
                              <PauseIcon />
                            </Button>
                            {exerciseData.nextId && (
                              <Button variant="contained" size='medium' color="default" onClick={() => handleNewExercise(exerciseData.nextId)}>
                                <SkipNextIcon />
                              </Button>
                            )}
                        </div>
                    </Box>
                </Grid>
            </Grid>
        </div>

        <Modal {...{setShow, show, onClick: handleFinishExercises, buttonLabel: "Ok, finalizar série", modalTitle: "Fim da série"}}>
          <Box width={"100%"}>
            <Card>
              <CardContent>
                <Typography component="h2" variant="h5" color="primary" gutterBottom>Dica</Typography>
                <div
                  dangerouslySetInnerHTML={{__html: cheat?.textoDaDica?.html}}
                />
              </CardContent>
            </Card>
          </Box>
          
        </Modal>
    </Container>
  );
}