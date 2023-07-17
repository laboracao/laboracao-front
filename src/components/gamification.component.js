import { Typography } from '@material-ui/core';
import { useEffect, useState } from 'react';
import {API, getUserDataInStorage} from '../services/api';
import Medal from './medal.component';
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
            {yourGamificationData?.exerciseCompleteCount}
          </Typography>
        </div>
      </div>
      <div style={{display: 'flex', width: '60%', justifyContent: 'space-between', alignItems: 'flex-end', height: '200px'}}>
        <Position position={2} item={gamificationData[1]}/>
        <Position position={1} item={gamificationData[0]}/>
        <Position position={3} item={gamificationData[2]}/>
      </div>
      <div style={{width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 24}}>
        <Typography variant="h5" >
          <b>Suas conquistas</b>
        </Typography>
        <div style={{marginTop: '24px', display: 'flex', width: '60%', justifyContent: 'space-between', alignItems: 'flex-end'}}>
          <Medal color="bronze" rule={20} yourGamificationData={yourGamificationData}/>
          <Medal color="silver" rule={30} yourGamificationData={yourGamificationData}/>
          <Medal color="gold" rule={50} yourGamificationData={yourGamificationData}/>
        </div>
      </div>
      
    </div>
  )
};

export default Gamification;