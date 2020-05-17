import React, { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import { AppContext } from "../contexts/appContext";
import useIsLoggedIn from "../hooks/useIsLoggedIn";
import axios from "axios";

const profile = ({ getUser }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState();
  const { isLoggedIn } = useContext(AppContext);
  useIsLoggedIn(getUser);

  useEffect(() => {
    console.log("render profile", isLoggedIn, isLoading);
    const getUserData = async () => {
      try {
        const { data } = await axios.get("/users/my-profile");
        setUserData(data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    if (!isLoggedIn) {
      router.push("/login");
      return;
    }

    isLoading && getUserData();
  }, [isLoading]);

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <div>
      <h1>My Profile</h1>
      <p>{userData.email}</p>
    </div>
  );
};

export async function getServerSideProps(ctx) {
  const { user = {} } = ctx.req.session;
  return { props: { getUser: user } };
}

export default profile;
