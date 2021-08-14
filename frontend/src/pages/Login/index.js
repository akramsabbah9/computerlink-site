import React, { useEffect } from "react";

function Login({saveToken}) {
    // test fetch
    useEffect(() => {
        const fetchData = async function() {
            const response = await fetch("/api/customers/login", {
                method: "POST",
                body: JSON.stringify({
                    email: "test3@test.com",
                    password: "tester"
                }),
                headers: { "Content-Type": "application/json" }
            });
    
            const token = await response.json();
    
            console.log(token);
            saveToken(token);
        };
        try {
            fetchData();
        }
        catch (err) {
            console.log(err);
        }
        // const response = await fetch("localhost:3001/api/customers/login", {
        //     method: "POST",
        //     body: JSON.stringify({
        //         email: "test3@test.com",
        //         password: "tester"
        //     }),
        //     headers: { "Content-Type": "application/json" }
        // });
    }, []);
    return (<>
        <div>Form here.</div>
    </>);
}

export default Login;
