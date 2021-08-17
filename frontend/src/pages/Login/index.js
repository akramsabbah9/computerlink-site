import React, { useState /*, useEffect*/ } from "react";
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

    const [formState, setFormState] = useState({ email: "", password: "" });
    const [formErrors, setErrors] = useState({ email: "", password: "" });

    // handle form field change
    const handleFormChange = event => {
        const { name, value } = event.target;
        setFormState({ ...formState, [name]: value });
    };

    // handle form submit
    const handleFormSubmit = async event => {
        event.preventDefault();
        if (!validateForm()) return false;

        // send fetch request to backend and await response
        const response = await fetch("/api/customers/login", {
            method: "POST",
            body: JSON.stringify({
                email: "test3@test.com", //TODO
                password: "tester" //TODO
            }),
            headers: { "Content-Type": "application/json" }
        });

        // test try to read cookie
        console.log("after login", Auth.loggedIn());

        // if login cookie exists, dispatch login event
        if (response.ok && Auth.loggedIn()) loginUser();
    };

    // validate form for null-input
    const validateForm = () => {
        let isValid = 11; // set a digit to zero if an input is null

        if (!formState.email) isValid -= 10;
        if (!formState.password) isValid -= 1;

        switch(isValid) {
            case 10:
                setErrors({
                    email: "",
                    password: "You must enter a password!"
                });
                return false;
            case 1:
                setErrors({
                    email: "You must enter an email!",
                    password: ""
                });
                return false;
            case 0:
                setErrors({ 
                    email: "You must enter an email!",
                    password: "You must enter a password!"
                });
                return false;
            default:
                setErrors({ email: "", password: "" });
                return true;
        }
    };

    return (<>
        {state.loggedIn ? <Redirect to="/" /> : null}

        {/* login form */}
        <form className="" onSubmit={handleFormSubmit}>
            <div className="form-field">
                <label htmlFor="email">Email <span className="required-field">*</span></label>
                <input
                placeholder="email@site.com"
                name="email"
                id="email"
                onChange={handleFormChange}
                />
                {formErrors.email}
            </div>

            <div className="form-field">
                <label htmlFor="password">Password <span className="required-field">*</span></label>
                <input
                    placeholder="*******"
                    name="password"
                    id="password"
                    onChange={handleFormChange}
                />
                {formErrors.password}
            </div>
            <div className="">
                <button className="" type="submit">Submit</button>
            </div>
        </form>
    </>);
}

export default Login;
