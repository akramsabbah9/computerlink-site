import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import Auth from "../../utils/auth";
import { SET_LOGGED_OUT } from "../../utils/actions";
import { useLoginContext } from "../../utils/login-context";

function Logout() {
    // initialize login context
    const [state, dispatch] = useLoginContext();

    // dispatch login event when user is logged in
    const logoutUser = () => {
        dispatch({ type: SET_LOGGED_OUT });
    };

    // test fetch
    useEffect(() => {
        const fetchData = async function() {
            const response = await fetch("/api/customers/logout", {
                method: "POST",
                headers: { "Content-Type": "application/json" }
            });
    
            // const data = await response.json();
            console.log("logout", Auth.loggedIn());

            // if login cookie no longer exists, logout user
            if (!Auth.loggedIn()) logoutUser();

            if (response.ok) return true;
        };
        try {
            fetchData();
        }
        catch (err) {
            console.log(err);
        }
    }, []);

    return (<>
        {state.loggedIn ?
            <div>Logging Out.</div>
        :
            <Redirect to="/" />}
    </>);
}

export default Logout;
