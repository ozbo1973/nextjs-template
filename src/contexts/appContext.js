import { useReducer, createContext, useEffect } from "react";
import appReducer from "./reducers/appReducer";

export const AppContext = createContext();
export const AppDispatch = createContext();

const defaultState = {
  user: {},
  isLoggedIn: false,
  device: "mobile",
};

export const AppProvider = (props) => {
  const [appState, appDispatch] = useReducer(appReducer, { ...defaultState });

  useEffect(() => {
    console.log("render appContext");
  }, []);

  return (
    <AppContext.Provider value={appState}>
      <AppDispatch.Provider value={appDispatch}>
        {props.children}
      </AppDispatch.Provider>
    </AppContext.Provider>
  );
};
