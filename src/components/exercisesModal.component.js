import React from 'react';
import {Box, Card, CardContent, Typography} from '@material-ui/core';
import Modal from './modal.component';

const ExercisesModal = ({setShow, show, handleCloseModal, handleOpenExercise, buttonLabel, modalTitle, userData}) => {

    return (
        <Modal {...{setShow, show, onClick: handleOpenExercise, buttonLabel, modalTitle, onClose: handleCloseModal}}>
            {userData?.exercises?.map((item) => (
                <Box pb={2} key={item?.nomeDoExercicio} width={'100%'}>
                    <Card>
                        <CardContent>
                            <Box>
                                <Typography variant="h5">
                                    {item.nomeDoExercicio}
                                </Typography>
                            </Box>
                            <Box display={'flex'} style={{gap: '8px', flexFlow: 'wrap'}}>
                                {item.exercises.map((subitem) => (
                                    <Box pt={2} key={subitem?.title}>
                                        <Card>
                                            <CardContent>
                                                <Typography>
                                                    {subitem.title}
                                                </Typography>
                                                <Typography>
                                                    Nº repetições: <b>{subitem.repeatLimit}</b>
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    </Box>
                                ))}
                            </Box>
                        </CardContent>
                    </Card>
                </Box>
            ))}
        </Modal>
    )
};

export default ExercisesModal;

