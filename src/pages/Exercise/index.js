import React, {useContext, useEffect, useState} from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import styled from 'styled-components';
import { Box, CardContent, Card } from '@material-ui/core';
import {COLORS} from '../../styles/colors';

import ButtonComponent from '../../components/button.component';

import DefaultContext from '../../stores/defaultContext';

import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PauseIcon from '@material-ui/icons/Pause';

import Modal from '../../components/modal.component';
import ModalV2 from '../../components/modal.v2.component';

import SentenceModal from '../../components/sentenceModal.component';

import ExerciseHook from '../../hooks/exercise.hook.v2';

import NotifyAudio from '../../assets/notification.ogg'


const TimeBar = styled('div')`
  width: 100%;
  height: 20px;
  background: ${COLORS.secondary};
  border-radius: 20px;
  overflow: hidden;
  padding: 4px;
`

const TimeBarWrapper = styled('div')`
  height: 100%;
  background: ${COLORS.primary};
  width: ${(props) => props.barWidth && props.barWidth}%;
  display: block;
  border-radius: 20px;
`

export default function SignUp() {

  const {isMobile} = useContext(DefaultContext);

  const {
    enableButton,
    exerciseData,
    handleNewExercise,
    barWidth,
    handlePause,
    setShow,
    show,
    cheat,
    handleFinishExercises,
    sentence,
    showSentence,
    setShowSentence,
    isPaused,
    autoplay
  } = ExerciseHook();

  return (
    <div style={{display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: isMobile ? 24 : 0}}>
      <div style={{width: '100%', paddingTop: 24, paddingRight: '24px'}}>
          <Typography component="h4" variant="h4" gutterBottom>
            {exerciseData?.title}
          </Typography>

          <Typography variant="body1">
            {exerciseData?.time} segundos || Repetições: {exerciseData?.repeatLimit}
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <Box pt={2}>
                <div
                  style={{textAlign: '#707070'}}
                  dangerouslySetInnerHTML={{__html: exerciseData?.descricaoDoExercicio?.html}}
                />
                <br/>
                <TimeBar>
                  <TimeBarWrapper barWidth={barWidth}></TimeBarWrapper>
                </TimeBar>
                <div style={{display: 'flex', justifyContent: 'space-between', padding: '16px 0px 0px'}}>
                  {exerciseData.prevId && (
                    <ButtonComponent
                      label={<SkipPreviousIcon />}
                      variant="contained"
                      type="submit"
                      format="info"
                      onClick={() => handleNewExercise(exerciseData.prevId)}
                    />
                  )}

                  {isPaused && autoplay && (
                    <ButtonComponent
                      endIcon={<PlayArrowIcon />}
                      label={!enableButton ? 'O exercício vai começar' : 'Retomar exercício'}
                      variant="contained"
                      color="primary"
                      type="submit"
                      format="rounded"
                      disabled={!enableButton}
                      onClick={() => handlePause(false)}
                    />
                  )}

                  {isPaused && !autoplay && (
                    <ButtonComponent
                      endIcon={<PlayArrowIcon />}
                      label={'Começar exercício'}
                      variant="contained"
                      color="primary"
                      type="submit"
                      format="rounded"
                      onClick={() => handlePause(false)}
                    />
                  )}

                  {!isPaused && (
                    <div style={{display: 'flex', alignItems: 'center', gap: '4px'}}>
                      {/* <CircularProgress /> */}
                      <ButtonComponent
                        endIcon={<PauseIcon />}
                        label={'Pausar exercício'}
                        variant="contained"
                        color="primary"
                        type="submit"
                        format="rounded"
                        onClick={() => handlePause(true)}
                      />
                    </div>
                  )}

                  {exerciseData.nextId &&  (
                    <ButtonComponent
                      label={<SkipNextIcon />}
                      variant="contained"
                      type="submit"
                      format="success"
                      onClick={() => handleNewExercise(exerciseData.nextId)}
                    />
                  )}
                  
                </div>
              </Box>
            </Grid>
          </Grid>
      </div>
      
      <div style={{width: '100%', paddingTop: isMobile ? 0 : 24, marginBottom: 24}}>
          <div style={{width: '100%', background: COLORS.secondary, borderRadius: '20px 0px 0px 20px', padding: '24px'}}>
            {exerciseData?.image && (
              <img src={exerciseData?.image?.url} style={{width: '100%', borderRadius: '20px'}} alt="img" />
            )}
          </div>
      </div>
      

      <SentenceModal {...{setShow, show, onClick: () => setShowSentence(true), buttonLabel: "Ver dica", modalTitle: "Frase motivacional"}}>
        <Box width={"100%"}>
            <Card>
              <CardContent>
                <Typography component="h2" variant="h5" color="primary" gutterBottom>Frase</Typography>
                <div
                dangerouslySetInnerHTML={{__html: sentence?.sentence?.fraseCompleta?.html}}
              />
            </CardContent>
          </Card>
        </Box>
      </SentenceModal>

      <ModalV2
          {...{
            setShow: setShowSentence,
            show: showSentence,
            actionModal: handleFinishExercises,
            actionModalLabel: "Ok, finalizar série",
            modalTitle: "Fim da série"
          }}>
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
      </ModalV2>
    </div>
  );
}