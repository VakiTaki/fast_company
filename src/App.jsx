import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Main from "./layouts/main";
import Login from "./layouts/login";
import Users from "./layouts/users";
import NavBar from "./components/ui/navBar/navBar";

function App() {
    return (
        <div className="container">
            <header>
                <NavBar />
            </header>
            <main>
                <Switch>
                    <Route exact path="/" component={Main} />
                    <Route path="/login/:type?" component={Login} />
                    <Route path="/users/:id?" component={Users} />
                    <Redirect to="/" />
                </Switch>
            </main>
        </div>
    );
}

export default App;
