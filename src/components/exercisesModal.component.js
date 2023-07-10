import React, {useState, useEffect} from 'react';
import {Box, CardContent, Typography} from '@material-ui/core';

import {COLORS} from '../styles/colors';

import ModalV2 from './modal.v2.component';


import styled from 'styled-components';
import {API, getUserDataInStorage} from '../services/api';

const CustomCardContent = styled(CardContent)`
    display: flex;
`;

const CustomTypograph = styled(Typography)`
    color: ${COLORS.gray0} !important;
`

const ExercisesTable = styled('div')`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 16px;

    .exercise-card{
        border-radius: 20px;
        box-shadow: 0px 0px 6px rgba(0,0,0,0.1);
        background: ${COLORS.light0};
    }

    .exercise-card:nth-child(2n+1){
        background: ${COLORS.light1}!important;
    }
`

const CustomBox = styled(Box)`
    padding: 20px;
    margin-bottom: 0px;
    display: flex;
    align-items: center;
    gap: 16px;
    img{
        border-radius: 20px;
        max-width: 100px;
    }

`

const ExercisesModal = ({setShow, show, handleCloseModal, handleOpenExercise, buttonLabel, modalTitle}) => {

    const {_id} = getUserDataInStorage();
    const [userData, setUserData] = useState({});

    useEffect(() => {
        if(show){
            API.get(`/users/${_id}`).then((response) => {
                console.log(response.data);
                setUserData(response.data);
            }).catch((e) => {
                console.log(e)
            })
        }
    }, [show, setUserData, _id]);


    return (
        <ModalV2
            {...{show, setShow, actionModal: handleOpenExercise, actionModalLabel: buttonLabel, modalTitle}}
        >
            <ExercisesTable>
                {userData?.exercises?.map((item) => (
                    <Box key={item?.nomeDoExercicio} width={'100%'} className='exercise-card'>
                        <Box p={2} pb={0}>
                            <Typography variant="h6" color='secondary'>
                                {item.nomeDoExercicio}
                            </Typography>
                        </Box>
                        <CustomCardContent>
                            <ExercisesTable>
                                {item.exercises.map((subitem) => (
                                    <CustomBox p={2} width={'100%'} key={subitem?.title} className='exercise-card'>
                                        <img src={subitem.image.url} />
                                        <div>
                                            <Typography>
                                                <b>{subitem.title}</b>
                                            </Typography>
                                            <CustomTypograph>
                                                Nº repetições: <b>{subitem.repeatLimit}</b>
                                            </CustomTypograph>
                                        </div>
                                    </CustomBox>
                                ))}
                            </ExercisesTable>
                        </CustomCardContent>
                    </Box>
                ))}
            </ExercisesTable>
        </ModalV2>
    )
};

export default ExercisesModal;

