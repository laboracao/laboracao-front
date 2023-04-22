import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    input: {
      borderRadius: '10px',
      color: "#fff",
      fontWeight: "bold"
    },
    rounded: {
      borderRadius: '100px',
      color: "#fff",
      fontWeight: "bold"
    }
}));

const ButtonComponent = ({label, format, ...props}) => {
    const classes = useStyles();

    return (
        <Button {...props} className={classes[format]}>
            {label}
        </Button>
    )
};

export default ButtonComponent;