import React, {useContext} from 'react';
import DefaultContext from '../../stores/defaultContext';

import { makeStyles } from '@material-ui/core/styles';

import ButtonComponent from '../../components/button.component';
import Typography from '@material-ui/core/Typography';

import Input from '../../components/input.component';

import BG1 from '../../assets/bg1.png';
import BG2 from '../../assets/bg2.png';
import Logo from '../../assets/logo.png';

import LoginHook from '../../hooks/login.hook';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(2, 0, 2),
    color: '#fff',
    borderRadius: '10px'
  },
  input: {
    borderRadius: '10px'
  }
}));

export default function SignIn() {
  const classes = useStyles();
  const {isMobile} = useContext(DefaultContext);
  const {email, setEmail, handleSubmit} = LoginHook();

  return (
    <div style={{display: 'flex', height: '100vh'}}>
      <div style={{width: isMobile ? '2%' : '33%', height: '100%', background: `url(${BG1}) ${isMobile ? 'left': 'center'} top`, backgroundSize: 'cover'}}></div>
      <div style={{width: isMobile ? '96%' : '34%', padding: '0px 24px'}}>
        <div style={{height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <img src={Logo} />
            <Typography variant="h4">
              Bem Estar no TrabalhO
            </Typography>
          </div>
          <form onSubmit={(e) => handleSubmit(e)} style={{width: '100%'}}>
            <div className={classes.form} style={{display: 'flex', flexDirection: 'column', gap: '16px', width: '100%'}}>
              <Input
                variant="outlined"
                required
                fullWidth
                id="email"
                name="email"
                type="email"
                placeholder="Seu email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoFocus
                className={classes.input}
                inputProps={{
                  classes: {
                    root: classes.input
                  }
                }}
              />

              <ButtonComponent
                fullWidth
                variant="contained"
                color="primary"
                type="submit"
                id="loginButton"
                label="Sair"
                size="small"
                format="input"
              />

            </div>
          </form>
        </div>
      </div>
      <div style={{width: isMobile ? '2%' : '33%', height: '100%', background: `url(${BG2})`, backgroundSize: 'cover'}}></div>
    </div>
  );
}