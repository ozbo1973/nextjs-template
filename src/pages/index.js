import Head from "next/head";
import { useEffect } from "react";
import useIsLoggedIn from "../hooks/useIsLoggedIn";

const Home = ({ getUser }) => {
  const { isLoggedIn, user } = useIsLoggedIn(getUser);
  const { userId = null } = user || {};

  useEffect(() => {
    console.log("render home");
  }, [isLoggedIn]);

  return (
    <div>
      <Head>
        <title>Next JS Template with Bulma</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container">
        <h1>Home Page</h1>
        {isLoggedIn && <p>{userId}</p>}
      </div>
    </div>
  );
};

export async function getServerSideProps(ctx) {
  const { user = {} } = ctx.req.session;
  return { props: { getUser: user } };
}

export default Home;
