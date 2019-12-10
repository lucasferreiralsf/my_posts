import { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  makeStyles,
} from "@material-ui/core";
import Link from "next/link";
import { useSelector, shallowEqual } from "react-redux";
import { useSnackbar } from "notistack";

import { SignUpState } from "../../store/ducks/signup/types";
import { AppState } from "../../store/ducks/rootReducer";
import Login from "../Login/Login";
import { SignInState } from "../../store/ducks/auth/types";
import Router from "next/router";


type Props = {
  buttonText: string;
};



const useStyles = makeStyles(theme => ({
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },  
}));

const Landing = props => {
  const { token, firstName, lastName, _id } = props.children.props;  
  
  const classes = useStyles({});
  const { enqueueSnackbar } = useSnackbar();
  const state: SignUpState = useSelector(
    (state: AppState) => state.signup,
    shallowEqual
  );
  const authState: SignInState = useSelector(
    (state: AppState) => state.auth,
    shallowEqual
  );

  useEffect(() => {
    if (state.error) {
      if (state.data.errors !== undefined) {
        enqueueSnackbar("Usuário já cadastrado!", { variant: "error" });
      }
    }
    if (!state.error && state.data.email) {
      enqueueSnackbar("Usuário criado com sucesso!", {
        variant: "success",
        preventDuplicate: true
      });
    }
  }, [state]);

  Router.beforePopState(({ url, as, options }) => {
    // I only want to allow these two routes!
    if (as !== '/' && as !== '/other') {
      // Have SSR render bad routes as a 404.
      if(authState.)
      window.location.href = as
      return false
    }
  
    return true
  })

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
