import { useReducer, createContext, useEffect } from "react";
import appReducer from "./reducers/appReducer";

export const AppContext = createContext();
export const AppDispatch = createContext();

export const AppProvider = (props) => {
  const [appState, appDispatch] = useReducer(appReducer, {
    user: {},
    isLoggedIn: false,
    loginFromPage: "/",
    device: "mobile",
    defaultAuthFormState: {
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
      hasErrors: false,
      errMsg: [],
    },
  });

  useEffect(() => {
    console.log("render appContext");
  }, [appState.isLoggedIn]);

  return (
    <AppContext.Provider value={appState}>
      <AppDispatch.Provider value={appDispatch}>
        {props.children}
      </AppDispatch.Provider>
    </AppContext.Provider>
  );
};
