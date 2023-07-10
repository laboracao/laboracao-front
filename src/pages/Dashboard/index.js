import React, {useEffect, useContext} from "react";
import moment from 'moment';
import {Box, Grid, Typography, Card, CardContent, Button} from '@material-ui/core';

import DefaultContext from '../../stores/defaultContext';

import CardV2 from "../../components/card.v2.component";

import Modal from "../../components/modal.component";
import ModalV2 from "../../components/modal.v2.component";

import ExercisesModal from '../../components/exercisesModal.component';
import DashboardHook from "../../hooks/dashboard.hook";
import ExercisesHook from "../../hooks/exercises.hook";

import FavoriteIcon from '@mui/icons-material/Favorite';
import HelpIcon from '@mui/icons-material/Help';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';


const Dashboard = () => {

    const {isMobile} = useContext(DefaultContext);

    const {
        show,
        setShow,
        showExercises,
        setShowExercises,
        userData,
        handleCloseModal,
        handleOpenExerciseModal,
        handleOpenExercise,
        termContent,
        handleAcceptTerm,
        showCheat,
        setShowCheat,
        showInformation,
        setShowInformation,
        informationContent,
        cheatContent,
        handleGetCheat,
        handleGetInformation
    } = DashboardHook();

    const {
        handleGenerateExercise,
        showExercisesModal,
        setShowExercisesModal
    } = ExercisesHook()

    useEffect(() => {
        if(showExercisesModal){
            setShowExercises(true);
        }
    }, [setShowExercises, showExercisesModal]);

    useEffect(() => {
        if(!showExercises){
            setShowExercisesModal(false);
        }
    }, [setShowExercisesModal, showExercises]);
    
    return(
        <div style={{display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: isMobile ? 24 : 0}}>
            <div style={{width: '100%', paddingTop: 24, paddingRight: '24px'}}>
                <Typography component="h4" variant="h4" gutterBottom>
                    {`Hoje, ${moment(new Date()).format('DD/MM/yyyy')}`}
                </Typography>

                <Box pt={3}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={4}>
                            <CardV2
                                label="Gerar exercícios"
                                icon={<FavoriteIcon />}
                                iconType="info"
                                onClick={() => handleGenerateExercise()}
                                background={'light0'}
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <CardV2
                                label="Mais Informações"
                                icon={<CheckCircleIcon />}
                                iconType="primary"
                                onClick={() => setShowInformation(true)}
                                background={'light0'}
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <CardV2
                                label="Dicas"
                                icon={<HelpIcon />}
                                iconType="success"
                                onClick={() => setShowCheat(true)}
                                background={'light0'}
                            />
                        </Grid>
                    </Grid>
                </Box>
                {userData?.exercises?.length > 0 && (
                    <Box pt={3}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={12}>
                                <CardV2
                                    title="Começar exercícios"
                                    subtitle="Ver série de exercícios"
                                    iconType="success"
                                    onClick={handleOpenExerciseModal}
                                    background={'primary'}
                                    height={100}
                                />
                            </Grid>
                        </Grid>
                    </Box>
                )}
                
                <ModalV2
                    {...{
                        setShow,
                        show,
                        actionModal: handleAcceptTerm,
                        actionModalLabel: "Aceitar",
                        modalTitle: termContent.titulo
                    }}>
                        <div
                            dangerouslySetInnerHTML={{__html: termContent?.conteudo?.html}}
                        />
                </ModalV2>

                <ModalV2
                    {...{
                        show: showInformation,
                        setShow: setShowInformation,
                        modalTitle: "Informações sobre Ginástica Laboral"
                    }}>
                    
                    <Box width={"100%"} display={"flex"} gridGap={"16px"} pb={"16px"}>
                        <Button variant="outlined" color="primary" onClick={() => handleGetInformation(0)}>
                            Benefícios da ginástica laboral
                        </Button>

                        <Button variant="outlined" color="primary" onClick={() => handleGetInformation(1)}>
                            Tipos de ginástica laboral
                        </Button>
                    </Box>

                    {informationContent?.textoDaInformacao && (
                        <Box width={"100%"}>
                            <Card>
                                <CardContent>
                                    <Typography component="h2" variant="h6" color="primary" gutterBottom>
                                        {informationContent?.titulo}
                                    </Typography>

                                    <div
                                        dangerouslySetInnerHTML={{__html: informationContent?.textoDaInformacao?.html}}
                                    />
                                </CardContent>
                            </Card>
                        </Box>
                    )}
                    
                </ModalV2>

                <ModalV2
                    {...{
                        show: showCheat,
                        setShow: setShowCheat,
                        modalTitle: 'Dicas'
                    }}>
                    
                    <Box width={"100%"} display={"flex"} gridGap={"16px"} pb={"16px"}>
                        <Button variant="outlined" color="primary" onClick={() => handleGetCheat("postura")}>
                            Melhor postura
                        </Button>

                        <Button variant="outlined" color="primary" onClick={() => handleGetCheat("computador")}>
                            Postura correta ao sentar em frente ao computador
                        </Button>

                        <Button variant="outlined" color="primary" onClick={() => handleGetCheat("ergonomia")}>
                            Ergonomia
                        </Button>
                    </Box>

                    {cheatContent?.textoDaDica && (
                        <Box width={"100%"}>
                            <Card>
                                <CardContent>
                                    <div
                                        dangerouslySetInnerHTML={{__html: cheatContent?.textoDaDica?.html}}
                                    />
                                </CardContent>
                            </Card>
                        </Box>
                    )}
                    
                </ModalV2>

                <ExercisesModal
                    {...{
                        userData,
                        setShow: setShowExercises,
                        show: showExercises,
                        handleCloseModal,
                        handleOpenExercise,
                        buttonLabel: "Começar série",
                        modalTitle: "Lista de grupo de exercícios"
                    }}
                />
            </div>
            {/* <div style={{width: '100%', paddingTop: 24}}>
                <div style={{width: '100%', background: COLORS.secondary, borderRadius: '20px 0px 0px 20px', padding: '24px'}}>
                    Gamification
                </div>
            </div> */}
        </div>
        
    )
}

export default Dashboard;