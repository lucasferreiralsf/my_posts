import React, { useState, useEffect } from "react";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import {
  Grid,
  Button,
  Theme,
  Typography,
  InputAdornment,
  withStyles,
  SvgIcon,
  IconButton
} from "@material-ui/core";
import {
  MdMail,
  MdLock,
  MdPerson,
  MdVisibility,
  MdVisibilityOff
} from "react-icons/md";
import { makeStyles, createStyles } from "@material-ui/styles";
import useForm from "react-hook-form";

import TextField from "../components/TextField";
import { PaperContainer } from "../components/PaperContainer";
import { AppState } from "../store/ducks/rootReducer";
import { SignUpTypes, SignUpState } from "../store/ducks/signup/types";
import { Skeleton } from "@material-ui/lab";
import { useSnackbar } from "notistack";
import { useRouter } from "next/router";

const useStyle = makeStyles(({ palette, spacing, props, shape }: Theme) =>
  createStyles({
    registerContainer: {},
    googleSignUpContainer: {
      height: "12em"
    },
    buttonGoogleIcon: {
      width: 150,
      background: "white"
    },
    googleIcon: {
      marginRight: spacing(1)
    },
    signUpTypography: {
      marginBottom: "10px"
    },
    formContainer: {
      minHeight: "22em",
      padding: "20px 0",
      // backgroundColor: "#F8F8F8",
      borderBottomLeftRadius: shape.borderRadius,
      borderBottomRightRadius: shape.borderRadius
    },
    buttonRegister: {
      margin: "20px 0 10px 0",
      width: 200
    }
  })
);

type RegisterForm = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

const Register = props => {
  const { register, handleSubmit, setValue, watch, errors } = useForm<
    RegisterForm
  >({ mode: "onChange" });
  const [userData, setUserData] = useState({
    showPassword: false
  });

  const dispatch = useDispatch();
  const classes = useStyle(props.theme);
  

  const state: SignUpState = useSelector(
    (state: AppState) => state.signup,
    shallowEqual
  );

  // useEffect(() => {
  //   if (state.error) {
  //     if (state.data.errors !== undefined) {
  //       enqueueSnackbar("Usuário já cadastrado!", { variant: "error" });
  //     }
  //   }
  //   if (!state.error && state.data.email) {
  //     enqueueSnackbar("Usuário criado com sucesso!", { variant: "success"});
  //   }
  // }, [state.error]);

  const handleClickShowPassword = () => {
    setUserData({ ...userData, showPassword: !userData.showPassword });
  };

  const onSubmit = async data => {
    dispatch({ type: SignUpTypes.SIGNUP_REQUEST, payload: { data } });
  };

  return (
    <PaperContainer>
      {state.loading ? (
        <div style={{ padding: "100px" }}>
          <Skeleton height={60} />
          <Skeleton height={60} />
          <Skeleton height={60} />
          <Skeleton height={60} />
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid
            container
            alignItems="center"
            justify="center"
            className={classes.registerContainer}
          >
            <Grid item xs={12} className={classes.formContainer}>
              <Grid
                container
                alignItems="center"
                justify="center"
                direction="column"
                style={{ minHeight: "inherit" }}
              >
                <Typography
                  variant="body1"
                  className={classes.signUpTypography}
                >
                  Preencha os campos com suas informações:
                </Typography>
                <TextField
                  id="firstName"
                  label="Primeiro Nome"
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <MdPerson />
                      </InputAdornment>
                    )
                  }}
                  name="firstName"
                  errors={{
                    hasError: errors.firstName !== undefined ? true : false,
                    message:
                      errors.firstName !== undefined
                        ? errors.firstName.message
                        : false
                  }}
                  inputRef={register({
                    minLength: {
                      value: 3,
                      message: "Deve conter no mínimo 3 letras."
                    },
                    required: "Este campo é obrigatório."
                  })}
                />
                <TextField
                  id="lastName"
                  label="Último Nome"
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <MdPerson />
                      </InputAdornment>
                    )
                  }}
                  name="lastName"
                  errors={{
                    hasError: errors.lastName !== undefined ? true : false,
                    message:
                      errors.lastName !== undefined
                        ? errors.lastName.message
                        : false
                  }}
                  inputRef={register({
                    minLength: {
                      value: 3,
                      message: "Deve conter no mínimo 3 letras."
                    },
                    required: "Este campo é obrigatório."
                  })}
                />
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
                  errors={{
                    hasError: errors.email !== undefined ? true : false,
                    message:
                      errors.email !== undefined ? errors.email.message : false
                  }}
                  inputRef={register({
                    pattern: {
                      value: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
                      message: "Email inválido."
                    },
                    required: "Este campo é obrigatório."
                  })}
                />
                <TextField
                  id="password"
                  label="Password"
                  type={userData.showPassword ? "text" : "password"}
                  variant="outlined"
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
                  inputRef={register({
                    validate: {
                      blankSpaces: value =>
                        /(^\s+|\s+)/.test(value) === true
                          ? "Sua senha não deve conter espaços em branco"
                          : true,
                      character: value =>
                        /^([\w]){4,8}$/.test(value) === false
                          ? `Sua senha deve ter no mínimo 4 caracteres e no máximo 8. Qtd.: ${value.length}`
                          : true
                    },
                    required: "Este campo é obrigatório."
                  })}
                />
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  size="large"
                  className={classes.buttonRegister}
                >
                  Cadastrar
                </Button>
              </Grid>
            </Grid>
            {/* <Grid item xs={12}>
          </Grid> */}
          </Grid>
        </form>
      )}
    </PaperContainer>
  );
};

export default Register;
