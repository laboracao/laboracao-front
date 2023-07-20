import React, {useContext, useEffect, useState} from "react";
import {Box, Grid, Typography, Tooltip} from '@material-ui/core';
import { Alert } from '@material-ui/lab';

import DefaultContext from '../../stores/defaultContext';
import {COLORS} from '../../styles/colors';
import Input from "../../components/input.component";
import Button from "../../components/button.component";

import SettingsHook from '../../hooks/settings.hook';

const Tab = ({activate, onClick, label}) => {
    return (
        <div onClick={onClick} style={{
            background: activate ? COLORS.secondary : 'transparent',
            padding: '10px',
            borderRadius: '12px',
            fontWeight: '900',
            color: activate ? COLORS.light0 : '#707070',
            cursor: 'pointer'
        }}>
            {label}
        </div>
    )
}

const Form = ({handleFormChange, formValues}) => {
    return (
        <div style={{display: 'flex', flexDirection: 'column', gap: '24px'}}>
            <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                <div style={{width: '30%'}}>
                    <Tooltip arrow title="Tem como objetivo preparar os funcionários para atividades de agilidade, força ou resistência.">
                        <Typography variant='h4'>
                            GL Preparatória:
                        </Typography>
                    </Tooltip>
                </div>
                <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                    <Input
                        variant="outlined"
                        size="small"
                        type="number"
                        fullWidth
                        id="hora1"
                        label="Hora"
                        name="hora1"
                        autoComplete="lname"
                        onChange={handleFormChange}
                        value={'' || formValues.hora1}
                    />
                    <p>:</p>
                    <Input
                        variant="outlined"
                        type="number"
                        fullWidth
                        id="minuto1"
                        size="small"
                        label="Minuto"
                        name="minuto1"
                        autoComplete="lname"
                        onChange={handleFormChange}
                        value={'' || formValues.minuto1}
                    />
                </div>
            </div>
            <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                <div style={{width: '30%'}}>
                    <Tooltip arrow title="Tem como objetivo amenizar as tensões, fortalecer as musculaturas, além de prevenir os vícios de postura.">
                        <Typography variant="h4">GL Compensatória:</Typography>
                    </Tooltip>
                </div>
                <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                    <Input
                        variant="outlined"
                        type="number"
                        fullWidth
                        id="hora2"
                        size="small"
                        label="Hora"
                        name="hora2"
                        autoComplete="lname"
                        onChange={handleFormChange}
                        value={'' || formValues.hora2}
                    />
                    <p>:</p>
                    <Input
                        variant="outlined"
                        type="number"
                        fullWidth
                        id="minuto2"
                        size="small"
                        label="Minuto"
                        name="minuto2"
                        autoComplete="lname"
                        onChange={handleFormChange}
                        value={'' || formValues.minuto2}
                    />
                </div>
            </div>
            <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                <div style={{width: '30%'}}>
                    <Tooltip arrow title="Tem como objetivo promover o alongamento da musculatura.">
                        <Typography variant="h4">GL Relaxamento:</Typography>
                    </Tooltip>
                    
                </div>
                <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                    <Input
                        variant="outlined"
                        type="number"
                        fullWidth
                        id="hora3"
                        size="small"
                        label="Hora"
                        name="hora3"
                        autoComplete="lname"
                        onChange={handleFormChange}
                        value={'' || formValues.hora3}
                    />
                    <p>:</p>
                    <Input
                        variant="outlined"
                        type="number"
                        fullWidth
                        id="minuto3"
                        size="small"
                        label="Minuto"
                        name="minuto3"
                        autoComplete="lname"
                        onChange={handleFormChange}
                        value={'' || formValues.minuto3}
                    />
                </div>
            </div>
        </div>
    )
}

const FormWater = ({handleFormChange, formValues}) => {
    return (
        <div style={{display: 'flex', flexDirection: 'column', gap: '24px'}}>
            <div style={{display: 'flex', flexDirection: 'column', gap: '8px'}}>
                <div>
                    <Typography variant="h6">Beber água a cada:</Typography>
                </div>
                <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                    <div>
                        <small style={{fontSize: '12px', color: '#fff'}}>Hora: </small>
                        <Input
                            variant="outlined"
                            type="number"
                            fullWidth
                            id="hora4"
                            size="small"
                            placeholder="Hora"
                            name="hora4"
                            autoComplete="lname"
                            onChange={handleFormChange}
                            value={'' || formValues.hora4}
                            format="input"
                            style={{background: "#fff", borderRadius: '12px'}}
                        />
                    </div>
                    <p>:</p>
                    <div>
                        <small style={{fontSize: '12px', color: '#fff'}}>Minuto: </small>
                        <Input
                            variant="outlined"
                            type="number"
                            fullWidth
                            id="minuto4"
                            size="small"
                            placeholder="Minuto"
                            name="minuto4"
                            autoComplete="lname"
                            inputProps={{min: formValues.hora4 == 0 ? 1 : 0}}
                            onChange={handleFormChange}
                            value={'' || formValues.minuto4}
                            style={{background: "#fff", borderRadius: '12px'}}
                        />
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

const Settings = () => {

    const {isMobile} = useContext(DefaultContext);
    const [tabActive, setTabActive] = useState('seg');

    const {
        handleSubmit,
        handleChangeV2,
        formValues,
        handleFormChange
    } = SettingsHook();

    useEffect(() => {
        handleChangeV2(tabActive)
    }, [tabActive])

    return(
        <div>
            <Alert severity="info" >
                Para receber as notificações, é necessário se manter logado(a) no sistema, manter a aba aberta, ativar as notificações no navegador e no sistema operacional.
            </Alert>

            <form 
                onSubmit={(e) => handleSubmit(e)}
                style={{
                    display: 'flex',
                    flexDirection: isMobile ? 'column' : 'row',
                    gap: isMobile ? 24 : 0,
                    width: '100%'
                }}
            >

                <div 
                    style={{
                        width: '100%',
                        paddingTop: 24,
                        paddingRight: 24,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 24
                    }}

                >
                    <Typography component="h4" variant="h4" gutterBottom>
                        Configurações do usuário
                    </Typography>

                    <Box pt={2}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={12}>
                                <div style={{display: 'flex', gap: 16}}>
                                    <Tab activate={tabActive === 'seg'} label="Seg" onClick={() => setTabActive('seg')}/>
                                    <Tab activate={tabActive === 'ter'} label="Ter" onClick={() => setTabActive('ter')}/>
                                    <Tab activate={tabActive === 'qua'} label="Qua" onClick={() => setTabActive('qua')}/>
                                    <Tab activate={tabActive === 'qui'} label="Qui" onClick={() => setTabActive('qui')}/>
                                    <Tab activate={tabActive === 'sex'} label="Sex" onClick={() => setTabActive('sex')}/>
                                    <Tab activate={tabActive === 'sab'} label="Sab" onClick={() => setTabActive('sab')}/>
                                    <Tab activate={tabActive === 'dom'} label="Dom" onClick={() => setTabActive('dom')}/>
                                </div>

                                <div style={{marginTop: 24}}>
                                    <Form {...{formValues, handleFormChange}} />
                                </div>
                            </Grid>
                        </Grid>
                    </Box>
                    {!isMobile && (
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            format="input"
                            label="Salvar Configuração"
                        />
                    )}
                </div>
                <div style={{width: '100%', paddingTop: !isMobile ? 24 : 0}}>
                    <div style={{width: '100%', background: COLORS.secondary, borderRadius: '20px 0px 0px 20px', padding: '24px'}}>
                        <Typography variant="h2">Lembretes</Typography>
                        <Typography variant="h5">Beber água</Typography>
                        <div style={{marginTop: '24px'}}>
                            <FormWater {...{formValues, handleFormChange}}/>
                        </div>
                    </div>
                </div>

                {isMobile && (
                    <div style={{paddingRight: 24, width: '100%'}}>
                            <Button
                                fullWidth
                                type="submit"
                                variant="contained"
                                color="primary"
                                format="input"
                                label="Salvar Configuração"
                            />
                    </div>
                )}
            </form>
        </div>
    )
}

export default Settings;