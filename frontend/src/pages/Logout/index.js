import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import Auth from "../../utils/auth";

function Logout({setToken}) {
    // test fetch
    useEffect(() => {
        const fetchData = async function() {
            const response = await fetch("/api/customers/logout", {
                method: "POST",
                headers: { "Content-Type": "application/json" }
            });
    
            // const data = await response.json();
            console.log(Auth.loggedIn());

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
            <div>Logging Out.</div>
        :
            <Redirect to="/" />}
    </>);
}

export default Logout;
