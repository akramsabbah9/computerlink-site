import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import Auth from "../../utils/auth";
import { SET_LOGGED_IN } from "../../utils/actions";
import { useLoginContext } from "../../utils/login-context";

function Login() {
    // initialize login context
    const [state, dispatch] = useLoginContext();

    // dispatch login event when user is logged in
    const loginUser = () => {
        dispatch({ type: SET_LOGGED_IN });
    };

    useEffect(() => {
        console.log("before login", Auth.loggedIn());
        const fetchData = async function() {
            const response = await fetch("/api/customers/login", {
                method: "POST",
                body: JSON.stringify({
                    email: "test3@test.com",
                    password: "tester"
                }),
                headers: { "Content-Type": "application/json" }
            });

            // test try to read cookie
            console.log("after login", Auth.loggedIn());

            // if login cookie exists, dispatch login event
            if (Auth.loggedIn()) loginUser();

            // if 200, redirect user to homepage
            // if (response.ok) window.location.assign("/");
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
            <Redirect to="/" />
            :
            <div>Form here.</div>}
    </>);
}

export default Login;
