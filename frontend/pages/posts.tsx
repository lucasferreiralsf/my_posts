import Head from "next/head";
import PostCardList from "../components/Posts/PostCardList";
import { withAuthSync } from "../utils/auth";

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
const Posts = () => (
  <div>
    <Head>
      <title>Posts</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    
      <div>
        <PostCardList  auth={false} />
      </div>
   
  </div>
);

export default withAuthSync(Posts);