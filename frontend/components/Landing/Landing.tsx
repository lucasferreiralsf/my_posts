import { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  makeStyles
} from "@material-ui/core";
import Link from "next/link";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { useSnackbar } from "notistack";

import { SignUpState } from "../../store/ducks/signup/types";
import { AppState } from "../../store/ducks/rootReducer";
import Login from "../Login/Login";
import { SignInState } from "../../store/ducks/auth/types";
import Router from "next/router";
import { signOutRequest } from "../../store/ducks/auth/actions";

type Props = {
  buttonText: string;
};

const useStyles = makeStyles(theme => ({
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));

const Landing = props => {
  const { token, firstName, lastName, _id } = props.children.props;
  const dispatch = useDispatch();

  const classes = useStyles({});
  const { enqueueSnackbar } = useSnackbar();
  const signupState: SignUpState = useSelector(
    (state: AppState) => state.signup,
    shallowEqual
  );
  const state: AppState = useSelector((state: AppState) => state, shallowEqual);

  useEffect(() => {
    if (signupState.error) {
      if (signupState.data.errors !== undefined) {
        enqueueSnackbar("Usuário já cadastrado!", { variant: "error" });
      }
    }
    if (!signupState.error && signupState.data.email) {
      enqueueSnackbar("Usuário criado com sucesso!", {
        variant: "success",
        preventDuplicate: true
      });
    }
  }, [signupState]);

  useEffect(() => {
    if (state.auth.error) {
      if (state.auth.errorMessage.status === 401) {
        enqueueSnackbar(state.auth.errorMessage.errorMessage, {
          variant: "error"
        });
        dispatch(signOutRequest());
      }
    }
  }, [state]);

  // useEffect(() => {
  //   if (auth.data && auth.data.token) {
  //     setAuthState(true);
  //   } else {
  //     setAuthState(false);
  //   }
  // }, [auth]);

  if (token) {
    // console.log("USER: ", props)
    // console.log("auth: ", auth)
    // dispatch({type: AuthTypes.SIGNIN_SUCCESS, payload: { data: { token, firstName, lastName, _id }}});
  }

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          {/* <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="menu"
        >
          <MenuIcon />
        </IconButton> */}
          <div className={classes.title}>
            <Link href="/">
              <Button>
                <Typography variant="h6" style={{ color: "white" }}>
                  My Posts
                </Typography>
              </Button>
            </Link>
          </div>
          <Login />
        </Toolbar>
      </AppBar>
      {props.children}
    </div>
  );
};

export default Landing;
