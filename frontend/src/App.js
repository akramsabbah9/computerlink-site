import React, {useState} from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Home, Login, Logout, Servers } from "./pages";
import { Header, Footer } from "./components";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
    // attempt to find existing token in localstorage upon load
    const [token, setToken] = useState(JSON.parse(localStorage.getItem('token'))?.token);

    // save token to localStorage and set the existing one
    const saveToken = userToken => {
        localStorage.setItem('token', JSON.stringify(userToken));
        setToken(userToken.token);
      };

    return (
        <Router>
            <Header token={token}/>
            <div className="main-content">
                <Switch>
                    <Route path="/servers" component={Servers} />
                    <Route path="/login">
                        <Login saveToken={saveToken} />
                    </Route>
                    <Route path="/logout">
                        <Logout setToken={setToken} />
                    </Route>
                    <Route path="/" component={Home} />
                </Switch>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
