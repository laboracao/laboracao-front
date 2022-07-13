import React, {useState, useEffect} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import styled from 'styled-components';
import { Divider } from '@material-ui/core';

import SettingsHook from '../../hooks/settings.hook';

const CustomRadioGroup = styled(RadioGroup)`
    flex-direction: row;
`;

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
    value,
    hora1,
    setHora1,
    hora2,
    setHora2,
    hora3,
    setHora3,
    hora4,
    setHora4,
    minuto1,
    setMinuto1,
    minuto2,
    setMinuto2,
    minuto3,
    setMinuto3,
    minuto4,
    setMinuto4,
    handleSubmit,
    handleChange
  } = SettingsHook();

  return (
    <Container component="main" maxWidth="lg">
        <Typography component="h2" variant="h4" color="primary" gutterBottom>
        CONFIGURAÇÕES DO USUÁRIO
        </Typography>
        <div className={classes.paper}>
            <form className={classes.form} onSubmit={(e) => handleSubmit(e)}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <FormControl component="fieldset">
                            <FormLabel component="legend">Dia da semana</FormLabel>
                            <CustomRadioGroup aria-label="diaSemana" name="diaSemana" value={value} onChange={handleChange}>
                                <FormControlLabel value="dom" control={<Radio />} label="Dom" />
                                <FormControlLabel value="seg" control={<Radio />} label="Seg" />
                                <FormControlLabel value="ter" control={<Radio />} label="Ter" />
                                <FormControlLabel value="qua" control={<Radio />} label="Qua" />
                                <FormControlLabel value="qui" control={<Radio />} label="Qui" />
                                <FormControlLabel value="sex" control={<Radio />} label="Sex" />
                                <FormControlLabel value="sab" control={<Radio />} label="Sab" />
                            </CustomRadioGroup>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <CustomFormWrapper>
                            <Typography variant='h6'>
                                GL Preparatória (antes do expediente):
                            </Typography>
                            <CustomFormWrapper>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="hora1"
                                    size="small"
                                    label="Hora"
                                    name="hora1"
                                    autoComplete="lname"
                                    value={hora1}
                                    onChange={(e) => setHora1(e.target.value)}
                                />
                                <p>:</p>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="minuto1"
                                    size="small"
                                    label="Minuto"
                                    name="minuto1"
                                    autoComplete="lname"
                                    value={minuto1}
                                    onChange={(e) => setMinuto1(e.target.value)}
                                />
                            </CustomFormWrapper>
                        </CustomFormWrapper>
                    </Grid>
                    
                    <Grid item xs={12} sm={12}>
                        <CustomFormWrapper>
                            <Typography variant='h6'>
                                GL Compensatória (durante o expediente):
                            </Typography>
                            <CustomFormWrapper>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="hora2"
                                    size="small"
                                    label="Hora"
                                    name="hora2"
                                    autoComplete="lname"
                                    value={hora2}
                                    onChange={(e) => setHora2(e.target.value)}

                                />
                                <p>:</p>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="minuto2"
                                    size="small"
                                    label="Minuto"
                                    name="minuto2"
                                    autoComplete="lname"
                                    value={minuto2}
                                    onChange={(e) => setMinuto2(e.target.value)}

                                />
                            </CustomFormWrapper>
                        </CustomFormWrapper>
                    </Grid>

                    <Grid item xs={12} sm={12}>
                        <CustomFormWrapper>
                            <Typography variant='h6'>
                                GL Relaxamento (após o expediente):
                            </Typography>
                            <CustomFormWrapper>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="hora3"
                                    size="small"
                                    label="Hora"
                                    name="hora3"
                                    autoComplete="lname"
                                    value={hora3}
                                    onChange={(e) => setHora3(e.target.value)}

                                />
                                <p>:</p>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="minuto3"
                                    size="small"
                                    label="Minuto"
                                    name="minuto3"
                                    autoComplete="lname"
                                    value={minuto3}
                                    onChange={(e) => setMinuto3(e.target.value)}

                                />
                            </CustomFormWrapper>
                        </CustomFormWrapper>
                    </Grid>

                    <Grid item xs={12} sm={12}>
                        <CustomFormWrapper>
                            <Typography variant='h6'>
                                Lembrete para beber água a cada:
                            </Typography>
                            <CustomFormWrapper>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="hora4"
                                    size="small"
                                    label="Hora"
                                    name="hora4"
                                    autoComplete="lname"
                                    value={hora4}
                                    onChange={(e) => setHora4(e.target.value)}

                                />
                                <p>:</p>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="minuto4"
                                    size="small"
                                    label="Minuto"
                                    name="minuto4"
                                    autoComplete="lname"
                                    value={minuto4}
                                    onChange={(e) => setMinuto4(e.target.value)}

                                />
                            </CustomFormWrapper>
                        </CustomFormWrapper>
                    </Grid>
                </Grid>
                <br/>
                <Divider />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                >
                    Salvar Configuração
                </Button>
            </form>
        </div>
    </Container>
  );
}