import React from "react";
import { Switch, Route, Link, Redirect } from "react-router-dom";
import Main from "./layouts/main";
import Login from "./layouts/login";
import UsersRoute from "./layouts/usersRoute";

function App() {
    return (
        <div className="container">
            <header>
                <ul className="nav">
                    <li className="nav-item">
                        <Link className="nav-link" to="/">
                            Main
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/login">
                            Login
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/users">
                            Users
                        </Link>
                    </li>
                </ul>
            </header>
            <main>
                <Switch>
                    <Route exact path="/" component={Main} />
                    <Route path="/login" component={Login} />
                    <Route path="/users/:id?" component={UsersRoute} />
                    <Redirect to="/" />
                </Switch>
            </main>
        </div>
    );
}

export default App;
