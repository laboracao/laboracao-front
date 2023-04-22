import React, { useEffect } from 'react';
import LOGO2 from '../assets/logo2.png'
import HeaderV2 from '../components/header.v2.component';
import Menu from '../components/menu.component';
import {getPushNotification, removePushNotification, getPush} from '../services/api';
import { COLORS } from '../styles/colors';


export default function PersistentDrawerLeft({ children }) {

  const handleConvertDay = () => {
    const currentDate = new Date();
    const currentDayWeek = currentDate.getDay();

    switch(currentDayWeek){
      case 1:
        return 'seg';
      case 2:
        return 'ter';
      case 3:
        return 'qua';
      case 4:
        return 'qui';
      case 5:
        return 'sex';
      case 6:
        return 'sab';
      case 7:
        return 'dom';

      default:
        return 'dom'
    }
  }

  useEffect(() => {
    getPush();
  }, [])

  useEffect(() => {

    getPushNotification(handleConvertDay())
    return () => {
      removePushNotification()
    }
  }, [])

  return (
    <>
      <div style={{display: 'flex' }}>
        <div style={{display: 'flex', flexDirection: 'column', padding: ' 16px'}}>
          <div >
            <img src={LOGO2} style={{width: '45px'}} />
          </div>
          <div style={{height: '80%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
            <Menu />
          </div>
        </div>
        <div style={{ width: '100%',padding: '0px 0px 0px 24px', background: COLORS.light1, overflowY: 'auto', height: '100vh', maxHeight: '100vh', overflowX: 'hidden'}}>
          <HeaderV2 />
          {children}
        </div>
      </div>
    </>
  );
}
