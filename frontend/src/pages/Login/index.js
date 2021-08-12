import React, { useEffect } from "react";

function Login() {

    // test fetch
    useEffect(() => {
        async function fetchData() {
            const response = await fetch("/api/customers/login", {
                method: "POST",
                body: JSON.stringify({
                    email: "test3@test.com",
                    password: "tester"
                }),
                headers: { "Content-Type": "application/json" }
            });

            console.log(response);
        }
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
