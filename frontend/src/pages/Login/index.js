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

    // form state
    const [formState, setFormState] = useState({
        email: "",
        password: { value: "", err: "" }
    });

    // handle form field change
    const handleFormChange = event => {
        // destructure event target
        const { name, value } = event.target;
        // update state
        setFormState({ 
            ...formState, 
            [name]: { ...[name], value }
        });
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

    const setForm = async arg => {
        const response = setFormState(arg);

        console.log(formState);
    }

    // validate form for null-input
    const validateForm = () => {
        let isValid = true;

        // check all form fields: if any are blank, set its error
        for (const [field, entry] of Object.entries(formState)) {
            console.log(`${field}: value ${entry.value}, err ${entry.err}`);

            // if this field's entry has no value, set its error message
            // BUG: Email doesn't get set unless password does first. Likely
            // caused by race condition where email message arrives and is overwritten
            // by password message (containing no email error)
            if (entry.value.length === 0) {
                setForm({
                    ...formState,
                    [field]: { value: "", err: `Your ${field} was left blank!` }
                });
                isValid = false;
            }
        }

        return isValid;
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
                id="login-email"
                onChange={handleFormChange}
                />
                {formState.email.err}
            </div>

            <div className="form-field">
                <label htmlFor="password">Password <span className="required-field">*</span></label>
                <input
                    placeholder="*******"
                    name="password"
                    id="login-pass"
                    onChange={handleFormChange}
                />
                {formState.password.err}
            </div>
            <div className="">
                <button className="" type="submit">Submit</button>
            </div>
        </form>
    </>);
}

export default Login;
