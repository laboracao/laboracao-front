import React, {useEffect, useState} from 'react';
import {useHistory, useParams} from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
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

    const handlePause = (paused) => {
        setIsPaused(paused);
    }

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
        API.get(`/users/${_id}/exercises`).then((response) => {
            const {data} = response;
            history.push(`/exercise/${data[0].id}`);
        }).catch((e) => {
            console.log(e)
        })
    };

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
        })
    };

    const handleRefreshCount = () => {
        setCount(0);
        setRepeatCount(0);
        counter = 0;
        repeatCounter = 0;
    };

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
        }
    };

  useEffect(() => {
    timeInterval = setInterval(() => {
        if(!isPaused){
            setCount(counter + 1);
            counter ++;
        }
    }, 1000);
    return () => {
        clearInterval(timeInterval);
    }
  }, [isPaused]);

  useEffect(() => {

    const widthUnity = 100 / exerciseData.time;

    if(count === exerciseData.time){
      setRepeatCount(repeatCounter + 1);
      repeatCounter ++;
      setCount(0);
      counter = 0;
    }
    setBarWidth(widthUnity * count);
  }, [count, exerciseData, barWidth]);

  useEffect(() => {
    setTimeout(() => {
      if(exerciseData.repeatLimit === repeatCount){
        handleNewExercise(exerciseData.nextId);
        handleRefreshCount();
      }
    }, 1000)
  }, [repeatCount]);

    useEffect(() => {
        if(id){
            handleGetExercises(id);
        }
    }, [id]);

    useEffect(() => {
        return () => {
            counter = 0;
            repeatCounter = 0;
            clearInterval(timeInterval);
        }
    }, []);

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
        handleFinishExercises
    }
};

export default ExerciseHook;
