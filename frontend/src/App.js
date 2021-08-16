import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Home, Login, Logout, Servers } from "./pages";
import { Header, Footer } from "./components";
import { LoginProvider } from "./utils/login-context";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
    return (
        <Router>
            <LoginProvider>
                <Header />
                <div className="main-content">
                    <Switch>
                        <Route path="/servers" component={Servers} />
                        <Route path="/login">
                            <Login />
                        </Route>
                        <Route path="/logout">
                            <Logout />
                        </Route>
                        <Route path="/" component={Home} />
                    </Switch>
                    <Footer />
                </div>
            </LoginProvider>
        </Router>
    );
}

export default App;
