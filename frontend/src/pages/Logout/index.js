import React, { useEffect } from "react";

function Logout({setToken}) {
    // test fetch
    useEffect(() => {
        const fetchData = async function() {
            const response = await fetch("/api/customers/logout", {
                method: "POST",
                headers: { "Content-Type": "application/json" }
            });

            if (response.ok) {
                setToken(null);
    
            // const data = await response.json();
    
            // console.log("logout data:", data);
                localStorage.removeItem("token");
            }
        };
        try {
            fetchData();
        }
        catch (err) {
            console.log(err);
        }
    }, []);

    return (<>
        <div>Logged Out.</div>
    </>);
}

export default Logout;
