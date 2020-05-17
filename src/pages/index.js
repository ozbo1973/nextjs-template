import Head from "next/head";
import { useEffect, useContext } from "react";
import useIsLoggedIn from "../hooks/useIsLoggedIn";
import { AppContext } from "../contexts/appContext";

const Home = ({ getUser }) => {
  const { isLoggedIn, user } = useContext(AppContext);
  const { userId = null } = user || {};
  useIsLoggedIn(getUser);

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
