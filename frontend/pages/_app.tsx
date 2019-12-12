import React, { useEffect } from "react";
import App from "next/app";
import Head from "next/head";
import { Provider } from "react-redux";
import { Store } from "redux";
import withReduxSaga from "next-redux-saga";
import "typeface-roboto";
import { ThemeProvider } from "@material-ui/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import withRedux from "next-redux-wrapper";
import { SnackbarProvider, WithSnackbarProps } from "notistack";

import { MY_POSTS_THEME } from "../components/Theme/Theme";
import initStore from "../store";
import Landing from "../components/Landing/Landing";
import { AppState } from "../store/ducks/rootReducer";
import Router from "next/router";
import { auth } from "../utils/auth";
import { AuthTypes } from "../store/ducks/auth/types";

interface Props {
  store: Store<AppState>;
}

class MyApp extends App<Props & WithSnackbarProps> {
  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    const { token, userInfo } = auth(this.props);

    if (token !== "undefined" && token !== undefined) {
      this.props.store.dispatch({
        type: AuthTypes.SIGNIN_SUCCESS,
        payload: { data: { token, ...(userInfo as {}) } }
      });
    }

    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  render() {
    const { Component, pageProps, store } = this.props;

    return (
      <React.Fragment>
        <Head>
          <title>My page</title>
        </Head>
        <ThemeProvider theme={MY_POSTS_THEME}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <Provider store={store}>
            <SnackbarProvider
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center"
              }}
            >
              <Landing>
                <Component {...pageProps} />
              </Landing>
            </SnackbarProvider>
          </Provider>
        </ThemeProvider>
      </React.Fragment>
    );
  }
}

export default withRedux(initStore, { debug: process.env.NODE_ENV !== "production" ? true : false })(withReduxSaga(MyApp));
