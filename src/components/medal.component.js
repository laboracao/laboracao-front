import styled from 'styled-components';
import { Tooltip } from "@material-ui/core";

import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

const MedalWrapper = styled('div')`
  width: 80px;
  height: 80px;
  border-radius: 100px;
  background: #eee;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({disabled}) => disabled && '#00000025'};
  cursor: pointer;
  svg{
    fill: ${({color}) => color === 'gold' ? '#f3c74f' : color === 'silver' ? '#aaa' : color === 'bronze' ? '#cd7f32' : '#567'};
    fill: ${({disabled}) => disabled && '#00000025'};
    font-size: 40px;
  }

`

const Medal = ({color, rule, yourGamificationData}) => {

  const enableMedal = yourGamificationData?.exerciseCompleteCount >= rule;
  //Parabéns!!! Você conquistou esta medalha por ter completado 10 séries.
  const ruleDetail = !enableMedal ? `Complete ${rule} séries para ganhar ${color === 'gold' ? 'o trofeu' : 'a medalha'}.` : `Parabéns!!! Você conquistou ${color === 'gold' ? 'esse trofeu' : 'essa medalha'} por ter completado ${rule} séries.` 

  return (
    <Tooltip arrow title={ruleDetail} >
      <MedalWrapper color={color} disabled={!enableMedal}>
        {color === 'gold' ? (
          <EmojiEventsIcon/>
        ) : (
          <WorkspacePremiumIcon/>
        )}
      </MedalWrapper>
    </Tooltip>
  )
};

export default Medal;