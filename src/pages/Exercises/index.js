import React, {useEffect, useState} from 'react';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import styled from 'styled-components';
import { Divider, InputLabel, Select } from '@material-ui/core';
import ExercisesModal from '../../components/exercisesModal.component';
import {Close} from '@material-ui/icons';

import ExercisesHook from '../../hooks/exercises.hook';
import ExerciseHook from '../../hooks/exercise.hook';

const CustomFormWrapper = styled('div')`
    display: flex;
    align-items: center;
    gap: 8px;
    margin-top: 8px;
`;

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
}));

export default function SignUp() {
  const classes = useStyles();
  
  const {
    quantity,
    setQuantity,
    exerciseList,
    translateExercise,
    handleChange,
    handleSubmit,
    handleDeleteExercise,
    handleGenerateExercise,
    setShow,
    show,
    handleCloseModal,
    userData
  } = ExercisesHook();

  const {
    handleOpenExercise
} = ExerciseHook();

  return (
    <Container component="main" maxWidth="lg">
        <Typography component="h2" variant="h4" color="primary" gutterBottom>
            EXERCÍCIOS
        </Typography>
        <Typography>
            Gere uma sequência de exercícios para fazer sua Ginástica Laboral:
        </Typography>
        <div className={classes.paper}>
            <form className={classes.form} onSubmit={(e) => handleSubmit(e)}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={4}>
                            <FormControl variant="filled" fullWidth className={classes.formControl}>
                                <InputLabel htmlFor="filled-age-native-simple">Exercícios para: </InputLabel>
                                <Select
                                    native
                                    onChange={handleChange}
                                    inputProps={{
                                        name: 'age',
                                        id: 'filled-age-native-simple',
                                    }}
                                    fullWidth
                                    required
                                >
                                    <option value={''}></option>
                                    <option value={'neck'}>Pescoço</option>
                                    <option value={'spine'}>Coluna</option>
                                    <option value={'hands'}>Mão</option>
                                    <option value={'eyes'}>Olhos</option>
                                    <option value={'legsAndFeet'}>Pernas e pés</option>
                                    <option value={'arm'}>Braços</option>
                                </Select>
                            </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <CustomFormWrapper>
                                    <Typography variant='h6'>
                                        Quantidade de grupo de exercícios:
                                    </Typography>
                                    <CustomFormWrapper>
                                        <TextField
                                            variant="outlined"
                                            required
                                            type={'number'}
                                            fullWidth
                                            id="numeroQtd"
                                            size="small"
                                            label="Qtd."
                                            name="numeroQtd"
                                            value={quantity}
                                            onChange={(e) => setQuantity(e.target.value)}
                                        />
                                    </CustomFormWrapper>
                                </CustomFormWrapper>
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <br/>
                                <Divider />
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}
                                >
                                    Incluir
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Grid item xs={12} sm={12}>
                            <Typography component="h2" variant="h4" color="primary" gutterBottom>
                                Lista de exercícios
                            </Typography>
                            {exerciseList?.map((item) => (
                                <Box pt={2} key={item.exercise}>
                                    <Card>
                                        <CardContent>
                                            <Box display={'flex'} justifyContent="space-between">
                                                <Typography>
                                                    Tipo de exercício: <b>{translateExercise(item.exercise)}</b>
                                                </Typography>
                                                <Tooltip title="Quantidade de exercícios">
                                                    <Typography>
                                                        Quantidade: <b>{item.quantity}</b>
                                                    </Typography>
                                                </Tooltip>
                                                <Tooltip title="Remover exercício">
                                                    <Button variant="outlined" onClick={() => handleDeleteExercise(item.exercise)}>
                                                        <Close/>
                                                    </Button>
                                                </Tooltip>
                                            </Box>
                                        </CardContent>
                                    </Card>
                                </Box>
                            ))}
                            <br/>
                            <Divider />
                            <Button
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                onClick={() => handleGenerateExercise()}
                                disabled={!exerciseList.length > 0}
                            >
                                Gerar exercícios
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </form>
        </div>

        <ExercisesModal {...{userData, setShow, show, handleCloseModal,handleOpenExercise, buttonLabel: "Começar série", modalTitle: "Lista de grupo de exercícios gerados"}}/>

    </Container>
  );
}