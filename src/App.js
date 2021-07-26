import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Home, Servers } from "./pages";
import { Header } from "./components";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
    return (
        <Router>
            <Header />
            <div className="main-content">
                <Switch>
                    <Route path="/servers" component={Servers} />
                    <Route path="/" component={Home} />
                </Switch>
            </div>
        </Router>
    );
}

export default App;
