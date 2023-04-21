import TextField from '@material-ui/core/TextField';
import styled from 'styled-components';

const CustomInput = styled(TextField)`
    .MuiOutlinedInput-root{
        border-radius: 10px
    }
`

const Input = ({...props}) => {
    return (
        <CustomInput {...props}/>
    )
}

export default Input;