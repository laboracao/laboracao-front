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
  const ruleDetail = !enableMedal ? `Complete ${rule} para ganhar ${color === 'gold' ? 'o trofeu' : 'a medalha'}.` : `Parábens!!! Você conquistou esse prêmio por ter completado ${rule} exercícios.` 

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