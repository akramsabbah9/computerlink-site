// use session cookie to determine if logged in
import Cookies from "js-cookie";

class Auth {
    // if login cookie exists and is not expired, return true.
    loggedIn() {
        const cookie = Cookies.get("computerlink-login");

        if (cookie) {
            const today = new Date();
            const exp = new Date(JSON.parse(cookie));
            return today <= exp;
        }

        return false;
        // try {
        //     const cookie = Cookies.get("computerlink-login");
        //     const today = new Date();
        //     const cookieExp = new Date(JSON.parse(cookie));
        //     return today <= cookieExp;
        // }
        // catch (err) {
        //     console.error(err);
        //     return false;
        // }
    }
}

export default new Auth();
