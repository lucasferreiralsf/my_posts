import {
  IconButton,
  Typography,
  Button,
  makeStyles,
  Popover,
  Grid,
  InputAdornment,
  MenuItem,
  Menu
} from '@material-ui/core';
import Link from 'next/link';
import useForm from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import {
  MdLock,
  MdVisibility,
  MdVisibilityOff,
  MdMail,
  MdAccountCircle
} from 'react-icons/md';

import TextField from '../TextField';
import { AppState } from '../../store/ducks/rootReducer';
import { SignInState, AuthTypes } from '../../store/ducks/auth/types';
import { useSnackbar } from 'notistack';

type LoginForm = {
  email: string;
  password: string;
};

const useStyles = makeStyles(theme => ({
  paperContainer: {
    marginTop: '10px',
    padding: theme.spacing(2)
  },
  loginContainer: {},
  signInTypography: {
    marginBottom: '10px'
  },
  formContainer: {
    // minHeight: '22em',
    padding: theme.spacing(2),
    // backgroundColor: '#F8F8F8',
    borderBottomLeftRadius: theme.shape.borderRadius,
    borderBottomRightRadius: theme.shape.borderRadius
  },
  buttonEntrar: {
    // margin: "20px 0 10px 0",
    // width: 200
    backgroundColor: 'white'
  },
  buttonSignup: {
    color: 'white',
    marginRight: theme.spacing(1.5)
  }
}));

const Login = () => {
  const [anchorMenuEl, setAnchorMenuEl] = useState<null | HTMLElement>(null);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [authState, setAuthState] = useState(null);
  const [userData, setUserData] = useState({
    showPassword: false
  });

  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles({});
  const dispatch = useDispatch();
  const { register, handleSubmit, errors } = useForm<LoginForm>({
    mode: 'onChange'
  });
  const auth: SignInState = useSelector((state: AppState) => state.auth);

  const open = Boolean(anchorEl);
  const menuOpen = Boolean(anchorMenuEl);
  const id = open ? 'simple-popover' : undefined;

  useEffect(() => {
    if (auth.error) {
      if (auth.errorMessage.status === 404) {
        enqueueSnackbar('Email ou senha inválidos.', { variant: 'error', preventDuplicate: true });
      }
    }
  }, [auth]);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorMenuEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorMenuEl(null);
  };

  const handleClickShowPassword = () => {
    setUserData({ ...userData, showPassword: !userData.showPassword });
  };

  const onSubmit = data => {
    dispatch({ type: AuthTypes.SIGNIN_REQUEST, payload: data });
  };

  const handleLogout = () => {
    dispatch({ type: AuthTypes.SIGNOUT_REQUEST });
    setAnchorMenuEl(null);
  };

  return (
    <div>
      {auth.auth ? (
        <div>
          <IconButton
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <MdAccountCircle />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorMenuEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
            open={menuOpen}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </div>
      ) : (
        <div>
          <Link href="/signup">
            <Button className={classes.buttonSignup}>Criar conta</Button>
          </Link>
          <Button
            aria-describedby={id}
            variant="contained"
            color="default"
            onClick={handleClick}
            className={classes.buttonEntrar}
          >
            Entrar
          </Button>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right'
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
            className={classes.paperContainer}
          >
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid
                container
                alignItems="center"
                justify="center"
                className={classes.loginContainer}
              >
                <Grid item xs={12} className={classes.formContainer}>
                  <Grid
                    container
                    alignItems="center"
                    justify="center"
                    direction="column"
                    style={{ minHeight: 'inherit' }}
                  >
                    <Typography
                      variant="body1"
                      className={classes.signInTypography}
                    >
                      Preencha com suas credenciais:
                    </Typography>
                    <TextField
                      id="email"
                      label="Email"
                      variant="outlined"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <MdMail />
                          </InputAdornment>
                        )
                      }}
                      name="email"
                      size="small"
                      errors={{
                        hasError: errors.email !== undefined ? true : false,
                        message:
                          errors.email !== undefined
                            ? errors.email.message
                            : false
                      }}
                      inputRef={register({
                        pattern: {
                          value: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
                          message: 'Email inválido.'
                        },
                        required: 'Este campo é obrigatório.'
                      })}
                    />
                    <TextField
                      id="password"
                      label="Password"
                      type={userData.showPassword ? 'text' : 'password'}
                      variant="outlined"
                      size="small"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <MdLock />
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                            >
                              {userData.showPassword ? (
                                <MdVisibility />
                              ) : (
                                <MdVisibilityOff />
                              )}
                            </IconButton>
                          </InputAdornment>
                        )
                      }}
                      name="password"
                      errors={{
                        hasError: errors.password !== undefined ? true : false,
                        message:
                          errors.password !== undefined
                            ? errors.password.message
                            : false
                      }}
                      // helperText={

                      // }
                      inputRef={register({
                        validate: {
                          blankSpaces: value =>
                            /(^\s+|\s+)/.test(value) === true
                              ? 'Sua senha não deve conter espaços em branco'
                              : true,
                          character: value =>
                            /^([\w]){4,8}$/.test(value) === false
                              ? `Sua senha deve ter no mínimo 4 caracteres e no máximo 8. Qtd.: ${value.length}`
                              : true
                        },
                        required: 'Este campo é obrigatório.'
                      })}
                    />
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      size="large"
                      // className={classes.buttonEntrar}
                    >
                      Entrar
                    </Button>
                  </Grid>
                </Grid>
                {/* <Grid item xs={12}>
          </Grid> */}
              </Grid>
            </form>
          </Popover>
        </div>
      )}
    </div>
  );
};

export default Login;
