import { Typography } from '@material-ui/core';
import { useEffect, useState } from 'react';
import {API, getUserDataInStorage} from '../services/api';
import Position from './position.component';

const Gamification = () => {

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;

  const {email} = getUserDataInStorage();
  const [gamificationData, setGamificationData] = useState({});
  const [yourGamificationData, setYourGamificationData] = useState({});

  const handleGetGamification = async () => {
    try{
      const response = await API.get(`/gamification/firsts/${currentMonth}/${currentYear}`);
      setGamificationData(response.data);
    }catch(e){
      console.log(e)
    };
    
  }

  const handleGetMyGamification = async () => {
    
    const data = {
      email,
      year: currentYear,
      month: currentMonth
    }

    try{
      const response = await API.post(`/gamification/user`, data);
      setYourGamificationData(response.data[0]);
    }catch(e){
      console.log(e)
    };
    
  }

  useEffect(() => {
    console.log(gamificationData);
  }, [gamificationData])

  useEffect(() => {
    console.log(yourGamificationData);
  }, [yourGamificationData])

  useEffect(() => {
    handleGetGamification();
    handleGetMyGamification();
  }, [])

  return (
    <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
      <div style={{display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center'}}>
        <div>
          <Typography variant="h1" >
            Maiores pontuadores
          </Typography>
          <Typography variant="h5">
            No mês <b>{currentMonth}</b>
          </Typography>
        </div>
        <div>
          <Typography variant="h5" >
            Seus pontos
          </Typography>
          <Typography variant="h1" color="primary">
            {yourGamificationData.exerciseCompleteCount}
          </Typography>
        </div>
      </div>
      <div style={{display: 'flex', width: '60%', justifyContent: 'space-between', alignItems: 'flex-end', height: '300px'}}>
        <Position position={2}/>
        <Position position={1}/>
        <Position position={3}/>
      </div>
    </div>
  )
};

export default Gamification;