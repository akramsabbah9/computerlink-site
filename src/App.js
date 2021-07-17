import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Home } from "./pages";
import { Header } from "./components";
import "./App.css";

function App() {
    return (
        <div className="site-root">
            <Header />
            <div>
                <Router>
                    <Switch>
                        <Route path="/" component={Home} />
                    </Switch>
                </Router>
            </div>
        </div>
    );
}

export default App;
