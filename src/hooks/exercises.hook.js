import React, {useEffect, useState} from 'react';
import {API, getUserDataInStorage} from '../services/api'
import DashboardHook from './dashboard.hook';

const ExercisesHook = () => {

    const {_id} = getUserDataInStorage();
    const [value, setValue] = useState('');
    const [quantity, setQuantity] = useState('');
    const [exerciseList, setExerciseList] = useState([]);
    const [generatedExercises, setGeneratedExercises] = useState([]);
    const [showExercisesModal, setShowExercisesModal] = useState(false);
    const [userData, setUserData] = useState({});

    console.log(_id);

    const translateExercise = (exercise) => {
        switch(exercise){
            case 'neck':
                return 'Pescoço';
            case 'spine':
                    return 'Coluna';
            case 'hands':
                return 'Mãos';
            case 'eyes':
                return 'Olhos';
            case 'legsAndFeet':
                return 'Pernas e pés';
            case 'arm':
                return 'Braços';
            default:
                return '';
        }
    }

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const filteredSettings = exerciseList.filter((item) => {return item.exercise !== value});
        setExerciseList([...filteredSettings, ...[{exercise: value, quantity}]])
    }

    const handleDeleteExercise = (exercise) => {
        const filteredSettings = exerciseList.filter((item) => {return item.exercise !== exercise});
        setExerciseList([...filteredSettings]);
    };

    const handleCloseModal = () => {
        setShowExercisesModal(false);
    };

    const handleGenerateExercise = () =>{
        // let data = {};

        // exerciseList.map((item) => {
        //     data[item.exercise] = item.quantity
        // });

        const data = {
            arm: "3",
            eyes: "3",
            hands: "4",
            legsAndFeet: "4",
            neck: "3",
            spine: "3"
        }

        API.post(`/users/${_id}/generate-exercises`, data).then((response) => {
            setUserData(response.data);
            setShowExercisesModal(true);
        }).catch((e) => {
            console.log(e)
        })
    };

    // useEffect(() => {
        // const {exercises} = generatedExercises;

        // setShowExercisesModal(true);

        // if(exercises?.length > 0){
        //     API.put(`/users/edit/${_id}`, {exercises: exercises}).then((response) => {
        //         setShowExercisesModal(true);
        //         setUserData(response.data);
        //     }).catch((e) => {
        //         console.log(e);
        //     });
        // }
    // }, [generatedExercises])

    return {
        value,
        setValue,
        quantity,
        setQuantity,
        exerciseList,
        setExerciseList,
        translateExercise,
        handleChange,
        handleSubmit,
        handleDeleteExercise,
        handleGenerateExercise,
        showExercisesModal,
        setShowExercisesModal,
        handleCloseModal,
        userData
    }
};

export default ExercisesHook;
