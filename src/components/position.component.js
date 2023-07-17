import { Typography, Tooltip } from "@material-ui/core";
import PersonIcon from '@mui/icons-material/Person';
import {COLORS} from '../styles/colors';


const Position = ({position, item}) => {

  return (
    <div style={{height: position === 1 ? '100%' : position === 2 ? '75%' : '50%'}}>
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%'}}>
        <Typography variant="h5"><b>{item?.exerciseCompleteCount}</b></Typography>
        <div style={{height: '100%', borderRadius: '20px', background: '#00000025', width:'80px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'center', padding: '16px'}}>
          <Tooltip title={item?.email} arrow>
            <div style={{
              background: COLORS[position === 1 ? 'primary' : position === 2 ? 'info' : 'success'],
              color: COLORS.light0,
              width: '45px',
              height: '45px',
              borderRadius: 100,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <PersonIcon />
            </div>
          </Tooltip>
        </div>
      </div>
    </div>
    
  )
};

export default Position;