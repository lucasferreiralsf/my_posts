import React from "react";
import Head from "next/head";
import Landing from "../components/Landing/Landing";
import PostCardList from "../components/Posts/PostCardList";

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
    },
  ]
}
const Home = () => (
  <div>
    <Head>
      <title>Home</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    
      <div>
        <PostCardList  />
      </div>
   
  </div>
);

export default Home;
