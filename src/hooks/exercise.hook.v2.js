import {useEffect, useState} from 'react';
import {useHistory, useParams} from 'react-router-dom';
import {API} from '../services/api'
import DashboardHook from './dashboard.hook';

let timeInterval = false;
let counter = 0;
let repeatCounter = 0;

const ExerciseHook = () => {

    const {_id} = DashboardHook();
    const {id} = useParams();
    const history = useHistory();

    const [exerciseData, setExerciseData] = useState({});
    const [allExercises, setAllExercises] = useState([]);
    const [barWidth, setBarWidth] = useState(0);
    const [count, setCount] = useState(0);
    const [repeatCount, setRepeatCount] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [show, setShow] = useState(false);
    const [cheat, setCheat] = useState({});
    const [showSentence, setShowSentence] = useState(false);
    const [sentence, setSentence] = useState({});
    const [play, setPlay] = useState(false);

    const handleClose = () => {
        setShow(false);
    };

    const handleFinishExercises = () => {
        handleClose();
        API.get(`/users/${_id}/finish-exercises`).then((response) => {
            history.push(`/dashboard`);
        }).catch((e) => {
            console.log(e)
        })
    }

    const handleGetCheat = () => {
        API.get('/cheats/geral').then((response) => {
            const {data} = response;
            let number = parseInt(((Math.random() * (data.cheats.length))));
            setCheat(data.cheats[number])
        }).catch((e) => {
            console.log(e)
        })
    }

    const handleOpenExercise = () => {
        return null
    };

    const handleStartCount = () => {
        timeInterval = setInterval(() => {
            if(!isPaused){
                setCount(counter + 1);
                counter ++;
            }
        }, 1000);
    }

    const handlePause = (paused) => {
        if(!paused){
            setIsPaused(false);
        }else{
            setIsPaused(true);
        }
    }

    const handleStartExercise = (exercise) => {
        handleStartCount();
    }

    const handleGetExercises = (id) => {
        API.get(`/users/${_id}/exercises`).then((response) => {

            const {data} = response;
            const searchedExercise = data.find((item, index) => {
                if(item.id === id){
                    item.index = index;
                    item.nextId = index + 1 <= data.length - 1 ? data[index + 1].id: null;
                    item.prevId = index - 1 < 0 ? null : data[index - 1].id;
                    return item;
                }
            });
            setExerciseData(searchedExercise);
            setAllExercises(data);
        }).catch((e) => {
            console.log(e)
        }).finally(() => {
            setPlay(true);
        })
    };

    const handleRefreshCount = () => {
        setCount(0);
        setRepeatCount(0);
        setPlay(false);
        counter = 0;
        repeatCounter = 0;
    };

    const handleGetSentence = () => {
        API.get(`/sentences`).then((response) => {
            const {data} = response;
            setSentence(data);
        }).catch((e) => {
            console.log(e)
        })
    }

    const handleNewExercise = (id) => {
        handleRefreshCount();
        if(id){
            history.push(`/exercise/${id}`);
        }
        if(id === null){
            handleGetCheat();
            setShow(true);
            handleRefreshCount();
            clearInterval(timeInterval);
            handleGetSentence();
        }
    };
    

    useEffect(() => {
        const widthUnity = 100 / exerciseData.time;
        setBarWidth(widthUnity * count);
        if(count === exerciseData.time){
            setRepeatCount(repeatCounter + 1);
            repeatCounter ++;
            setCount(0);
            counter = 0;
            handleNewExercise(exerciseData.nextId);
        }
    }, [count, exerciseData, barWidth]);

    useEffect(() => {
        if(id){
            handleGetExercises(id);
        }
    }, [id]);

    console.log(id);
    useEffect(() => {
        handleRefreshCount();
        const timeout = setTimeout(() => {
            handleStartExercise(exerciseData);
        }, 8000)
        return () => {
            clearInterval(timeout);
            clearInterval(timeInterval);
        }
    }, [exerciseData]);

    useEffect(() => {
        if(!isPaused){
            handleStartCount();
        }else{
            clearInterval(timeInterval);
        }
    }, [isPaused]);


    return {
        handleOpenExercise,
        exerciseData,
        allExercises,
        handleNewExercise,
        barWidth,
        handlePause,
        show,
        setShow,
        handleClose,
        cheat,
        handleFinishExercises,
        isPaused,
        showSentence,
        setShowSentence,
        sentence,
        play, setPlay
    }
};

export default ExerciseHook;