// use session cookie to determine if logged in
import Cookies from "js-cookie";

class Auth {
    getCookie() {
        let cookie = Cookies.get();
        // let cookie = Cookies.get("computerlink-login");
        console.log(cookie);

        return (cookie) ? true : false;
    }
}

export default new Auth();
