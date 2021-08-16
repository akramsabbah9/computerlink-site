import React, { createContext, useContext } from "react";
import { useLoginReducer } from "./reducers";
import Auth from "./auth";

const LoginContext = createContext();
const { Provider } = LoginContext;

const LoginProvider = ({ value = [], ...props }) => {
    const [state, dispatch] = useLoginReducer({
        loggedIn: Auth.loggedIn() // initialize login state as true if cookie exists
    });
    return <Provider value={[state, dispatch]} {...props} />;
};

const useLoginContext = () => {
    return useContext(LoginContext);
};

export { LoginProvider, useLoginContext };