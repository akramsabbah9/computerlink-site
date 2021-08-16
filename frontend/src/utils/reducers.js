import { useReducer } from "react";
import {
    SET_LOGGED_IN,
    SET_LOGGED_OUT,
    // REDIRECT,
    // SET_LOADING
} from "./actions";

/* state internally looks like this:
{
    loggedIn: false
}
*/

export const reducer = (state, action) => {
    switch(action.type) {
        case SET_LOGGED_IN:
            return {
                ...state,
                loggedIn: true
            };
        case SET_LOGGED_OUT:
            return {
                ...state,
                loggedIn: false
            };
        default:
            return state;
    }
};

export function useLoginReducer(initialState) {
    return useReducer(reducer, initialState);
};
