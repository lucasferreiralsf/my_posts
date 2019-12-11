import React from "react";
import Head from "next/head";
import Landing from "../components/Landing/Landing";
import PostCardList from "../components/Posts/PostCardList";
import { useSelector, shallowEqual } from "react-redux";
import { AppState } from "../store/ducks/rootReducer";
import { SignInState } from "../store/ducks/auth/types";
import { useRouter } from "next/router";

const posts = {
  docs: [
    {
      content: "Teste",
      owner: {
        firstName: "Lucas",
        lastName: "Ferreira"
      }
    },
    {
      content: "Teste",
      owner: {
        firstName: "Lucas",
        lastName: "Ferreira"
      }
    },
    {
      content: "Teste",
      owner: {
        firstName: "Lucas",
        lastName: "Ferreira"
      }
    }
  ]
};
const Home = props => {
  // const authState: SignInState = useSelector(
  //   (state: AppState) => state.auth,
  //   shallowEqual
  // );
  // const router = useRouter();

  // if (authState.auth && typeof window !== "undefined") {
  //   router.push("/posts");
  // }

  return (
    <div>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <PostCardList />
      </div>
    </div>
  );
};

export default Home;
