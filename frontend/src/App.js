import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Home, Login, Servers } from "./pages";
import { Header, Footer } from "./components";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
    return (
        <Router>
            <Header />
            <div className="main-content">
                <Switch>
                    <Route path="/servers" component={Servers} />
                    <Route path="/login" component={Login} />
                    <Route path="/" component={Home} />
                </Switch>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
