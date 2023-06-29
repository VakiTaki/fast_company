import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Main from "./layouts/main";
import Login from "./layouts/login";
import Users from "./layouts/users";
import NavBar from "./components/ui/navBar/navBar";
import UserEditPage from "./components/page/userEditPage";
import UserProvider from "./hooks/useUsers";
import { ToastContainer } from "react-toastify";
import ProfessionProvider from "./hooks/useProfession";
import QualityProvider from "./hooks/useQuality";

function App() {
    return (
        <div className="container">
            <header>
                <NavBar />
            </header>
            <main>
                <ProfessionProvider>
                    <QualityProvider>
                        <UserProvider>
                            <Switch>
                                <Route exact path="/" component={Main} />
                                <Route path="/login/:type?" component={Login} />
                                <Route
                                    path="/users/:id/edit"
                                    component={UserEditPage}
                                />
                                <Route path="/users/:id?" component={Users} />
                                <Redirect to="/" />
                            </Switch>
                        </UserProvider>
                    </QualityProvider>
                </ProfessionProvider>
            </main>
            <ToastContainer />
        </div>
    );
}

export default App;
