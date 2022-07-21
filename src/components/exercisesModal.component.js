import React, {useState, useEffect} from 'react';
import {Box, Card, CardContent, Typography} from '@material-ui/core';
import Modal from './modal.component';
import styled from 'styled-components';
import {API, getUserDataInStorage} from '../services/api';

const CustomCard = styled(Card)`
    border-radius: 0px;
`;

const CustomCardContent = styled(CardContent)`
    display: flex;
    gap: 16px;
    padding: 8px;
`

const ExercisesModal = ({setShow, show, handleCloseModal, handleOpenExercise, buttonLabel, modalTitle}) => {

    const {_id} = getUserDataInStorage();
    const [userData, setUserData] = useState({});

    useEffect(() => {
        if(show){
            API.get(`/users/${_id}`).then((response) => {
                setUserData(response.data);
            }).catch((e) => {
                console.log(e)
            })
        }
    }, [show]);


    return (
        <Modal {...{setShow, show, onClick: handleOpenExercise, buttonLabel, modalTitle, onClose: handleCloseModal}}>
            {userData?.exercises?.map((item) => (
                <Box p={0} key={item?.nomeDoExercicio} width={'100%'}>
                    <CustomCard>
                        <CustomCardContent>
                            <Typography variant="h6">
                                {item.nomeDoExercicio}
                            </Typography>
                            <Box display={'flex'} style={{gap: '12px', flexFlow: 'wrap'}}>
                                {item.exercises.map((subitem) => (
                                    <Box key={subitem?.title}>
                                        <Typography>
                                            {subitem.title}
                                        </Typography>
                                        <Typography>
                                            Nº repetições: <b>{subitem.repeatLimit}</b>
                                        </Typography>
                                    </Box>
                                ))}
                            </Box>
                        </CustomCardContent>
                    </CustomCard>
                </Box>
            ))}
        </Modal>
    )
};

export default ExercisesModal;

