import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import Auth from "../../utils/auth";

function Login({saveToken}) {
    useEffect(() => {
        console.log("before", Auth.loggedIn());
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
            console.log("after", Auth.loggedIn());

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
        {Auth.loggedIn() ? 
            <Redirect to="/" />
            :
            <div>Form here.</div>}
    </>);
}

export default Login;
