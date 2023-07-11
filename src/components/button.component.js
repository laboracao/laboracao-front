import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components';
import {COLORS} from '../styles/colors'

const CustomButton = styled(Button)`
  svg{
    font-size: 20px
  }
`

const useStyles = makeStyles((theme) => ({
    input: {
      borderRadius: '10px',
      color: "#fff",
      fontWeight: "bold"
    },
    inputv2: {
      borderRadius: '10px',
      fontWeight: "bold"
    },
    rounded: {
      borderRadius: '100px',
      color: "#fff",
      fontWeight: "bold",
    },
    info: {
      borderRadius: '100px',
      backgroundColor: COLORS.info,
      color: "#fff",
      '&:hover':{
        backgroundColor: COLORS.infoHover
      }
    },
    success: {
      borderRadius: '100px',
      backgroundColor: COLORS.success,
      color: "#fff",
      '&:hover':{
        backgroundColor: COLORS.successHover
      }
    }
}));

const ButtonComponent = ({label, format, ...props}) => {
    const classes = useStyles();
    return (
        <CustomButton {...props} className={classes[format]}>
            {label}
        </CustomButton>
    )
};

export default ButtonComponent;