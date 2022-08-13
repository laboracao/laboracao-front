import React, {useEffect, useState} from "react";
import {Box, Grid, Typography, Divider, Container, Card, CardContent, Button} from '@material-ui/core';
import CardComponent from "../../components/card.component";
import Modal from "../../components/modal.component";
import ExercisesModal from '../../components/exercisesModal.component';
import DashboardHook from "../../hooks/dashboard.hook";
import ExerciseHook from "../../hooks/exercise.hook";
import ExercisesHook from "../../hooks/exercises.hook";

const Dashboard = () => {

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
    }, [showExercisesModal]);

    useEffect(() => {
        if(!showExercises){
            setShowExercisesModal(false);
        }
    }, [showExercises]);
    
    return(
        <Container component="main" maxWidth="lg">
            <Typography component="h2" variant="h4" color="primary" gutterBottom>
                HOME
            </Typography>
            <Box pt={2}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={4}>
                        <CardComponent title="Exercícios" ajust={'30px'} bg={3}>
                            <Button
                                color="primary"
                                variant="contained"
                                fullWidth
                                onClick={() => handleGenerateExercise()}
                            >
                                Gerar exercícios
                            </Button>
                        </CardComponent>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <CardComponent title="Informações" ajust={'120px'} bg={2} {...{action: () => setShowInformation(true)}}/>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <CardComponent title="Dicas" ajust={'40px'} bg={1} {...{action: () => setShowCheat(true)}}/>
                    </Grid>
                </Grid>
            </Box>
            {userData?.exercises?.length > 0 && (
                <Box pt={3}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={12}>
                            <CardComponent title="Ver série de exercícios" ajust={'170px'} ajustDesktop={'240px'} {...{action: handleOpenExerciseModal}} />
                        </Grid>
                    </Grid>
                </Box>
            )}
            
            <Modal {...{setShow, show, onClick: handleAcceptTerm, buttonLabel: "Aceitar", modalTitle: termContent.titulo}}>
                <div
                    dangerouslySetInnerHTML={{__html: termContent?.conteudo?.html}}
                />
            </Modal>

            <Modal {...{setShow: setShowCheat, show: showInformation, onClick: () => setShowInformation(false), buttonLabel: "Fechar", modalTitle: "Informações sobre Ginástica Laboral", width: 80}}>
                
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
                
            </Modal>

            <Modal {...{setShow: setShowCheat, show: showCheat, onClick: () => setShowCheat(false), buttonLabel: "Fechar", modalTitle: 'Dicas', width: 80}}>
                
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
                
            </Modal>

            <ExercisesModal {...{userData, setShow: setShowExercises, show: showExercises, handleCloseModal, handleOpenExercise, buttonLabel: "Começar série", modalTitle: "Lista de grupo de exercícios"}}/>
        </Container>
    )
}

export default Dashboard;