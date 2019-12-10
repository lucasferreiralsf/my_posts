import { useEffect } from "react";
import Router from "next/router";
import nextCookie from "next-cookies";
import cookie from "js-cookie";
import { useDispatch } from "react-redux";
import { AuthTypes } from "../store/ducks/auth/types";

export const login = ({ token, ...userInfo }) => {
  cookie.set("token", token, { expires: 1 });
  cookie.set("userInfo", userInfo, { expires: 1 });
  // window.localStorage.setItem('token', token);
  // window.localStorage.setItem('userInfo', JSON.stringify(userInfo));
  Router.push("/posts");
};

export const auth = ctx => {
  const { token, userInfo } = nextCookie(ctx);
  /*
   * If `ctx.req` is available it means we are on the server.
   * Additionally if there's no token it means the user is not logged in.
   */
  if (ctx.req && !token) {
    ctx.res.writeHead(302, { Location: "/" });
    ctx.res.end();
  }

  // We already checked for server. This should only happen on client.
  if (!token) {
    Router.push("/");
  }

  ctx.store.dispatch({ type: AuthTypes.SIGNIN_SUCCESS, payload: { data: { token, ...userInfo as {} } }});

  return { token, userInfo };
};

export const logout = () => {
  cookie.remove("token");
  cookie.remove("userInfo");
  // to support logging out from all windows
  window.localStorage.setItem("logout", Date.now().toString());
  Router.push("/");
};

export const withAuthSync = WrappedComponent => {
  const Wrapper = props => {
    const syncLogout = event => {
      if (event.key === "logout") {
        Router.push("/");
      }
    };

    useEffect(() => {
      window.addEventListener("storage", syncLogout);

      return () => {
        window.removeEventListener("storage", syncLogout);
        window.localStorage.removeItem("logout");
      };
    }, [null]);

    return <WrappedComponent {...props} />;
  };

  Wrapper.getInitialProps = async ctx => {
    const userAuth: { token: string, userInfo: {}} = auth(ctx);

    
    const componentProps =
      WrappedComponent.getInitialProps &&
      (await WrappedComponent.getInitialProps(ctx));

    return { ...componentProps, token: userAuth.token, ...userAuth.userInfo };
  };

  return Wrapper;
};
