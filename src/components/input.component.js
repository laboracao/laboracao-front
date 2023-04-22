import TextField from '@material-ui/core/TextField';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    input: {
      color: "#fff !important"
    },
}));

const CustomInput = styled(TextField)`
    .MuiOutlinedInput-root{
        border-radius: 10px
    }
`

const Input = ({format, ...props}) => {

    const classes = useStyles();

    return (
        <CustomInput {...props} className={classes[format]}/>
    )
}

export default Input;