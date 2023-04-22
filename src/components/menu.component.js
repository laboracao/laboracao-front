import { useHistory, Link, Redirect } from 'react-router-dom';
import styled from 'styled-components';

import HomeIcon from '@mui/icons-material/Home';
import BuildIcon from '@mui/icons-material/Build';

import { Tooltip } from '@material-ui/core';
import { COLORS } from '../styles/colors';

const ItemMenu = styled('div')`
    color: #999;
    padding: 4px;
    border-radius: 12px;
    height: 36px;
    width: 36px;
    display: flex;
    margin-top: 8px;
    flexDirection: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    :hover{
        background: ${() => COLORS.secondary};
        color: #fff;
    }
`

const Menu = () => {

    const history = useHistory();

    const handleLink = (link) => {
        history.push(`${link}`)
    }
    
    return (
        <div>
            <ItemMenu onClick={() => handleLink('/dashboard')}>
                <Tooltip title="Home">
                    <HomeIcon />
                </Tooltip>
            </ItemMenu>
            <ItemMenu onClick={() => handleLink('/settings')}>
                <Tooltip title="Configurações">
                    <BuildIcon />
                </Tooltip>
            </ItemMenu>
        </div>
    )
};

export default Menu;