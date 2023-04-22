import { useHistory, Link } from 'react-router-dom';
import {Typography} from '@material-ui/core';
import {COLORS} from '../styles/colors';
import { getUserDataInStorage, resetStorage, getUserIdInStorage } from '../services/api';

import PersonIcon from '@mui/icons-material/Person';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';

import ButtonComponent from '../components/button.component';

const HeaderV2 = () => {

    const history = useHistory();
    const userid = getUserIdInStorage();
    const userData = getUserDataInStorage();

    const handleLogout = async () => {
        try {
          resetStorage();
          history.push("/");
        } catch (error) {
          console.log(error)
        }
    }

    return (
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', height: '80px', paddingRight: '16px'}}>
            <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                <div style={{color: "#fff",background: COLORS.primary, borderRadius: '100px', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <PersonIcon />
                </div>
                <Typography variant="h4">
                    {userData.email}
                </Typography>
            </div>
            <div>
                <ButtonComponent
                    startIcon={<PowerSettingsNewIcon />}
                    fullWidth
                    variant="contained"
                    color="primary"
                    type="submit"
                    id="loginButton"
                    label="Sair"
                    format="rounded"
                    onClick={() => handleLogout()}
                />
            </div>
        </div>
    )
};

export default HeaderV2;