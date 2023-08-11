import React from "react";
import { Switch, Route } from "react-router-dom";
import Main from "./layouts/main";
import Login from "./layouts/login";
import Users from "./layouts/users";
import NavBar from "./components/ui/navBar/navBar";
import UserEditPage from "./components/page/userEditPage";
import { ToastContainer } from "react-toastify";
import ProtectedRoute from "./components/common/protectedRoute";
import LogOut from "./layouts/logOut";
import AppLoader from "./components/ui/hoc/appLoader";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";

function App() {
    return (
        <AppLoader>
            <div className="container">
                <header>
                    <NavBar />
                </header>
                <main>
                    <Switch>
                        <Route exact path="/" component={Main} />
                        <Route path="/logout" component={LogOut} />
                        <Route path="/login/:type?" component={Login} />
                        <ProtectedRoute
                            path="/users/:id/edit"
                            component={UserEditPage}
                        />
                        <ProtectedRoute
                            exact
                            path="/users/:id?"
                            component={Users}
                        />
                        <Redirect to="/" />
                    </Switch>
                </main>
                <ToastContainer />
            </div>
        </AppLoader>
    );
}

export default App;
