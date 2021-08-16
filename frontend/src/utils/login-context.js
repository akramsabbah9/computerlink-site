import React, { createContext, useContext } from "react";
import { useLoginReducer } from "./reducers";

const LoginContext = createContext();
const { Provider } = LoginContext;

const LoginProvider = ({ value = [], ...props }) => {
    const [state, dispatch] = useLoginReducer({
        loggedIn: false
    });
    return <Provider value={[state, dispatch]} {...props} />;
};

const useLoginContext = () => {
    return useContext(LoginContext);
};

export { LoginProvider, useLoginContext };